import "./App.scss";
import objectFitImages from "object-fit-images";
import svg4everybody from "svg4everybody";

import {
  scrollPage,
  usOfferShowHide,
  menuBtns,
  accordionShowHide
} from "./js/main";

document.addEventListener("DOMContentLoaded", () => {
  scrollPage();
});
usOfferShowHide();
menuBtns();
objectFitImages();
svg4everybody();

///////////
///////////
///////////
//Delete after enter href in social links
document.querySelectorAll(".social-link a").forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();
  });
});
///////////
///////////
///////////

// load assets
function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context("./img", true, /\.(jpe?g|png|gif)$/i));
importAll(require.context("./img/svg", true, /\.(svg)$/));
