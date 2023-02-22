(($) => {
  if (!window.config) {
    window.config = {
      size: "normal",
    };
  }

  function Start() {}

  var data = {};
  var oldData = {};

  var logos = $("#logos-container");

  async function Update() {
    oldData = data;
    data = await getData();

    if (
      Object.keys(oldData).length == 0 ||
        Object.keys(oldData.commentary).length !=
        Object.keys(data.commentary).length 
    ) {
      let html = "";

      let casters = Object.values(data.commentary);

      casters.forEach((commentator, index) => {
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

    let casters = Object.values(data.commentary);
    if (casters.length < 1 || casters[1].name == ""){
      logos.hide();
    } else {
      logos.show();
    }

    casters.forEach((commentator, index) => {
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
