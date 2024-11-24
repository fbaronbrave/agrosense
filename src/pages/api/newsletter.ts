import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

type newsletterFormData = {
  email: string;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();
    const formData = Object.fromEntries(form) as newsletterFormData;

    const { data, error } = await resend.contacts.create({
      email: formData.email,
      audienceId: import.meta.env.RESEND_AUDIENCE_ID,
    });

    if (error) {
      console.error(error);
      throw new Error(error.message, { cause: error });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error((error as Error).message, { cause: error });
  }
};
