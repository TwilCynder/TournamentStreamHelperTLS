export function currentScriptPolyfill(){
    document.currentScript = document.currentScript || (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();
}
export function whoeverDesignedScriptTagsISincerelyHopeYouDieFast(){
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1]; 
}