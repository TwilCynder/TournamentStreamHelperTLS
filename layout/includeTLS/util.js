let roundTranslation = {
    "32" : {
      "Tour 1": "Top 24 Winner",
      "Quart": "Top 12 Winner"
    },
    "8" : {
      "Tour 1" : "Top 8 Loser"
    }
  }
  
export function translateRound(phase, round){
    for (let p in roundTranslation){
      if (phase.includes(p)){
        for (let r in roundTranslation[p]){
          console.log("Match : ", r);
          if (round.includes(r)) {
            return roundTranslation[p][r]
          }
        }
      }
    }
    return round;
  }