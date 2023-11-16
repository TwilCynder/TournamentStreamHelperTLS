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

    if (!config) {
        console.error("No config file.")
        return;
    };

    let logos_config;
    if (config.logos_configs && config.current_logos_config){
        logos_config = config.logos_configs[config.current_logos_config]
    } else if (config.logos){
        logos_config = config.logos;
    } else {
        console.error("No logo config.")
        return;
    }

    let res = "";
    for (let logoName of logos){
        
        res += `<div class="logo_carousel" id = "${logoName}"></div>`
    }

    $(containerClassName).html(res);
    
}
