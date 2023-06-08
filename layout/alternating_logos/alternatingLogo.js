import { RotatingElements, getElementsByClass} from "./alternatingImages.js";

console.log(RotatingElements);
var logoRotation = new RotatingElements(...getElementsByClass("logo")).setProperties({crossFade : true}).startRotation(5000);