$(document).ready(function() {
var urls = [], streams = ["OgamingSC2", "esl_sc2", "storbeck", "freecodecamp", "cretetion", "habathcx", "kiichichaosreigns"], markupArr = [], online = [], offline = [];


streams.forEach(getInfo);


//retrieves API info for each stream and displays on the page
function getInfo(username) {
        //get channel information
                $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + username + "/?callback=?", function(data) {
        console.log(data);
        //display error message if channel does not exist
                if (data.status == 404 || data.status == null) {
            markupArr.push("<div class='panel' style='background: yellow'><div class='logo'><img src='http://i1378.photobucket.com/albums/ah103/humanforklift/Twitch%20viewer/jean-victor-balin-unknown-blue_zpsrokednch.jpg' alt=" + username + "></div><div class='name' id='name'>" + username + "</div><div class='status error' id='status'>This channel is not working currently. <br />Click or change tabs to remove.</div></div>");
        //display channel information
                } else {
                        markupArr.push("<div class='panel'><div class='logo'><img src=" + data.logo + " alt=" + data.display_name + "></div><div class='name' id='name'>" + data.display_name + "</div><div class='status' id=" + username + "></div></div>");
        }
        $(".channels").html(markupArr);
                //check if channel is streaming
                $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + username + "/?callback=?", function(data) {
                        console.log(data);
                        //channel is online
                        if (data.stream) {
                                $("#" + username).addClass("online").html("Streaming - " + data.stream.channel.status + ".").addClass("stream-name");
                                /*$(".panel").each(function(i, obj) {
                                        if ($(this).children().hasClass("online")) {
                                                online.push(obj);
                                                online.push(username);
                                        } else {
                                                offline.push(obj);
                                        }
                                });*/
                        //channel is offline
                        } else {
                                $("#" + username).addClass("offline").html("This channel is taking a break.");
                        }
                        //check if channel is online or offline to filter
                        $(".panel").each(function(i, obj) {
                                if ($(this).children().hasClass("online")) {
                                        online.push(obj);
                                } else if ($(this).children().hasClass("offline")) {
                                        offline.push(obj);
                                }
                        });
                });
        });
}

function search() {
    var name = $(this).val();
    console.log(name);
/*$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/search/channels?query=' + name,
 headers: {
   'Client-ID': 'axjhfp777tflhy0yjb5sftsil'
 },
 success: function(data) {
   console.log(data);
 }
});*/
}
//$(".search").on("keyup", search);

/*function callApi(arr) {
        var i = 0;
        while (i < arr.length) {
                //panel = "<div class='panel'><div class='logo' id='logo'></div><div class='name' id='name'></div><div class='status' id='status'></div></div>";
                //$(".channels").append(panel);
                $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/ " + arr[i] + "?callback=?", function(data) {
                        console.log(data);
                        //$(".channels").html("<div class='panel'><div class='logo'><img src=" + data.logo + " alt=" + data.display_name + "></div><div class='name'>" + data.display_name + "</div><div class='status'>" + data.status + "</div></div>");
                        /*$(".panel").eq(i).find(".name").html(data.display_name);
                        $(".panel").eq(i).find(".status").html(data.status);*/
                        //$(".panel").eq(i)(function() {
                                /*$(logos[i]).html("<img src=" + data.logo + " alt=" + data.display_name + ">");
                                $(names[i]).html(data.display_name);
                                $(statuses[i]).html(data.status);
                                //myArr[i].append(logo);
                        //});
                });
                i++;
        }
}*/


//TO DO: Make tabs different colours, and change background of panel to align with tab colour
//Suggest other channels user may like based on channels already subscribed to - use channels to find similar
/*$.getJSON("https://wind-bow.gomix.me/twitch-api/channels/freecodecamp?callback= ?", function(data) {
console.log(data);
$("#test").html("<img src=" + data.logo + " alt=" + data.display_name + ">");
$("#testes").html(data.display_name);
$("#testicles").html(data.status);
urls.push(data.url);
});


$.getJSON("https://wind-bow.gomix.me/twitch-api/channels/esl_sc2?callback= ?", function(data) {
        console.log(data);
        $("#test2").html("<img src=" + data.logo + " alt=" + data.display_name + ">");
        $("#testes2").html(data.display_name);
        $("#testicles2").html(data.status);
        urls.push(data.url);
});


$.getJSON("https://wind-bow.gomix.me/twitch-api/channels/brunofin?callback= ?", function(data) {
        console.log(data);
});


//Go to live stream on clicking channel's status
$(".status").on("click", function() {
        console.log($(this));
        //window.open("https://www.twitch.tv/" + thing, "_blank");
});*/


/*streams.forEach(function() {
        $(".channels").html("<div class='panel'><div class='logo'></div><div class='name'></div><div class='status'></div></div>");
});*/


//callApi(streams);

//change active tab
$("button").on("click", function() {
    $("button").removeClass("active");
    $(this).addClass("active");


    //change placeholder text depending on which tab is active
    $("#search").hasClass("active") ? ($("input").attr("placeholder", "Let's see what else is on..."), $(".channels").hide(), $(".stream-box").css("padding-bottom", "10px"), $(".search").on("keyup", search)) : ($("input").attr("placeholder", "Search for one of your channels."), $(".channels").show(), $(".stream-box").css("padding-bottom", "0px"));

    //hide search box if online or offline tabs are active
    $("#online").hasClass("active") || $("#offline").hasClass("active") ? $(".search-bar").css("visibility", "hidden") : $(".search-bar").css("visibility", "visible")
});

//sort online streams
$("#online").on("click", function() {
        $(".channels").html(online);
});

//sort offline streams
$("#offline").on("click", function() {
        $(".channels").html(offline);
});

//show all channels
$("#all").on("click", function() {
        //console.log(online);
        //console.log(offline);
        markupArr.forEach(function(item) {
                //console.log(item);
                //var box = $(item).find(".status").addClass("online");
                //console.log(box);
                //var name = $(item).children("#name").html(), cock = $("div");
                        //$(item).children("#name").addClass("online");
                        $(".channels").html(online);
                        $(".channels").append(offline);

        });
        //$(".channels").html(markupArr);
});

//add click events to panels
$(document).on("click", "div.panel", function() {
    var name = $(this).children(".name").html();
    if ($(this).children().hasClass("status error")) {
        $(this).remove();
    } else {
        window.open("https://www.twitch.tv/" + name, "_blank");
    }
});

//filter panels on page to match current search
/*var $panels = $('.channels .panel');
$("input").keyup(function() {
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
    console.log(val);
    console.log($panels);

    $(".channels").show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        console.log(text);
        while (val.length > 0) {
                return text.indexOf(val) >= 0;
        }
    }).hide();
});*/
$("input").keyup(filter);

function filter() {
        var names = $(".name"), val = $("input").val().toLowerCase(), username, page = $(".channels");
        console.log(val);
        for (var i = 0; i < names.length; i++) {
                username = names[i].innerHTML.toLowerCase();
                console.log(username);
                if (username.indexOf(val) != -1) {
                        $(".panel")[i].style.display = "";
                } else {
                        $(".panel")[i].style.display = "none";
                }
                //if (page.find(""))
        }
}

console.log(urls);

});