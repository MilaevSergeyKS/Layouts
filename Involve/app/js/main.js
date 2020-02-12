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

      pageScroll.style.transform = `translateY(-${sectionHeight *
        --nowSection}px)`;
      document
        .querySelector(`nav > div[data-key="${nowSection + 1}"]`)
        .classList.add("active");
      setTimeout(addDeleteEventWheel, 1500, elem, "add", onWheel);
    }
  };

  addDeleteEventWheel(elem, "add", onWheel);
};

export const selectOpenHide = () => {
  document.querySelectorAll("form .value").forEach((item, i) => {
    item.addEventListener("click", e => {
      e.currentTarget.parentNode.classList.toggle("open");
    });
  });
};
