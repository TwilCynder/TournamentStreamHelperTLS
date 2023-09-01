export var carouselInterval = 10000;
const fadeInTime = .3; //(seconds)
const fadeOutTime = .2;

//fade in
function fadeIn(itemID, duration) {
    gsap.to(itemID, {delay: .2, opacity: 1, duration: duration});
}

//fade out
function fadeOut(itemID, duration, funct) {
    gsap.to(itemID, {opacity: 0, duration: duration, onComplete: funct});
}

/**
 * Manages a display cycle between given elements
 */
export class RotatingElements{
    /**
     * Contructor
     * @param  {...any} args Elements that will be cycled through
     */
    constructor(...args){
      this.list = new Array(...args);
      this.current = 0;
      for (let i = 1; i < args.length; i++){
        args[i].style.opacity = 0
      }

      this.fadeIn = fadeInTime;
      this.fadeOut = fadeOutTime;
      this.crossFade = false;
      this.delay = carouselInterval;
    }
    
    /**
     * Displays the next element.  
     * This method will be called automatically, but can be used to force-advance the cycle.
     */
    next(){
      if (this.list.length < 1) return;

      let previousElement = this.list[this.current];

      this.current++;
      if (this.current >= this.list.length) this.current = 0;
  
      console.log(this.list)
      let currentElement = this.list[this.current];
      currentElement.style.visibility = 'inherit';

      if (this.crossFade){
        fadeIn(currentElement, this.fadeIn);
        fadeOut(previousElement, this.fadeOut);
      } else {
        fadeOut(previousElement, this.fadeOut, () => {
            fadeIn(currentElement, this.fadeIn);
          });
      }

    }

    /**
     * Configures the cycle.
     * You can provide properties as positional arguments as described below, or as properties of a single object argument. 
     * @param {object | boolean} crossFade if true, when changing to the next element both the fade in and fade out will occur at the same time, if false, the fade in starts when the fade out is finished
     * @param {number} fadeIn fade in duration, in seconds
     * @param {number} fadeOut fade out duration, in seconds
     * @returns the RotatingElements object, so you can chain-call
     */
    setProperties(arg0, fadeIn, fadeOut, delay){
        if (typeof arg0 == "object"){
            this.setProperties(arg0.crossFade, arg0.fadeIn, arg0.fadeOut, delay);
            return this;
        }
        this.fadeIn = fadeIn || this.fadeIn;
        this.fadeOut = fadeOut || this.fadeOut;
        this.crossFade = arg0 || this.crossFade;
        return this;
    }

    /**
     * Starts cycling between the elements passed to the constructor
     * @param {number} interval the delay before changing to the next element
     * @returns the RotatingElements object, so you can chain-call
     */
    startRotation(interval){
      this.interval = setInterval(() => {
          this.next();
      }, interval || this.delay || carouselInterval);
      return this;
    }

    /**
     * Stops the cycling
     */
    stopRotation(){
      console.log(this.interval);
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = undefined;
      }
    }

    add(element){
      this.list.push(element)
    }

    reset(){
      this.list = []
    } 

    /**
     * Changes the current delay
     * @param {number} newDelay the delay before changing to the next element
     */
    changeDelay(newDelay){
      this.stopRotation();
      this.startRotation(newDelay);
    }
}

export function getElements(...args){
    for (i = 0; i < args.length; i++){
        args[i] = document.getElementById(args[i]);
    }

    return args;
}

export function getElementsByClass(classname){
  return document.getElementsByClassName(classname); 
}