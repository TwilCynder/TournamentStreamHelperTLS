function wrapChracter(html){
  return `
    <div class = "character_container">
      ${html}
    </div>    
`
}

update_delay = 5000;

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
    .from(
      [".phase.container"],
      { duration: 0.8, opacity: "0", ease: "power2.inOut" },
      0
    )
    .from([".match"], { duration: 0.8, opacity: "0", ease: "power2.inOut" }, 0)
    .from(
      [".best_of.container"],
      { duration: 0.8, opacity: "0", ease: "power2.inOut" },
      0
    )

    .from([".p1.container"], { duration: 1, x: "-100px", ease: "out" }, 0)
    .from([".p2.container"], { duration: 1, x: "100px", ease: "out" }, 0);

  Start = async (event) => {
    startingAnimation.restart();
  }

  Update = async (event) => {
    let data = event.data;
    let oldData = event.oldData;

    let isTeams = Object.keys(data.score[1].team["1"].player).length > 1;

    if (!isTeams) {
      const teams = Object.values(data.score[1].team);
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

          SetInnerHtml($(`.p${t + 1} .pronoun`), player.pronoun);

          SetInnerHtml(
            $(`.p${t + 1} > .sponsor_logo`),
            player.sponsor_logo
              ? `
                <div class='sponsor_logo' style='background-image: url(../../${player.sponsor_logo})'></div>
                `
              : ""
          );

          //SetInnerHtml($(`.p${t + 1} .real_name`), `${player.real_name}`);

          SetInnerHtml(
            $(`.p${t + 1} .twitter`),
            `
              ${
                player.twitter
                  ? `
                  <div class="twitter_logo"></div>
                  ${player.twitter}
                  `
                  : ""
              }
          `
          );

          {
            if (player.seed){
              SetInnerHtml($(`.p${t + 1} .seed`), `Seed ${player.seed}`);
            } else {
              SetInnerHtml($(`.p${t + 1} .seed`), ``);
            }
          }
          
          

          SetInnerHtml(
            $(`.p${t + 1} .flagcountry`),
            player.country.asset
              ? `
              <div>
                  <div class='flag' style='background-image: url(../../${player.country.asset});'>
                      <div class="flagname">${player.country.code}</div>
                  </div>
              </div>`
              : ""
          );

          SetInnerHtml(
            $(`.p${t + 1} .flagstate`),
            player.state.asset
              ? `
              <div>
                  <div class='flag' style='background-image: url(../../${player.state.asset});'>
                      <div class="flagname">${player.state.code}</div>
                  </div>
              </div>`
              : ""
          );

          if (
            !oldData.score ||
            JSON.stringify(player.character) !=
              JSON.stringify(
                oldData.score[1].team[String(t + 1)].player[String(p + 1)]
                  .character
              )
          ) {
            let html = "";
            let characters = Object.values(player.character);
            if (t == 0) characters = characters.reverse();
            let zIndexMultiplyier = 1;
            if (t == 1) zIndexMultiplyier = -1;
            let video = false;
            characters.forEach((character, c) => {
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
            });

            $(`.p${t + 1}.character`).html(html);

            if (video){
              setTimeout(() => {
                $(`.p${t + 1} video`).each((i, e) => e.play());
              }, 1000);
            }

            if (t == 0) characters = characters.reverse();
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
            });
          }
        };
      }
    } else {
      const teams = Object.values(data.score[1].team);
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

        SetInnerHtml($(`.p${t + 1} > .sponsor_logo`), "");

        SetInnerHtml($(`.p${t + 1} .real_name`), ``);

        SetInnerHtml($(`.p${t + 1} .twitter`), ``);

        SetInnerHtml($(`.p${t + 1} .seed`), ``);

        SetInnerHtml($(`.p${t + 1} .flagcountry`), "");

        SetInnerHtml($(`.p${t + 1} .flagstate`), "");

        let charactersHtml = "";

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
                    oldData.score[1].team[`${t + 1}`].player[`${p + 1}`].character
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

    SetInnerHtml($(`.p1 .score`), String(data.score[1].team["1"].score));
    SetInnerHtml($(`.p2 .score`), String(data.score[1].team["2"].score));

    SetInnerHtml($(".tournament"), data.tournamentInfo.tournamentName);
    SetInnerHtml($(".match"), data.score[1].match);

    if (data.score[1].phase) {
      gsap.to($(".phase.container"), {
        autoAlpha: 1,
        overwrite: true,
        duration: 0.8,
      });

      SetInnerHtml(
        $(".phase:not(.container)"),
        data.score[1].phase ? `${data.score[1].phase}` : ""
      );
    } else {
      gsap.to($(".phase.container"), {
        autoAlpha: 0,
        overwrite: true,
        duration: 0.8,
      });
    }

    if (data.score[1].best_of_text) {
      gsap.to($(".best_of.container"), {
        opacity: 1,
        overwrite: true,
        duration: 0.8,
      });

      SetInnerHtml(
        $(".container .best_of"),
        data.score[1].best_of_text ? `${data.score[1].best_of_text}` : ""
      );
    } else {
      gsap.to($(".best_of.container"), {
        opacity: 0,
        overwrite: true,
        duration: 0.8,
      });
    }

    let stage = null;

    if (_.get(data, "score.1.stage_strike.selectedStage")) {
      let stageId = _.get(data, "score.1.stage_strike.selectedStage");

      let allStages = _.get(data, "score.ruleset.neutralStages", []).concat(
        _.get(data, "score.ruleset.counterpickStages", [])
      );

      stage = allStages.find((s) => s.codename == stageId);
    }

    if (
      stage &&
      _.get(data, "score.1.stage_strike.selectedStage") !=
        _.get(oldData, "score.1.stage_strike.selectedStage")
    ) {
      gsap.fromTo(
        $(`.stage`),
        { scale: 1.6 },
        { scale: 1.2, duration: 0.6, ease: "power2.out" }
      );
    }

    SetInnerHtml(
      $(`.stage`),
      stage
        ? `
        <div>
            <div class='' style='background-image: url(../../${stage.path});'>
            </div>
        </div>`
        : ""
    );
  }
});
