import Facebook from "@/components/shared/icons/Facebook.astro";
import Instagram from "@/components/shared/icons/Instagram.astro";
import Linkedin from "@/components/shared/icons/Linkedin.astro";
import Twitter from "@/components/shared/icons/Twitter.astro";
import Youtube from "@/components/shared/icons/Youtube.astro";

const SocialMedia = [
  {
    name: "Facebook",
    route: "",
    icon: Facebook,
  },
  {
    name: "Instagram",
    route: "https://www.instagram.com/tropifreshco",
    icon: Instagram,
  },
  {
    name: "Linkedin",
    route: "https://www.linkedin.com/company/tropifresh/",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    route: "",
    icon: Twitter,
  },
  {
    name: "Youtube",
    route: "",
    icon: Youtube,
  },
];

export default SocialMedia;
