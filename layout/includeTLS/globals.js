class Carousel {
    constructor(){
      this.list = [];
      this.interval = null;
      this.selector = "";
      this.time = 5000;
    }
  
    start(time){
      if (time) this.time = time;
      if (this.interval){
        clearInterval(this.interval);
      }
      let i = 0;
      let callback = () => {
        SetInnerHtml( $(this.selector), this.list[i]);
        i++;
        if (i >= this.list.length){
          i = 0;
        }
      }
      callback();
      this.interval = setInterval(callback, this.time)
    }
  
    reset(){
      this.list = []
    } 
  
    add(t){
      this.list.push(t);
    }
    
  }

let roundTranslation = {
  "32" : {
    "Tour 1": "Top 24 Winner",
    "Quart": "Top 12 Winner"
  },
  "8" : {
    "Tour 1" : "Top 8 Loser"
  }
}

function translateRound(phase, round){
  for (let p in roundTranslation){
    console.log("Phase : ", p);
    if (phase.includes(p)){
      console.log("YE", roundTranslation[p])
      for (let r in roundTranslation[p]){
        console.log("Match : ", r);
        if (round.includes(r)) {
          console.log("YEEEE")
          return roundTranslation[p][r]
        }
      }
    }
  }
  return round;
}