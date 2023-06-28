$(document).ready(function () {
    // var loadmore_count = 0;
    var wishlist_count = 0;
    $.ajax({
        url: "./data.json",
        success: function (result) {
            // console.log(result);
            // loaditems();
            function callitem(newdata) {
                let loadmore_count = 0;
                for (let i = loadmore_count; i < newdata.length; i++) {
                    const tileData = `
                    <div class="flexitem" id="${newdata[i]["id"]}">
                        <div class="product-img-container">
                            <div class="product-img">
                                <img class="phone-image" src="${newdata[i]['img-url']}">
                            </div>
                            <div class="product-item">
                                <button class="add-to-cart" type="button">ADD TO CART</button>
                                <button class="view-gallery" type="button">VIEW GALLERY</button>
                            </div>
                        </div>
                        <i class="wishlistsymbol far fa-heart"></i>
                        <div class="product-content">
                            <h5 class="name marginzero">${newdata[i]['name']}</h5>
                            <div class="rating marginzero">
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span><i class="fa-solid fa-star"></i></span>
                            <span class="last-star"><i class="fa-solid fa-star"></i></span>
                            ${'(' + newdata[i]['total_rating'] + ')'}</div>
                            <span class="price marginzero"><b>${newdata[i]['price']}</b><s>${newdata[i]['mrp']}</s>${newdata[i]['discount']}</span>
                        </div>
                    </div>
                    `
                    $(".flex-container").append(tileData);

                    //star rating
                    $("#" + (newdata[i]["id"])).find("span").each(function (index) {
                        if ((index) < newdata[i]["customer_ratings"]) {
                            $(this).find("i").css("color", "#FF3465");
                        }
                    });

                    //new&sale icon
                    if (newdata[i]["new"] == "yes") {
                        $("#" + (newdata[i]["id"])).append(`
                        <span class="new left-icon">NEW</span>
                        `);
                    }
                    if (newdata[i]["sale"] == "yes") {
                        $("#" + (newdata[i]["id"])).append(`
                        <span class="sale left-icon">SALE</span>
                        `);
                    }
                    if (newdata[i]["new"] == "no" && newdata[i]["sale"] == "yes") {
                        $("#" + (newdata[i]["id"])).find(".sale").css("top", "15px");
                    }

                    //wishlist-icon
                    if (!localStorage.getItem("wl_array")) {
                        localStorage.setItem("wl_array", JSON.stringify([]));
                    }
                    if (JSON.parse(localStorage.getItem("wl_array")).includes(newdata[i]["name"])) {
                        $("#" + (newdata[i]["id"])).find(".wishlistsymbol").addClass("fas");
                        $("#" + (newdata[i]["id"])).find(".wishlistsymbol").css("color", "#FF3465");
                    }
                    $(".wishlist-badge").text(JSON.parse(localStorage.getItem("wl_array")).length);
                    $("#" + (newdata[i]["id"])).find(".wishlistsymbol").click(function () {
                        const wishlist_arr = JSON.parse(localStorage.getItem("wl_array"));          //Retrive array from memory
                        if (wishlist_arr.includes(newdata[i]["name"])) {
                            wishlist_arr.splice(wishlist_arr.indexOf(newdata[i]["name"]), 1);       //Update array
                            $(this).removeClass("fas");
                            $(this).addClass("far");
                            $(this).css("color", "#B7BDC1");
                        }
                        else {
                            wishlist_arr.push(newdata[i]["name"]);
                            $(this).removeClass("far");
                            $(this).addClass("fas");
                            $(this).css("color", "#FF3465");
                        }
                        $(".wishlist-badge").text(wishlist_arr.length);
                        localStorage.setItem("wl_array", JSON.stringify(wishlist_arr));            //Put back array into memory
                        console.log(localStorage.getItem("wl_array"));
                    });

                    //addtocart
                    if (!localStorage.getItem("addcart_array")) {
                        localStorage.setItem("addcart_array", JSON.stringify([]));
                    }
                    if (JSON.parse(localStorage.getItem("addcart_array")).includes(newdata[i]["name"])) {
                        $("#" + (newdata[i]["id"])).find(".add-to-cart").text("REMOVE FROM CART");
                    }
                    else {
                        $("#" + (newdata[i]["id"])).find(".add-to-cart").text("ADD TO CART");
                    }
                    $(".addtocart-badge").text(JSON.parse(localStorage.getItem("addcart_array")).length);
                    $("#" + (newdata[i]["id"])).find(".add-to-cart").click(function () {
                        const cart_arr = JSON.parse(localStorage.getItem("addcart_array"));
                        if (cart_arr.includes(newdata[i]["name"])) {
                            cart_arr.splice(cart_arr.indexOf(newdata[i]["name"]), 1);
                            $(this).text("ADD TO CART");
                        }
                        else {
                            cart_arr.push(newdata[i]["name"]);
                            $(this).text("REMOVE FROM CART");
                        }
                        $(".addtocart-badge").text(cart_arr.length);
                        localStorage.setItem("addcart_array", JSON.stringify(cart_arr));
                        // console.log(newdata[i]["name"]);
                    })

                }
                $(".flexitems-count").text("Showing 1 - " + newdata.length + " of " + newdata.length + " results for Phones");
                $(".mb-flexitems-count").text(newdata.length + " Results");


                //sortby-rating
                $(".sortbyrating").click(function () {
                    let json_data1 = JSON.parse(JSON.stringify(newdata));
                    json_data1.sort((a, b) => {
                        return b["customer_ratings"] - a["customer_ratings"];
                    });
                    $(".flexitem").remove();
                    callitem(json_data1);
                });
                //sortby-lowtohigh
                $(".sortbyprice").click(function () {
                    let json_data = JSON.parse(JSON.stringify(newdata));
                    json_data.sort((a, b) => {
                        return Number(a["price"].slice(1, a["price"].length)) - Number(b["price"].slice(1, b["price"].length));
                    });

                    $(".flexitem").remove();
                    callitem(json_data);
                });
                //sortby-newestfirst
                $(".sortbynew").click(function () {
                    let json_data = JSON.parse(JSON.stringify(newdata));
                    let newfirst = [];
                    let j = 0
                    for (let i = 0; i < json_data.length; i++) {
                        if (json_data[i]["new"] == "yes") {
                            newfirst.splice(j, 0, json_data[i]);
                            j = j + 1;
                        }
                        else {
                            newfirst.push(json_data[i]);
                        }
                    }
                    $(".flexitem").remove();
                    callitem(newfirst);
                });
            }

            callitem(result);

            $(".mb-sortby").click(function () {
                $(".popup1").toggle();
                if ($(".popup2").css("display", "block")) {
                    $(".popup2").toggle();
                }
            });
            $(".mb-filter").click(function () {
                $(".popup2").toggle();
                if ($(".popup1").css("display", "block")) {
                    $(".popup1").toggle();
                }
            });
            $(".popup2").click(function () {
                $(this).toggle();
            });

            //clearall
            $(".clearall").click(function () {
                $('input[type=checkbox]').each(function () {
                    if ($(this).is(':checked')) {
                        $(this).trigger('click');
                    }
                })
                $(".sliderrange-min").val($(this).attr("min"));
                $(".sliderrange-max").val($(this).attr("max"));
            });

            //filter dropdown
            $(".filter-items").each(function (index) {
                $(this).find(".filters-dropdown").click(function () {
                    $("#filter-dd" + (index)).toggle("slow");
                    if ($(this).hasClass("fa-angle-down")) {
                        $(this).removeClass("fa-angle-down");
                        $(this).addClass("fa-angle-up");
                    }
                    else {
                        $(this).removeClass("fa-angle-up");
                        $(this).addClass("fa-angle-down");
                    }
                });
            });

            //brand-filter
            var checklist_arr = [];
            $('input[type=checkbox]').each(function () {
                //adding click function on every checkbox
                $(this).click(function () {
                    if (checklist_arr.includes($(this).val())) {
                        checklist_arr.splice(checklist_arr.indexOf($(this).val()), 1);
                    }
                    else {
                        checklist_arr.push($(this).val());
                    }
                    console.log(checklist_arr);

                    let json_data = JSON.parse(JSON.stringify(result));  //all products json data
                    let newfirst = [];
                    for (let i = 0; i < json_data.length; i++) {
                        //add required brand products from json data to newfirst array
                        if (checklist_arr.includes(json_data[i]["brand"])) {
                            newfirst.push(json_data[i]);
                        }
                    }
                    $(".flexitem").remove();
                    if (checklist_arr.length == 0) {
                        callitem(result);
                    }
                    else {
                        callitem(newfirst);
                    }
                });
            });

            //scrolltotop
            $('.scrolltop').on("click", function () {
                $(window).scrollTop(0);
            });

            //search bar
            function displaySearchResult() {
                if ($(".product-search").val() === "") {
                    callitem(result);
                }
                else {
                    let searchItem = $(".product-search").val();
                    let jsonData = JSON.parse(JSON.stringify(result));
                    let searchData = [];
                    let j = 0;
                    for (let i = 0; i < jsonData.length; i++) {
                        if (jsonData[i]["brand"] == searchItem) {
                            searchData.push(jsonData[i]);
                        }
                    }
                    $(".flexitem").remove();
                    callitem(searchData);
                }
            }

            $(".product-search").keypress(function (event) {   //for search by enter key
                if (event.keyCode == '13') {
                    displaySearchResult();
                }
            });
            $(".search-icon").click(displaySearchResult);      //for search by clicking search icon

            //price slider
            function sliderPrice() {
                let filterData = [];
                var priceMin = $(".sliderrange-min").val();
                var priceMax = $(".sliderrange-max").val();
                let productArray = JSON.parse(JSON.stringify(result));
                for (let index = 0; index < productArray.length; index++) {
                    var productPrice = productArray[index]["price"].slice(1, productArray[index]["price"].length);
                    if ((Number(priceMin) < Number(productPrice)) && (Number(priceMax) > Number(productPrice))) {
                        filterData.push(productArray[index]);
                    }
                }
                $(".min-value").val(priceMin);
                $(".max-value").val(priceMax);
                $(".flexitem").remove();
                callitem(filterData);
            }
            $(".sliderrange-min , .sliderrange-max").change(function () {
                sliderPrice();
            });

        }
    })
});






