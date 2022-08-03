const logoInterval = 10000;
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
      for (i = 1; i < args.length; i++){
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
}

function getElements(...args){
    for (i = 0; i < args.length; i++){
        args[i] = document.getElementById(args[i]);
    }

    return args;
}

let logoRotation = new RotatingElements(...getElements(
    "logo-tls", "logo-soc"
))

setInterval(() => {
    logoRotation.next();
  }, logoInterval);