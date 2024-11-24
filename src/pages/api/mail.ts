import AdminContact from "@/mail/AdminContact";
import ClientContact from "@/mail/ClientContact";
import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

type mailFormData = {
  name: string;
  "last-name": string;
  email: string;
  phone: string;
  company: string;
  message: string;
  country: string;
};

const generateRandomUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();
    const formData = Object.fromEntries(form) as mailFormData;

    // Contact info data to admin
    const { data: AdminEmail, error: AdminErrorMail } =
      await resend.emails.send({
        from: `Tropifresh <${import.meta.env.ADMIN_EMAIL}>`,
        to: [`${formData.company} <${formData.email}>`],
        subject: "Tropifresh Web | Nuevo mensaje de contacto",
        react: AdminContact({
          name: formData.name,
          lastname: formData["last-name"],
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          country: formData.country,
          message: formData.message,
        }),
        headers: { "X-Entity-Ref-ID": generateRandomUUID() },
      });

    if (AdminErrorMail) {
      console.error(AdminErrorMail);
      throw new Error(AdminErrorMail.message, { cause: AdminErrorMail });
    }

    // // Confirm email to user
    const { data: ClientEmail, error: ClientErrorMail } =
      await resend.emails.send({
        from: `Tropifresh <${import.meta.env.ADMIN_EMAIL}>`,
        to: [`${formData.company} <${formData.email}>`],
        subject: "Tropifresh | We received your message",
        react: ClientContact({ name: formData.name }),
        headers: { "X-Entity-Ref-ID": generateRandomUUID() },
      });

    if (ClientErrorMail) {
      console.error(ClientErrorMail);
      throw new Error(ClientErrorMail.message, { cause: ClientErrorMail });
    }

    return new Response(JSON.stringify({ AdminEmail, ClientEmail }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error((error as Error).message, { cause: error });
  }
};
