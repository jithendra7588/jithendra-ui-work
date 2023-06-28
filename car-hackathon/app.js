$(document).ready(function () {
    $.ajax({
        url: "./data.json",
        success: function (result) {
            //Initially when the page is loaded display cars of one series
            // callTiles("Revuelto"); 
            callTiles(result[0]["series"]);
            //change to next car series;
            $(".fa-chevron-right").click(slideRight);
            //change to previous car series;
            $(".fa-chevron-left").click(slideLeft);

            function callTiles(series) {
                $(".item").remove();   //remove cars of previous series
                for (let i = 0; i < result.length - 1; i++) {
                    if (result[i]["series"] === series) {
                        const tileData = `
                        <div id="${result[i]["series"]}${result[i]["model"]}" class="item">
                        <img src="${result[i]["img-path"]}">
                        <div class="product-info">
                            <h4 class="series marginzero">${result[i]["series"]}</h4>
                            <span class="model">${result[i]["model"]}</span><br><br>
                            <span class="power">Power <i class="fas fa-bolt"></i>${result[i]["features"][0]}</span><br>
                            <span class="max-speed">Max. Speed <i class="fas fa-tachometer-fast"></i>${result[i]["features"][1]}</span><br>
                            <span class="speedup">0-100 km/h <i class="fas fa-clock"></i>${result[i]["features"][2]}</span><br>
                            <span class="price"><b >From ${result[i]["baseprice"]}</b></span>
                        </div>
                        <a id="${result[i]["series"]}${result[i]["model"]}" class="customize-btn" href="./customize.html?car=${result[i]["model"]}" target="_blank">Built & Buy</a>
                        </div>
                        `;
                        $(".container").append(tileData);   //display each car of the selected series
                    }
                }
            }

            function slideRight() {
                var imageStack = $(".series-image").children();
                imageStack.each(function (index) {
                    if ($(this).hasClass("display-block")) {
                        $(this).removeClass("display-block");
                        $(this).addClass("display-none");
                        if (index === 0) {
                            $(".huracan-model").removeClass("display-none");
                            $(".huracan-model").addClass("display-block");
                            changeInfo(result[result.length - 1]["series-logo"][index + 1], result[result.length - 1]["info"][index + 1]);
                            callTiles("Huracan");
                            return false;
                        }
                        if (index === 1) {
                            $(".urus-model").removeClass("display-none");
                            $(".urus-model").addClass("display-block");
                            changeInfo(result[result.length - 1]["series-logo"][index + 1], result[result.length - 1]["info"][index + 1]);
                            callTiles("Urus");
                            return false;
                        }
                        if (index === (imageStack.length - 1)) {
                            $(".revuelto-model").removeClass("display-none");
                            $(".revuelto-model").addClass("display-block");
                            changeInfo(result[result.length - 1]["series-logo"][0], result[result.length - 1]["info"][0]);
                            callTiles("Revuelto");
                            return false;
                        }
                    }
                })
            }

            function slideLeft() {
                var imageStack = $(".series-image").children();
                imageStack.each(function (index) {
                    if ($(this).hasClass("display-block")) {
                        $(this).removeClass("display-block");
                        $(this).addClass("display-none");
                        if (index === 0) {
                            $(".urus-model").removeClass("display-none");
                            $(".urus-model").addClass("display-block");
                            changeInfo(result[result.length - 1]["series-logo"][2], result[result.length - 1]["info"][2]);
                            callTiles("Urus");
                            return false;
                        }
                        if (index === 1) {
                            $(".revuelto-model").removeClass("display-none");
                            $(".revuelto-model").addClass("display-block");
                            changeInfo(result[result.length - 1]["series-logo"][0], result[result.length - 1]["info"][0]);
                            callTiles("Revuelto");
                            return false;
                        }
                        if (index === (imageStack.length - 1)) {
                            $(".huracan-model").removeClass("display-none");
                            $(".huracan-model").addClass("display-block");
                            changeInfo(result[result.length - 1]["series-logo"][index - 1], result[result.length - 1]["info"][index - 1]);
                            callTiles("Huracan");
                            return false;
                        }
                    }
                })
            }

            function changeInfo(infoOne, infoTwo) {
                //update car series logo and its info based on series chosen
                $(".series-logo").attr("src", infoOne);
                $(".info").text(infoTwo);
            }



        }
    })
})