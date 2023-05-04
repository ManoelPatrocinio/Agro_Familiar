let elementList: NodeList;

export function startAnimateOnScroll() {
  //get all elements with custom attributes
  elementList = document.querySelectorAll("[data-animate]");

  const animateScroll = () => {
    // sets distance between element and top of the page
    const windownTop = window.pageYOffset + window.innerHeight * 0.85;
    elementList.forEach((element: any) => {
      if (windownTop > element.offsetTop) {
        element.classList.add("animate");
      } else {
        element.classList.remove("animate");
      }
    });
  };
  animateScroll();

  window.addEventListener("scroll", () => {
    animateScroll();
  });
}
