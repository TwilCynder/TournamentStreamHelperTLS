import { RotatingElements, getElementsByClass } from "../includeTLS/lib/alternatingElements.js";
import { generateDivs } from "../includeTLS/generateLogos.js";

export async function initAlternatingLogos($, logoInterval = 15000, containerClassname = "logos", logoListName = "base", configPath = "../config.json", ){
    await generateDivs($, containerClassname, logoListName, configPath);
    var logoRotation = new RotatingElements(...getElementsByClass("logo_carousel")).setProperties({crossFade : true}).startRotation(logoInterval);
}