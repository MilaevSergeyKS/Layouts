import "./App.scss";
import objectFitImages from "object-fit-images";
import svg4everybody from "svg4everybody";


objectFitImages();
svg4everybody();

// load assets
function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context("./img", true, /\.(jpe?g|png|gif)$/i));
importAll(require.context("./img/svg", true, /\.(svg)$/));
