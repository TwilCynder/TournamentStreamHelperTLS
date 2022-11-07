(($) => {
    gsap.config({ nullTargetWarn: false, trialWarn: false });

    
    var data = {};
    var oldData = {};

    async function Update() {
        oldData = data;
        data = await getData();

        let casters = Object.values(data.commentary);

        if (
            Object.keys(oldData).length == 0 ||
              Object.keys(oldData.commentary).length !=
              Object.keys(data.commentary).length 
        ) {
            let html = "";

            casters.forEach((commentator, index) => {
                html += `
                <span class = "caster_name" id = "caster_name_${index}"></span>
                `;
            });
            $("#caster_names_container").html(html);
        }

        casters.forEach((commentator, index) => {
            SetInnerHtml($(`caster_name_${index}`), 
                "Mabite"
            )
        });
        
        $("#caster_names_container").html(html);

    }

    Update();
    $(window).on("load", () => {
        $("body").fadeTo(1, 1, async () => {
        Start();
        setInterval(Update, 500);
        });
    });
})(jQuery)