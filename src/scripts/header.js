const headerScripts = () => {
  const header = document.querySelector("header");

  let lastScrollY = window.scrollY;
  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("scroll", () => {
      if (!!header) {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY ? 1 : -1;

        if (window.scrollY > 300) {
          header.classList.add("top-0");
          header.classList.add("bg-white/70", "backdrop-blur");
        } else {
          header.classList.remove("bg-white/70", "backdrop-blur");
        }

        if (window.scrollY > window.innerHeight - header.offsetHeight / 2) {
          header.classList.add("-top-full");
          header.classList.remove("top-0");

          if (scrollDirection === 1) {
            header.classList.add("-top-full");
            header.classList.remove("top-0");
            header.classList.remove('duration-700')
            header.classList.add('duration-200')
          } else {
            header.classList.remove('duration-200')
            header.classList.add('duration-700')
            header.classList.add("top-0");
            header.classList.remove("-top-full");
          }
        } else {
          header.classList.add("top-0");
          header.classList.remove("-top-full");
        }

        lastScrollY = currentScrollY;
      }
    });
  });
};
export default headerScripts;
