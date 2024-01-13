const updateCycle = 10000;

function makeDateString(){
    let date = new Date();
    return date.getHours() + ":" + date.getMinutes() + " CET";
}

function update(id){
    console.log(document.getElementById(id));
    document.getElementById("time").innerHTML = makeDateString();
}

export function startTimeDisplay(id){
    update(id);
    setInterval(update.bind(null, id), updateCycle);
}
