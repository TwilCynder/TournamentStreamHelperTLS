$(() => {
    let setsContainer = $("#sets");

    function add_set(player1, score1, player2, score2, id){
        let res = `
            <div class="result" id="R${id}">
            <div class="winner">
                <div class="score">
                    ${score1}
                </div>
                <div class="name">
                    ${player1}
                </div>
            </div>
            <div class="loser">
                <div class="name">
                    ${player2}
                </div>
                <div class="score">
                    ${score2}
                </div>
            </div>
            </div>
        `
        console.log(setsContainer);
        console.log(setsContainer.html)
        setsContainer.append(res);
    }

    add_set("SnooSnoo", 2, "Nacy's Bitch", 1, 4);

    let res = "";


        $("#R1").html('loading....');

        $.ajax({url: "https://cors-anywhere.herokuapp.com/https://api.start.gg/gql/alpha",
           contentType: "application/json",type:'POST',
           data: JSON.stringify({ query:`{
              sayHello(name:"${res}")}`
           }),
           success: function(result) {
              console.log(JSON.stringify(result));
              $("#R1").html(JSON.stringify(result));
           }
        });

    /*
    fetch('https://api.start.gg/gql/alpha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: "{ hello }"})
        })
        .then(r => r.json())
        .then(data => $("#R1").html(data))
        .catch(err => {$("#R1").html(err) ; console.error(err)});
        */
    //$("#R1").html(res);
})