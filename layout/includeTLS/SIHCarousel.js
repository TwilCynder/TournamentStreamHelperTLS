class Carousel {
    constructor(){
      this.list = [];
      this.interval = null;
      this.selector = "";
      this.time = 5000;
    }
  
    startRotation(time){
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