async function loadLogoConfig(path){
    path = path || "../config.json";
    return await fetch(path)
        .then(response => response.json());
}

export async function generateDivs($, containerClassName, logoListName, configPath){
    if (!containerClassName) return;
    if (!containerClassName.startsWith(".")){
        containerClassName = '.' + containerClassName;
    }

    let config = await loadLogoConfig(configPath);

    if (!config || !config.logos) {
        console.log("No logo config.")
    };

    let logos = logoListName ? config.logos[logoListName] : config.logos;
    if (!logos) console.log("No logo config.");

    let res = "";
    for (let logoName of logos){
        
        res += `<div class="logo_carousel" id = "${logoName}"></div>`
    }

    $(containerClassName).html(res);
    
}
