export const scrollPage = () => {
  document.body.style.overflow = "hidden";
  const pageScroll = document.querySelector(".page-scroll");
  const sectionBlock = document.querySelectorAll(".page-scroll > section");
  const navBar = document.querySelector("nav");
  let nowSection = 0;
  let countSection = sectionBlock.length;
  const sectionHeight = sectionBlock[0].offsetHeight;

  for (let i = 1; i < countSection + 1; i++) {
    navBar.innerHTML +=
      i < 10
        ? `<div data-key="${i}">0${i}</div>`
        : `<div data-key="${i}">${i}</div>`;
  }

  const navBarItems = document.querySelectorAll("nav > div");

  navBarItems.forEach((item, i) => {
    item.addEventListener("click", e => {
      navBarItems.forEach(item => {
        item.classList.remove("active");
      });

      e.currentTarget.classList.add("active");
      pageScroll.style.transform = `translateY(-${sectionHeight *
        +e.currentTarget.dataset.key -
        sectionHeight}px)`;
      nowSection = +e.currentTarget.dataset.key;
    });
  });

  sectionBlock.forEach((item, i) => {
    item.dataset.index = ++i;
  });

  let nowCoord = 0;

  window.addEventListener("scroll", e => {
    console.log(e);
    e.preventDefault();
  });
};

export const selectOpenHide = () => {
  document.querySelectorAll("form .value").forEach((item, i) => {
    item.addEventListener("click", e => {
      e.currentTarget.parentNode.classList.toggle("open");
    });
  });
};
