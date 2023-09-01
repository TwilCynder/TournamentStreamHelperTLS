import { RotatingElements, getElementsByClass } from "../includeTLS/lib/alternatingElements.js";
import { generateDivs } from "../includeTLS/generateLogos.js";

export async function initAlternatingLogos($, logoInterval = 15000, containerClassname = "logos", configPath = "../config.json"){
    await generateDivs($, containerClassname);
    var logoRotation = new RotatingElements(...getElementsByClass("logo")).setProperties({crossFade : true}).startRotation(logoInterval);
}