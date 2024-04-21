import { initAlternatingLogos } from "../includeTLS/initAlternatingLogos.js";
import { Carousel } from "../includeTLS/SIHCarousel.js";
import { translateRound } from "../includeTLS/util.js";
import { startTimeDisplay } from "../includeTLS/timeDisplayManager.js";

update_delay = 2000;
let logo_interval = 10000;

let SLTTeams = {};
let SLTTeamNames = {};

let teamsPromise = fetch('./Equipes.json')
  .then( res => res.json())
  .then( json => {
    SLTTeams = json;
});

let teamNamesPromise = fetch('./TeamNames.json')
  .then (res => res.json())
  .then (json => {
    SLTTeamNames = json;
  })

async function updateSLTTeam(teamN, playerName){
  await Promise.all([teamsPromise, teamNamesPromise]);
  let team = SLTTeams[playerName];
  team = SLTTeamNames[team] || team;
  console.log("SLT TEAM", playerName, team);
  if (team){
    SetInnerHtml(
      $(`.p${teamN + 1} .team_name`),
      team
    );
    $(`.p${teamN + 1}.league_team`).show();
  } else {
    $(`.p${teamN + 1}.league_team`).hide();
  }
}

const default_config = {
  display : {
    "inline_pronoun" : true,
    "sponsor":  true
  }
}

LoadEverything().then(() => {
  let carousels = [
    new Carousel(),
    new Carousel()
  ]


  let config = _.defaultsDeep(window.config, default_config);

  initAlternatingLogos($, logo_interval);

  gsap.config({ nullTargetWarn: false, trialWarn: false });

  let startingAnimation = gsap
    .timeline({ paused: true })
    .from([".logo"], { duration: 0.5, autoAlpha: 0, ease: "power2.inOut" }, 0.5)
    .from(
      [".anim_container_outer"],
      {
        duration: 1,
        width: "0",
        ease: "power2.inOut",
      },
      1
    )
    .from(
      [".bottom"],
      {
        duration: 1,
        autoAlpha: 0,
        ease: "power2.inOut",
      },
      1
    )
    .from(
      ["#bestof"],{
        duration: 1,
        autoAlpha: 0,
        ease: "power2.inOut"
      },
      1 
    )
    .from(
      [".fgc .top", ".fgc .player"],
      {
        duration: 1,
        y: "-100px",
        ease: "power2.inOut",
      },
      0
    )
    .from(
      [".fgc:not(.bblue) .bottom"],
      {
        duration: 1,
        y: "+100px",
        ease: "power2.inOut",
      },
      0
    )
    .from(
      [".fgc.bblue .bottom"],
      {
        duration: 1,
        autoAlpha: 0,
        ease: "power2.inOut",
      },
      0.2
    );

  Start = async () => {
    startingAnimation.restart();
    $(`.league_team`).hide();
  };

  Update = async (event) => {

    console.log("UPDATE");
    let data = event.data;
    let oldData = event.oldData;


    let casters = Object.values(data.commentary);
    console.log(casters)
    let html = ""
    casters.forEach((commentator, index) => {
      if (commentator.name){
        html += `
        <span class = "caster_name">${commentator.name}</span>
        `;
      }
    });
    $("#caster_names_container").html(html);

    let isTeams = Object.keys(data.score[1].team["1"].player).length > 1;

    

    if (!isTeams) {
      for (const [t, team] of [
        data.score[1].team["1"],
        data.score[1].team["2"],
      ].entries()) {

        for (const [p, player] of [team.player["1"]].entries()) {
          if (player) {

            console.log("________")
            console.log(player.name, player.name == "Ganymède");
            console.log("TTTT", await Transcript(player.name))


            SetInnerHtml(
              $(`.p${t + 1}.container .name`),
              `
                ${config.display.sponsor ? `
                  <span class="sponsor">
                    ${player.team ? player.team : ""}
                  </span>` 
                  : ""
                }
                ${await Transcript(player.name)}
                ${config.display.inline_pronoun ? `
                  <span class="pronoun scoreboard_pronoun">
                  ${player.pronoun ? player.pronoun : ""}
                  </span>`
                  : ""
                }
                
                ${team.losers ? "<span class='losers'>L</span>" : ""}
              `
            );

            updateSLTTeam(t, player.name);

            SetInnerHtml(
              $(`.p${t + 1} .flagcountry`),
              player.country.asset
                ? `<div class='flag' style='background-image: url(../../${player.country.asset.toLowerCase()})'></div>`
                : ""
            );

            SetInnerHtml(
              $(`.p${t + 1} .flagstate`),
              player.state.asset
                ? `<div class='flag' style='background-image: url(../../${player.state.asset})'></div>`
                : ""
            );

            /*await CharacterDisplay(
              $(`.p${t + 1}.container .character_container`),
              {
                asset_key: "base_files/icon",
                source: `score.1.team.${t + 1}`,
              },
              event
            );*/

            SetInnerHtml(
              $(`.p${t + 1}.container .sponsor_icon`),
              player.sponsor_logo
                ? `<div style='background-image: url(../../${player.sponsor_logo})'></div>`
                : ""
            );

            SetInnerHtml(
              $(`.p${t + 1}.container .avatar`),
              player.avatar
                ? `<div style="background-image: url('../../${player.avatar}')"></div>`
                : ""
            );

            SetInnerHtml(
              $(`.p${t + 1}.container .online_avatar`),
              player.online_avatar
                ? `<div style="background-image: url('${player.online_avatar}')"></div>`
                : ""
            );

            SetInnerHtml(
              $(`.p${t + 1} .twitter`),
              player.twitter
                ? `<span class="twitter_logo"></span>${String(player.twitter)}`
                : ""
            );

            SetInnerHtml(
              $(`.p${t + 1} .pronoun.chip`),
              player.pronoun ? player.pronoun : ""
            );

            SetInnerHtml(
              $(`.p${t + 1} .seed`),
              player.seed ? `Seed ${player.seed}` : ""
            );

            SetInnerHtml(
              $(`.p${t + 1}.container .sponsor-container`),
              `<div class='sponsor-logo' style='background-image: url(../../${player.sponsor_logo})'></div>`
            );

            SetInnerHtml($(`.p${t + 1}.score`), String(team.score));
            SetInnerHtml($(`.p${t + 1} .score`), String(team.score));

            if ($(".sf6.online").length > 0) {
              console.log("hi");
              console.log(player.twitter);
              console.log(player.pronoun);
              if (!player.twitter && !player.pronoun) {
                gsap.to($(`.p${t + 1}.chips`), { autoAlpha: 0 });
              } else {
                gsap.to($(`.p${t + 1}.chips`), { autoAlpha: 1 });
              }
            }
          }
        }
      }
    } else {
      $(`.league_team`).hide();

      for (const [t, team] of [
        data.score[1].team["1"],
        data.score[1].team["2"],
      ].entries()) {
        let teamName = "";
        let teamNamePlayers = ""

        let names = [];
        for (const [p, player] of Object.values(team.player).entries()) {
          if (player && player.name) {
            names.push(player.name);
          }
        }
        teamNamePlayers = names.join(" / ");

        teamName = (!team.teamName || team.teamName == "") ? teamNamePlayers : team.teamName;

        let carousel = carousels[t];
        carousel.reset();
        carousel.add(`
          ${teamName}
          ${team.losers ? " [L]" : ""}
        `);
        carousel.add(`
          ${teamNamePlayers}
          ${team.losers ? "<span class='losers'>L</span>" : ""}
        `);
        carousel.selector = `.p${t + 1}.container .name`

        carousel.startRotation(10000);

        SetInnerHtml($(`.p${t + 1}.score`), String(team.score));

        if ($(".sf6.online").length > 0) {
          if (!player.twitter && !player.pronoun) {
            gsap.to($(`.p${t + 1}.chips`), { autoAlpha: 0 });
          } else {
            gsap.to($(`.p${t + 1}.chips`), { autoAlpha: 1 });
          }
        }


        SetInnerHtml($(`.p${t + 1} .flagcountry`), "");

        SetInnerHtml($(`.p${t + 1} .flagstate`), "");
        

        await CharacterDisplay(
          $(`.p${t + 1}.container .character_container`),
          {
            asset_key: "base_files/icon",
            source: `score.1.team.${t + 1}`,
            slice_character: [0, 1],
          },
          event
        );



        SetInnerHtml($(`.p${t + 1}.container .sponsor_icon`), "");

        SetInnerHtml($(`.p${t + 1}.container .avatar`), "");

        SetInnerHtml($(`.p${t + 1}.container .online_avatar`), "");

        SetInnerHtml($(`.p${t + 1} .twitter`), "");
        

        SetInnerHtml($(`.p${t + 1}.container .sponsor-container`), "");


      }
    }

    SetInnerHtml($(".tournament_name"), data.tournamentInfo.tournamentName);

    let match = data.score[1].match;

    try {
      match = translateRound(data.score[1].phase, data.score[1].match);
    } catch (e){
      console.error(e);
    }

    SetInnerHtml($(".match"), match);

    try {
      let nextMatch = data.streamQueue && data.streamQueue.toulouselaststock["2"];
      console.log(nextMatch)
      if (nextMatch){
        console.log("LLLO ,,", nextMatch)
        let t1 = nextMatch.team["1"];
        let t2 = nextMatch.team["2"];
        let text = 
          `Prochain match : <span class = "next_set_name">${t1 ? t1.player["1"].name : "TBD"}</span> VS <span class = "next_set_name">${t2 ? t2.player["1"].name : "TBD"}</span>`;

        $("#next_set").show()
        SetInnerHtml($("#next_set"), text);
      } else {
        $("#next_set").hide()
      }
    } catch (e) {
      //pas de stream queue
      $("#next_set").hide()
    }

    let phaseTexts = [];
    if (data.score[1].phase) phaseTexts.push(data.score[1].phase);
    if (data.score[1].best_of_text) phaseTexts.push(data.score[1].best_of_text);

    SetInnerHtml($(".phase"), phaseTexts.join(" - "));
    SetInnerHtml($("#bestof"), "Best of " + data.score[1].best_of);
  };
});

startTimeDisplay("time");