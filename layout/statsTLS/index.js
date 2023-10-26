

(($) => {
    var init = false;

    function getData() {
        return $.ajax({
          dataType: "json",
          url: "../../Stats/stats/out.json",
          cache: false,
        });
    }
    
    var data = {};
    var oldData = {};

    async function Update() {
        oldData = data;
        data = await getData();

        if (!init){
            let html = "";
            Object.values(data.stats).forEach((stat, index) => {
                console.log(stat, index);
                html += `<div class = "stat_line" id = "stat${index}" style = "top: ${index * 13}%">
                    <div class = "yellow_bar"></div>
                    <div class = "stat_text" id = "statJ1" style = "text-align: left; left: 5%;">J1</div>
                    <div class = "stat_text" id = "statJ2" style = "text-align: right; width: 95%;">J2</div>
                    <div class = "stat_text" id = "statName" style = "text-align: center">Name</div>
                </div>
                `;
                console.log()
                $(".stats").html(html);
            });

            init = true;
        }

        Object.values(data.stats).forEach((stat, index) => {
                console.log($(`#stat${index}`))
            ;
            console.log()
        });

    }

    Update();
    $(window).on("load", () => {
        $("body").fadeTo(800, 1, async () => {
            setInterval(Update, 1000);
        });
    });
})(jQuery);