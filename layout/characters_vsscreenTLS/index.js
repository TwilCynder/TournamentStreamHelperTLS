function wrapChracter(html){
  return `
    <div class = "character_container">
      ${html}
    </div>    
`
}

update_delay = 5000;

function calc_point(center, target, ratio){
  return {
    x : center.x + ((target.x - center.x) * ratio),
    y : center.y + ((target.y - center.y) * ratio),
  }
}

function point(x, y){
  return {x: x, y: y};
}

function stat(name, x, y, max, min){
  return {name: name, point : point(x, y), max: max, min: min}
}

let center = {
  x: 250,
  y: 210
}

let stats = [
  stat("weight", 250, 70, 130, 65),
  stat("air_speed", 116, 166, 1.334, 0.735),
  stat("fall_speed", 166, 327, 2.1, 0.98),
  stat("dash_speed", 333, 327, 2.45, 1.45),
  stat("run_speed", 385, 166, 3, 1.18)
]

function graph_clip_path(character_data){
  if (!character_data) return "";
  console.log(character_data)
  let res = "clip-path: polygon("
  for (let i = 0; i < stats.length; i++){
    let s = stats[i];
    let value = character_data[s.name];
    let point = calc_point(center, s.point, (value - s.min) / (s.max - s.min));
    res += point.x + "px " + point.y + "px";
    if (i < stats.length - 1) res += ","
  }

  res += ");"
  console.log(res);
  return res;
}

let char_data = null

let data_promise = fetch("./data.json")
    .then(response => response.json())
    .then(json => char_data = json)


LoadEverything(() => {
  // Change this to the name of the assets pack you want to use
  // It's basically the folder name: user_data/games/game/ASSETPACK
  let ASSET_TO_USE = tsh_settings.asset_key;

  // Change this to select wether to flip P2 character asset or not
  // Set it to true or false
  let FLIP_P2_ASSET = tsh_settings.flip_p2_asset;

  // Amount of zoom to use on the assets. Use 1 for 100%, 1.5 for 150%, etc.
  let zoom = tsh_settings.zoom;

  // Where to center character eyesights. [ 0.0 - 1.0 ]
  let EYESIGHT_CENTERING = tsh_settings.eyesight_centering;

  let startingAnimation = gsap
    .timeline({ paused: true })
    .from([".p1.container"], { duration: 1, x: "-100px", ease: "out" }, 0)
    .from([".p2.container"], { duration: 1, x: "100px", ease: "out" }, 0);

  Start = async (event) => {
    startingAnimation.restart();
  }

  Update = async (event) => {
    let data = event.data;
    let oldData = event.oldData;

    let isTeams = Object.keys(data.score.team["1"].player).length > 1;

    if (!isTeams) {
      const teams = Object.values(data.score.team);
      for (const [t, team] of teams.entries()) {
        const players = Object.values(team.player);
        for (const [p, player] of players.entries()) {
          SetInnerHtml(
            $(`.p${t + 1} .name`),
            `
              <span>
                  <div>
                    <span class='sponsor'>
                        ${player.team ? player.team : ""}
                    </span>
                    ${player.name}
                  </div>
                  ${team.losers ? "<span class='losers'>L</span>" : ""}
              </span>
            `
          );


          if (
            !oldData.score ||
            JSON.stringify(player.character) !=
              JSON.stringify(
                oldData.score.team[String(t + 1)].player[String(p + 1)]
                  .character
              )
          ) {
            let html = "";
            let characters = Object.values(player.character);
            let character = characters[0]; //we only support 1 char per player
            if (t == 0) characters = characters.reverse();
            let zIndexMultiplyier = 1;
            if (t == 1) zIndexMultiplyier = -1;
            let video = false;

            console.log("Char : ", ASSET_TO_USE, character.assets[ASSET_TO_USE]);
            if (
              character &&
              character.assets &&
              character.assets[ASSET_TO_USE]
            ) {
              if (!character.assets[ASSET_TO_USE].asset.endsWith(".webm")) {
                // if asset is a image, add a image element
                html += wrapChracter(`
                  <img
                    class="portrait ${
                      !FLIP_P2_ASSET && t == 1 ? "invert_shadow flip" : ""
                    }"
                    src='
                        ../../${
                          character.assets[ASSET_TO_USE].asset
                        }
                        
                  '/>
                `);
              } else {
                video = true;
                // if asset is a video, add a video element
                html += wrapChracter(`
                  <video id="video_${p}" class="video" width="auto" height="100%" muted>
                    <source src="../../${
                      character.assets[ASSET_TO_USE].asset
                    }">
                  </video>
                `);
              }
            }

            $(`.p${t + 1}.character`).html(html);
            SetInnerHtml($(`.p${t + 1} .char_name`), character.display_name);

            

            $(`.p${t + 1} .graph`).css("clip-path", "polygon(250px 70px, 116px 166px, 166px 327px, 333px 327px, 385px 166px);")

            document.getElementById(`p${t+1}_graph`).style =  graph_clip_path(char_data[character.codename])

            if (video){
              setTimeout(() => {
                $(`.p${t + 1} video`).each((i, e) => e.play());
              }, 1000);
            }

            let c = 0;


            if (character) {
              
              gsap
                .timeline()
                .fromTo(
                  [`.p${t + 1}.character `],
                  {
                    x: zIndexMultiplyier * -800 + "px",
                    z: 0,
                    rotationY: zIndexMultiplyier * 15 * (c + 1),
                  },
                  {
                    duration: 0.4,
                    x: zIndexMultiplyier * -40 + "px",
                    z: -c * 50 + "px",
                    rotationY: zIndexMultiplyier * 15 * (c + 1),
                    ease: "in",
                  },
                  c / 10
                )
                .to([`.p${t + 1}.character`], {
                  duration: 3,
                  x: 0,
                  ease: "out",
                });

              gsap
                .timeline()
                .from(
                  `.p${t + 1}.character .character_container`,
                  {
                    duration: 0.2,
                    opacity: 0,
                  },
                  c / 10
                )
                .from(`.p${t + 1}.character .character_container`, {
                  duration: 0.4,
                  filter: "brightness(0%)",
                  onUpdate: function (tl) {
                    var tlp = (this.progress() * 100) >> 0;
                    TweenMax.set(
                      `.p${t + 1}.character .character_container`,
                      {
                        filter: "brightness(" + tlp + "%)",
                      }
                    );
                  },
                  onUpdateParams: ["{self}"],
                });
            }
          }

        };
      }

      await data_promise;

    } else {
      const teams = Object.values(data.score.team);
      for (const [t, team] of teams.entries()) {
        let teamName = "";

        if (!team.teamName || team.teamName == "") {
          let names = [];
          for (const [p, player] of Object.values(team.player).entries()) {
            if (player && player.name) {
              names.push(player.name);
            }
          };
          teamName = names.join(" / ");
        } else {
          teamName = team.teamName;
        }

        SetInnerHtml(
          $(`.p${t + 1} .name`),
          `
            <span>
                <div>
                  ${teamName}
                </div>
                ${team.losers ? "<span class='losers'>L</span>" : ""}
            </span>
          `
        );

        let charactersChanged = false;

        if (!oldData) {
          charactersChanged = true;
        } else {
          Object.values(team.player).forEach((player, p) => {
            Object.values(player.character).forEach((character, index) => {
              try {
                if (
                  JSON.stringify(player.character) !=
                  JSON.stringify(
                    oldData.score.team[`${t + 1}`].player[`${p + 1}`].character
                  )
                ) {
                  charactersChanged = true;
                }
              } catch {
                charactersChanged = true;
              }
            });
          });
        }

        if (charactersChanged) {
          let html = "";
          let characters = [];

          Object.values(team.player).forEach((player, p) => {
            Object.values(player.character).forEach((character, index) => {
              characters.push(character);
            });
          });

          if (t == 1) characters = characters.reverse();
          let zIndexMultiplyier = 1;
          if (t == 1) zIndexMultiplyier = -1;
          characters.forEach((character, c) => {
            if (
              character &&
              character.assets &&
              character.assets[ASSET_TO_USE]
            ) {
              if (!character.assets[ASSET_TO_USE].asset.endsWith(".webm")) {
                // if asset is a image, add a image element
                html += `

                    <div
                      class="portrait ${
                        !FLIP_P2_ASSET && t == 1 ? "invert_shadow" : ""
                      }"
                      style='
                          background-image: url(../../${
                            character.assets[ASSET_TO_USE].asset
                          });
                          ${
                            t == 1 && FLIP_P2_ASSET
                              ? "transform: scaleX(-1)"
                              : ""
                          }
                      '>
                      </div>
                  `;
              } else {
                // if asset is a video, add a video element
                html += `
                <div class="bg char${
                  t == 1 ? c : characters.length - 1 - c
                }" style="z-index: ${c * zIndexMultiplyier};">
                  <video id="video_${p}" class="video" width="auto" height="100%" autoplay muted>
                    <source src="../../${character.assets[ASSET_TO_USE].asset}">
                  </video>
                </div>
                  `;
              }
            }
          });

          $(`.p${t + 1}.character`).html(html);

          characters = characters.reverse();

          characters.forEach((character, c) => {
            if (character.assets[ASSET_TO_USE]) {
              CenterImage(
                $(`.p${t + 1}.character .char${c} .portrait`),
                character.assets[ASSET_TO_USE],
                zoom,
                EYESIGHT_CENTERING
              );
            }
          });

          characters.forEach((character, c) => {
            if (character) {
              gsap
                .timeline()
                .fromTo(
                  [`.p${t + 1}.character .char${c}`],
                  {
                    x: zIndexMultiplyier * -800 + "px",
                    z: 0,
                    rotationY: zIndexMultiplyier * 15 * (c + 1),
                  },
                  {
                    duration: 0.4,
                    x: zIndexMultiplyier * -40 + "px",
                    z: -c * 50 + "px",
                    rotationY: zIndexMultiplyier * 15 * (c + 1),
                    ease: "in",
                  },
                  c / 10
                )
                .to([`.p${t + 1}.character .char${c}`], {
                  duration: 3,
                  x: 0,
                  ease: "out",
                });

              gsap
                .timeline()
                .from(
                  `.p${t + 1}.character .char${c} .portrait_container`,
                  {
                    duration: 0.2,
                    opacity: 0,
                  },
                  c / 10
                )
                .from(`.p${t + 1}.character .char${c} .portrait_container`, {
                  duration: 0.4,
                  filter: "brightness(0%)",
                  onUpdate: function (tl) {
                    var tlp = (this.progress() * 100) >> 0;
                    TweenMax.set(
                      `.p${t + 1}.character .char${c} .portrait_container`,
                      {
                        filter: "brightness(" + tlp + "%)",
                      }
                    );
                  },
                  onUpdateParams: ["{self}"],
                });
            }
          });
        }
      };
    }

  }
});



/*
499 422

283

angles : 90 162 234 306 18
*/