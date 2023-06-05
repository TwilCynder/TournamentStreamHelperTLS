## Alternating Images
alternatingImages.js (which you can find on this repo but you should already have it if you landed on this page) is a script that allows you to cycle through an array of elements in an HTML page, meaning that only one of the elments will be visible at a time, and the currently displayed element will change at a fixed interval, with a fade. 

This script exports a class called RotatingElements. To use it, you
- create an instance of this class and pass the elements that will be cycled through to the constructor ; this will make all the elements except the first one disappear, but the cycle doesn't start yet
- maybe change properties such as the duration of the fade-in/fade-out when the current element changes
- start the cycle with startRotation (passing it the delay between changes as the single argument).

For more precise information on how the different methods are used, i invite you to read the code, documentation for each method is provided in the comments. 