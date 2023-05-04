(($) => {
  let startingAnimation = gsap
    .timeline({ paused: true })
    .from($(".recent_sets"), { autoAlpha: 0 });

  var playersRecentSets = null;
  var players = null;

  async function Start() {
    startingAnimation.restart();
  }

  var data = {};
  var oldData = {};

  function generatePlayerHTML(player, id){
    if (player) {
      return `
        <div class="player_${id}">
          <span class="sponsor">
            ${player.team ? player.team : ""}
          </span>
          <br>
          ${player.name}
        </div>
      `;
    }
    return "";
  }

  async function Update() {
    oldData = data;
    data = await getData();

    if (
      !oldData.score ||
      JSON.stringify(oldData.score.recent_sets) !=
        JSON.stringify(data.score.recent_sets)
    ) {
      playersRecentSets = data.score.recent_sets;
    } else {
      return;
    }

    players = "";
    recentSetsHtml = "";

    if (
      playersRecentSets == null ||
      (playersRecentSets.state == "done" && playersRecentSets.sets.length == 0)
    ) {
      recentSetsHtml += ``;
      players += ``;
    } else if (playersRecentSets.state != "done") {
      recentSetsHtml += `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
      players = "";
    } else {
      let count = 0;
      let p1Victories = 0;
      let p2Victories = 0;

      playersRecentSets.sets.forEach( (_set) => {
        if (count < 5){

          recentSetsHtml += `
            <div class="set_container">
              <div class="${_set.winner == 0 ? "set_winner" : "set_loser"}">
                ${_set.score[0]}
              </div>
              <div class="set_info">
                <div class="set_title">
                    ${_set.online ? `<div class="wifi_icon"></div>` : ""}
                    ${_set.tournament}
                    <div class="set_date">
                      ${new Date(_set.timestamp * 1000).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </div>
                </div>
              <div class="set_data">
                <div class="set_phase">
                  ${_set.phase_id}
                  ${_set.phase_name}
                </div>
                  <div class="set_round">
                    ${_set.round}
                  </div>
                </div>
              </div>
              <div class="${_set.winner == 1 ? "set_winner" : "set_loser"}">
                ${_set.score[1]}
              </div>
            </div>
          `;

          count++;
        }

        if (_set.score[0] > _set.score[1]){
          p1Victories++;
        } else {
          p2Victories++;
        }

      })

      console.log(p1Victories, p2Victories);
      $("#set_count").html(`${p1Victories} - ${p2Victories}`);


      let team = data.score.team["1"];
      if (team)
        players += generatePlayerHTML(team.player["1"], 1)

      players += `
        <div id = "set_count">${p1Victories} - ${p2Victories}</div>
      `
      
      team = data.score.team["2"];
      if (team)
          players += generatePlayerHTML(team.player["1"], 2)

      /*
      playersRecentSets.sets.slice(0, 5).forEach((_set) => {
        recentSetsHtml += `
            <div class="set_container">
              <div class="${_set.winner == 0 ? "set_winner" : "set_loser"}">
                ${_set.score[0]}
              </div>
              <div class="set_info">
                <div class="set_title">
                    ${_set.online ? `<div class="wifi_icon"></div>` : ""}
                    ${_set.tournament}
                    <div class="set_date">
                      ${new Date(_set.timestamp * 1000).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </div>
                </div>
              <div class="set_data">
                <div class="set_phase">
                  ${_set.phase_id}
                  ${_set.phase_name}
                </div>
                  <div class="set_round">
                    ${_set.round}
                  </div>
                </div>
              </div>
              <div class="${_set.winner == 1 ? "set_winner" : "set_loser"}">
                ${_set.score[1]}
              </div>
            </div>
          `;
      });
      */
    }

    SetInnerHtml($(`.recent_sets_players`), players);
    SetInnerHtml($(`.recent_sets_content`), recentSetsHtml);
  }

  // Using update here to set images as soon as possible
  // so that on window.load they are already preloaded
  Update();
  $(window).on("load", () => {
    $("body").fadeTo(0, 1, async () => {
      Start();
      setInterval(Update, 4000);
    });
  });
})(jQuery);
