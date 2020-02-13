const find = (node, className) => {
  while (node) {
    if (node.classList.contains(className)) {
      return node;
    } else {
      node = node.parentElement;
    }
  }

  return null;
};
const addDeleteEventWheel = (elem, param, func) => {
  if (param === "add") {
    if (elem.addEventListener) {
      if ("onwheel" in document) {
        // IE9+, FF17+
        elem.addEventListener("wheel", func);
      } else if ("onmousewheel" in document) {
        // устаревший вариант события
        elem.addEventListener("mousewheel", func);
      } else {
        // Firefox < 17
        elem.addEventListener("MozMousePixelScroll", func);
      }
    } else {
      // IE8-
      elem.attachEvent("onmousewheel", func);
    }
  }
  if (param === "remove") {
    if (elem.addEventListener) {
      if ("onwheel" in document) {
        // IE9+, FF17+
        elem.removeEventListener("wheel", func);
      } else if ("onmousewheel" in document) {
        // устаревший вариант события
        elem.removeEventListener("mousewheel", func);
      } else {
        // Firefox < 17
        elem.removeEventListener("MozMousePixelScroll", func);
      }
    } else {
      // IE8-
      elem.detachEvent("onmousewheel", func);
    }
  }
};

export const scrollPage = () => {
  document.body.style.overflow = "hidden";
  const pageScroll = document.querySelector(".page-scroll");
  const sectionBlock = document.querySelectorAll(".page-scroll > section");
  const navBar = document.querySelector("nav");
  let countSection = sectionBlock.length;
  const sectionHeight = sectionBlock[0].offsetHeight;
  let nowSection = 1;
  let btns = document.querySelectorAll(".menu-btn");

  setTimeout(() => {
    nowSection = Math.ceil(window.pageYOffset / sectionHeight);
    document.documentElement.scrollIntoView();
    window.scrollTo(0, 0);

    pageScroll.style.transform = `translateY(-${sectionHeight * nowSection}px)`;
    document
      .querySelector(`nav div[data-key="${nowSection + 1}"]`)
      .classList.add("active");
  }, 1000);

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

  let elem = document.body;
  const onWheel = e => {
    e = e || window.event;

    let delta = e.deltaY || e.detail || e.wheelDelta;

    if (e.deltaY > 0 && nowSection < countSection) {
      addDeleteEventWheel(elem, "remove", onWheel);
      navBarItems.forEach((item, i) => {
        item.classList.remove("active");
      });
      btns.forEach((item, i) => {
        item.classList.remove("active");
      });
      pageScroll.style.transform = `translateY(-${sectionHeight *
        nowSection++}px)`;

      document
        .querySelector(`nav > div[data-key="${nowSection}"]`)
        .classList.add("active");

      setTimeout(addDeleteEventWheel, 1500, elem, "add", onWheel);
    } else if (e.deltaY > 0 && nowSection === countSection) {
      return;
    } else if (e.deltaY < 0 && nowSection > 0) {
      addDeleteEventWheel(elem, "remove", onWheel);

      navBarItems.forEach((item, i) => {
        item.classList.remove("active");
      });
      btns.forEach((item, i) => {
        item.classList.remove("active");
      });

      pageScroll.style.transform = `translateY(-${sectionHeight *
        --nowSection}px)`;
      document
        .querySelector(`nav > div[data-key="${nowSection + 1}"]`)
        .classList.add("active");
      setTimeout(addDeleteEventWheel, 1500, elem, "add", onWheel);
    }
  };

  addDeleteEventWheel(elem, "add", onWheel);

  btns.forEach((item, i) => {
    item.addEventListener("click", e => {
      btns.forEach(item => {
        item.classList.remove("active");
      });
      document.querySelector("header").classList.remove("menu-open");
      document.querySelector(".pop-up").classList.remove("open");

      e.currentTarget.classList.add("active");

      pageScroll.style.transform = `translateY(-${sectionHeight *
        +e.currentTarget.dataset.key -
        sectionHeight}px)`;
      nowSection = +e.currentTarget.dataset.key;
    });
  });

  let btnMenu = document.querySelector("svg.show-menu-btn");
  let btnMenuClose = document.querySelector("svg.close-menu-btn");

  btnMenu.addEventListener("click", e => {
    document.querySelector(".js-features").classList.remove("show");
    e.currentTarget.parentNode.classList.add("menu-open");
    document.querySelector(".pop-up").classList.add("open");
    btns.forEach((item, i) => {
      item.classList.remove("active");
    });
  });

  btnMenuClose.addEventListener("click", e => {
    e.currentTarget.parentNode.classList.remove("menu-open");
    document.querySelector(".pop-up").classList.remove("open");
  });
};


export const menuBtns = () => {
  let btnService = document.querySelector(".menu-btn-service");
  let blockService = document.querySelector(".menu-services");

  btnService.addEventListener("click", e => {
    e.currentTarget.classList.toggle("active");
    blockService.classList.toggle("open");
  });
};

export const accordionShowHide = context => {
  const title = context.querySelectorAll(".js-accordion-title");
  const sections = context.querySelectorAll(".js-accordion-description");

  title.forEach((item, i) => {
    item.addEventListener("click", e => {
      title.forEach(item => {
        item.classList.remove("active");
      });
      sections.forEach(item => {
        item.classList.remove("show");
      });
      e.currentTarget.classList.add("active");

      find(e.currentTarget, "js-accordion")
        .querySelector(
          `.js-accordion-description[data-index="${e.currentTarget.dataset.key}"]`
        )
        .classList.add("show");
    });
  });
};

document.querySelectorAll(".js-accordion").forEach(accordionShowHide);

export const usOfferShowHide = () => {
  let btn = document.querySelectorAll(".js-team-us-offer");
  let sectionFeatures = document.querySelector(".js-features");

  btn.forEach(item => {
    item.addEventListener("click", e => {
      sectionFeatures.classList.toggle("show");
    });
  });
};
