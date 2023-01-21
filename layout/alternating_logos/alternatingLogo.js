const logoInterval = 15000;
const fadeInTime = .3; //(seconds)
const fadeOutTime = .2;

  //fade in
  function fadeIn(itemID) {
    gsap.to(itemID, {delay: .2, opacity: 1, duration: fadeInTime});
  }

  //fade out
  function fadeOut(itemID, funct) {
    gsap.to(itemID, {opacity: 0, duration: fadeOutTime, onComplete: funct});
  }

class RotatingElements extends Array{
    constructor(...args){
      super(...args);
      this.current = 0;
      for (let i = 1; i < args.length; i++){
        args[i].style.opacity = 0
      }
    }
  
    next(){
      let previousElement = this[this.current];


      this.current++;
      if (this.current >= this.length) this.current = 0;
  
      let currentElement = this[this.current];

      fadeOut(previousElement, () => {
        fadeIn(currentElement, 0);
      })
    }

    startRotation(interval){
      this.interval = setInterval(() => {
          this.next();
      }, interval);
      return this;
    }

    stopRotation(){
      console.log(this.interval);
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = undefined;
      }
    }

    changeDelay(newDelay){
      this.stopRotation();
      this.startRotation(newDelay);
    }
}

function getElements(...args){
    for (i = 0; i < args.length; i++){
        args[i] = document.getElementById(args[i]);
    }

    return args;
}

function getElementsByClass(classname){
  return document.getElementsByClassName(classname); 
}

var logoRotation = new RotatingElements(...getElementsByClass("logo")).startRotation(logoInterval);