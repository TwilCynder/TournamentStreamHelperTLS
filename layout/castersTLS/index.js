(($) => {
  const logoInterval = 3000;
  const fadeInTime = .3; //(seconds)
  const fadeOutTime = .2;

  if (!window.config) {
    window.config = {
      size: "normal",
    };
  }

  function Start() {}

  var data = {};
  var oldData = {};

  let oldCharacters = {};


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

  async function Update() {
    oldData = data;
    data = await getData();

    if (
      Object.keys(oldData).length == 0 ||
      Object.keys(oldData.commentary).length !=
        Object.keys(data.commentary).length
    ) {
      let html = "";
      Object.values(data.commentary).forEach((commentator, index) => {
        html += `
              <div class="commentator_container commentator${index}">
                  <div class="name"></div>
                  ${
                    window.config.size == "normal"
                      ? `<div class="real_name"></div>`
                      : ""
                  }
                  ${
                    window.config.size == "normal" ||
                    window.config.size == "mini"
                      ? `<div class="twitter"></div>`
                      : ""
                  }
              </div>
          `;
      });
      $(".container").html(html);
    }

    Object.values(data.commentary).forEach((commentator, index) => {
      if (commentator.name) {
        $(`.commentator${index}`).css("display", "");
        SetInnerHtml(
          $(`.commentator${index} .name`),
          `
            <span class="team">
              ${commentator.team ? commentator.team + "&nbsp;" : ""}
            </span>
            ${commentator.name}
          `
        );
        /*SetInnerHtml(
          $(`.commentator${index} .real_name`),
          commentator.real_name
        );*/
        SetInnerHtml(
          $(`.commentator${index} .twitter`),
          commentator.twitter ? "@" + commentator.twitter : ""
        );
      } else {
        $(`.commentator${index}`).css("display", "none");
      }
    });
  }

  Update();
  $(window).on("load", () => {
    $("body").fadeTo(800, 1, async () => {
      Start();
      setInterval(Update, 1000);
    });
  });
})(jQuery);
