update_delay = 2000;

LoadEverything(() => {

  class Carousel {
    constructor(){
      this.list = [];
      this.interval = null;
      this.selector = "";
      this.time = 5000;
    }
  
    start(time){
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
  
  let carousels = [
      new Carousel(),
      new Carousel()
  ]



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
  };

  Update = async (event) => {
    let data = event.data;
    let oldData = event.oldData;


    let casters = Object.values(data.commentary);
    let html = ""
    casters.forEach((commentator, index) => {
      html += `
        <span class = "caster_name">${commentator.name}</span>
        `;
    });
    $("#caster_names_container").html(html);

    let isTeams = Object.keys(data.score.team["1"].player).length > 1;

    if (!isTeams) {
      for (const [t, team] of [
        data.score.team["1"],
        data.score.team["2"],
      ].entries()) {
        for (const [p, player] of [team.player["1"]].entries()) {
          if (player) {
            SetInnerHtml(
              $(`.p${t + 1}.container .name`),
              `
                <span class="sponsor">
                  ${player.team ? player.team : ""}
                </span>
                ${await Transcript(player.name)}
                <span class="pronoun">
                  ${player.pronoun ? player.pronoun : ""}
                </span>
                ${team.losers ? "<span class='losers'>L</span>" : ""}
              `
            );

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

            await CharacterDisplay(
              $(`.p${t + 1}.container .character_container`),
              {
                asset_key: "base_files/icon",
                source: `score.team.${t + 1}`,
              },
              event
            );

            SetInnerHtml(
              $(`.p${t + 1}.container .sponsor_icon`),
              player.sponsor_logo
                ? `<div style='background-image: url(../../${player.sponsor_logo})'></div>`
                : ""
            );

            /*
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
            */

            SetInnerHtml(
              $(`.p${t + 1} .pronoun`),
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
          }
        }
      }
    } else {
      for (const [t, team] of [
        data.score.team["1"],
        data.score.team["2"],
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
          ${team.losers ? "<span class='losers'>L</span>" : ""}
        `);
        carousel.add(`
          ${teamNamePlayers}
          ${team.losers ? "<span class='losers'>L</span>" : ""}
        `);
        carousel.selector = `.p${t + 1}.container .name`

        carousel.start(15000);

        /*
        SetInnerHtml($(`.p${t + 1} .flagcountry`), "");

        SetInnerHtml($(`.p${t + 1} .flagstate`), "");
        

        await CharacterDisplay(
          $(`.p${t + 1}.container .character_container`),
          {
            asset_key: "base_files/icon",
            source: `score.team.${t + 1}`,
            slice_character: [0, 1],
          },
          event
        );
        */

        /*
        SetInnerHtml($(`.p${t + 1}.container .sponsor_icon`), "");

        SetInnerHtml($(`.p${t + 1}.container .avatar`), "");

        SetInnerHtml($(`.p${t + 1}.container .online_avatar`), "");

        SetInnerHtml($(`.p${t + 1} .twitter`), "");
        

        SetInnerHtml($(`.p${t + 1}.container .sponsor-container`), "");
        */

        SetInnerHtml($(`.p${t + 1}.score`), String(team.score));
      }
    }

    SetInnerHtml($(".tournament_name"), data.tournamentInfo.tournamentName);

    SetInnerHtml($(".match"), data.score.match);

    let phaseTexts = [];
    if (data.score.phase) phaseTexts.push(data.score.phase);
    if (data.score.best_of_text) phaseTexts.push(data.score.best_of_text);

    SetInnerHtml($(".phase"), phaseTexts.join(" - "));
    SetInnerHtml($("#bestof"), "Best of " + data.score.best_of);
  };
});
