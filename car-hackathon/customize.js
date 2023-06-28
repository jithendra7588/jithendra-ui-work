$(document).ready(function () {
    $.ajax({
        url: "./cardata.json",
        success: function (featuresdata) {
            const urlParams = new URLSearchParams(window.location.search);
            const carName = urlParams.get('car');
            // let imgPath = "./img/"+carName+".jpg";
            // $('.img-container').attr('src',imgPath);

            var color = "";
            var wheel = "";
            var seatColor = "";
            for (let i = 0; i < featuresdata.length; i++) {
                if (featuresdata[i]["model"] === carName) {
                    color = featuresdata[i]["color"][0];
                    wheel = featuresdata[i]["wheels"][0];
                    $('.img-container').attr('src', './img/' + carName + color + wheel + '.jpg');
                    seatColor = featuresdata[i]["interior"][0];
                }
            }

            for (let i = 0; i < featuresdata.length; i++) {
                if (featuresdata[i]["model"] === carName) {
                    //render all exterior things into exterior section
                    populateExterior(i);
                    //render all interior things into interior section
                    populateInterior(i);
                }
            }
            function populateExterior(i) {
                $('.sectionone img').each(function (index) {
                    let img = './img/' + featuresdata[i]["color"][index] + '.png';
                    $(this).attr('src', img);
                    $(this).click(function () {
                        color = featuresdata[i]["color"][index];
                        $('.img-container').attr('src', './img/' + carName + color + wheel + '.jpg');
                        // console.log(carName+color+wheel);
                    });
                });
                $('.sectionone span').each(function (index) {
                    $(this).text(featuresdata[i]["color"][index])
                });
                $('.sectiontwo img').each(function (index) {
                    let img = './img/' + featuresdata[i]["wheels"][index] + '.png';
                    $(this).attr('src', img);
                    $(this).click(function () {
                        wheel = featuresdata[i]["wheels"][index];
                        $('.img-container').attr('src', './img/' + carName + color + wheel + '.jpg');
                        // console.log(carName+color+wheel);
                    });
                });
                $('.sectiontwo span').each(function (index) {
                    $(this).text(featuresdata[i]["wheels"][index]);
                });
            }
            function populateInterior(i) {
                $('.inner-container img').each(function (index) {
                    let img = './img/' + carName + " " + featuresdata[i]["interior"][index] + '.jpg';
                    $(this).attr('src', img);
                    $(this).click(function () {
                        seatColor = featuresdata[i]["interior"][index];
                        $('.img-container').attr('src', './img/' + carName + " " + seatColor + '.jpg');
                        // console.log('./img/'+carName+" "+seatColor+'.jpg');
                    });
                });
                $('.inner-container span').each(function (index) {
                    $(this).text(featuresdata[i]["interior"][index]);
                });
            }
            $(".exterior-head i").click(function () {
                $(".container-ext").addClass("display-none");
                $(".container-int").removeClass("display-none");
                $('.img-container').attr('src', './img/' + carName + " " + seatColor + '.jpg');
            });
            $(".interior-head .fa-chevron-left").click(function () {
                $(".container-int").addClass("display-none");
                $(".container-ext").removeClass("display-none");
                $('.img-container').attr('src', './img/' + carName + color + wheel + '.jpg');
            });
            $(".interior-head .fa-chevron-right").click(function () {
                $(".container-int").addClass("display-none");
                $(".fare-container").removeClass("display-none");
                $('.img-container').attr('src', './img/' + carName + color + wheel + '.jpg');
                calculatePrice();
            });
            $(".fare-head i").click(function () {
                $(".fare-container").addClass("display-none");
                $(".container-int").removeClass("display-none");
                $('.img-container').attr('src', './img/' + carName + " " + seatColor + '.jpg');
            });
            var pricesData;
            $.ajax({
                url: "./prices.json",
                success: function (prices) {
                    pricesData = prices;
                }
            });

            function calculatePrice() {
                let featureArray = [carName, color, wheel, seatColor];
                var total = 0;
                $(".addon-price").each(function (index) {
                    $(this).text("$" + pricesData[index][featureArray[index]]);
                    total = total + pricesData[index][featureArray[index]];
                })
                $(".total-price").text("$" + total);
            }
        }
    });
});