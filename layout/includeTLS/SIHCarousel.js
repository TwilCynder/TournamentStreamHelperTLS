const defaultCycleTime = 5000;

/**
 * Periodically changes the contents of a div using SetInnerHtml. 
 * It takes multiple posible contents, as well as a cycle duration and a CSS Selector targeting the div(s) that will have their content changed  
 * 
 * The different contents must be added with the add() method ; the time and the selector can be specified by : 
 * - Changing the .time and .selector properties of the object
 * - Passing it as argument (first and second respectively) when calling the constructor or startRotation
 */
export class Carousel {
    #interval = null;
    #list = []

    constructor(time, selector){
      this.time = time || defaultCycleTime;
      this.selector = selector || ""
    }
  
    /**
     * Starts the rotation, between all the possible contents that have been defined.
     * @param {number} time overrides the time property
     * @param {string} selector overrides the selector property
     */
    startRotation(time, selector){
      if (time) this.time = time;
      if (selector) this.selector = selector;
      if (this.#interval){
        clearInterval(this.#interval);
      }
      let i = 0;
      let callback = () => {
        SetInnerHtml( $(this.selector), this.#list[i]);
        i++;
        if (i >= this.#list.length){
          i = 0;
        }
      }
      callback();
      this.#interval = setInterval(callback, this.time)
    }
  
    /**
     * Clears the contents list
     */
    reset(){
      this.#list = []
    } 
  
    /**
     * Adds a possible content for the div
     * @param {string} t 
     */
    add(t){
      this.#list.push(t);
    }
    
}