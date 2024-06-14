update_delay = 4000;

LoadEverything(() => {
  let startingAnimation = gsap
    .timeline({ paused: true })
    .from($(".recent_sets"), { autoAlpha: 0 });

  var playersRecentSets = null;
  var players = null;

  Start = async (event) => {
    startingAnimation.restart();
  };

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

  Update = async (event) => {
    
    let data = event.data;
    let oldData = event.oldData;

    if (
      !oldData.score ||
      JSON.stringify(oldData.score[1].recent_sets) !=
        JSON.stringify(data.score[1].recent_sets)
    ) {
      playersRecentSets = data.score[1].recent_sets;
      console.log(playersRecentSets);
    } else {
      return; //for performance ??
    }

    recentSetsHtml = "";
    players = "";

    if (
      playersRecentSets == null ||
      (playersRecentSets.state == "done" && playersRecentSets.sets.length == 0)
    ) {
      recentSetsHtml = `No sets found`;
    } else if (playersRecentSets.state != "done") {
      recentSetsHtml += `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
    } else {

      let count = 0;
      let p1Victories = 0;
      let p2Victories = 0;

      for (const _set of playersRecentSets.sets) {
        if (count < 5 ){
          recentSetsHtml += `
            <div class="set_container">
              <div class="score ${_set.winner == 0 ? "set_winner" : "set_loser"}">
                <div class = "score_inner">${_set.score[0]}</div>
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
                <div class="score ${_set.winner == 1 ? "set_winner" : "set_loser"}">
                  <div class = "score_inner">${_set.score[1]}</div>
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
      }

      console.log(p1Victories, p2Victories);
      $("#set_count").html(`${p1Victories} - ${p2Victories}`);


      let team = data.score[1].team["1"];
      if (team)
        players += generatePlayerHTML(team.player["1"], 1)

      players += `
        <div id = "set_count">${p1Victories} - ${p2Victories}</div>
      `
      
      team = data.score[1].team["2"];
      if (team)
          players += generatePlayerHTML(team.player["1"], 2)
    }

    SetInnerHtml($(`.recent_sets_players`), players);
    SetInnerHtml($(`.recent_sets_content`), recentSetsHtml);
  };

});
