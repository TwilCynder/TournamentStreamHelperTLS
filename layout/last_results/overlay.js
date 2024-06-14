const query = `         
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

    //add_set("SnooSnoo", 2, "Nacy's Bitch", 1, 4);
              
    function load_sets(config){
        console.log(config)
        console.log("Load sets");
        fetch('https://api.start.gg/gql/alpha', {         
            method: 'POST',         
            headers: {             
                'Content-Type': 'application/json',             
                'accept' : 'application/json',             
                'Authorization' : `Bearer ${config.token}`         
            },         
            body: JSON.stringify({
                'query': query,
                'variables' : {
                    "slug": config.event,
                    "setNum": config.sets + 1
                } 
            }),  
            
        })     
        .then((response) => response.json())     
        .then((data) => {  
            $('#sets').empty();   
            if (!data.data || !data.data.event){
                throw data;
            }
            for (let i = 1; i < data.data.event.sets.nodes.length; i++){
                let set = data.data.event.sets.nodes[i];
                let p1 = set.slots[0].entrant.name;
                let p1score = set.slots[0].standing.stats.score.value;
                let p2 = set.slots[1].entrant.name;
                let p2score = set.slots[1].standing.stats.score.value;
                add_set(p1, p1score, p2, p2score, i);
            }
        })
        .catch(err => {console.error(err)});
    }

/**
 * Removes the adress from the URL, keeping only the event slug
 * @param {string} url 
 * @returns 
 */
function stripURL(url){
    return url.split("start.gg/")[1];
}

Promise.all([
    fetch("./config.json"),
    fetch('../../user_data/settings.json'),
])
    .then( results => Promise.all(results.map(
        response => response.json()
    )))
    
    .then(([config, tsh_settings]) => {
        if (tsh_settings && tsh_settings.TOURNAMENT_URL){
            config.event = config.event ?? tsh_settings.TOURNAMENT_URL;
        }

        if (!config.event) return;
        if (config.event.includes("start.gg")) config.event = stripURL(config.event);

        load_sets(config);
        setTimeout(() => {
            load_sets(config);
        }, 15000);
    });

    //$("#R1").html(res);
})