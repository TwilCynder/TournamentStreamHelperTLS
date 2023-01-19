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
        /*
        $("#R1").html('loading....');

        $.ajax({url: "https://localhost:3000/",
           contentType: "application/json",type:'POST',
           data: JSON.stringify({ query:`{
              sayHello(name:"${res}")}`
           }),
           success: function(result) {
              console.log(JSON.stringify(result));
              $("#R1").html(JSON.stringify(result));
           }
        });
        */
    
    const schema = `
    query Query($slug: String, $setNum: Int) {
        event(slug: $slug){
          sets(page: 1, perPage: $setNum, sortType:RECENT, filters:{
            state: 3
          }){
            nodes{
              slots {
                   standing{
                         stats{
                              score{
                                  value
                               }
                         }
                    }
                    entrant {
                         id
                         name
                    }            
              }
            }
          }
        }
      }
    `
      
    fetch('https://api.start.gg/gql/alpha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'Bearer d0206138a8ea04cf8e34f80ecc177663'
        },
        body: JSON.stringify({
            query: schema,
            variables: {
                "slug": "tournament/stock-o-clock-23/event/1v1-ultimate",
                "setNum": 5
            },
        }), 
        mode: 'no-cors',
    })
        
        
    //$("#R1").html(res);
})