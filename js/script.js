
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    
    // load streetview
    var street  = $('#street').val();
    var city    = $('#city').val();
    var address =  street + ", " + city;
    var $streetView = "<img class='bgimg' src='https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address + "'>"
    $($streetView).appendTo("body");

    // change titles to match query
    $greeting.text("So you want to live at " + address + "?"); 
    $nytHeaderElem.text("New York Times Articles at " + address);


    var nytUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
    var apiKey = "a23984d3ba0e636a13d3179baebd543f:2:72307059";
    address    = street + ' ' + city;
    address    = (address).split(' ').join('+');
    console.log(address);
    var url    = nytUrl + address + "&api-key=" + apiKey;

    //New York Times article ajax
    $.getJSON(url, function(data){
        console.log(data);
        $.each(data.response.docs, function(index, element){
            console.log(element.snippet);
            $("#nytimes-articles").append("<li class='article'>" +
                "<a href='"+element.web_url+"'>" + element.headline.main + "</a>" +
                "<p>" + element.snippet + "</p>" + "</li>");
        });
    }).error(function(){
        $nytHeaderElem.text("Sorry :(");
    });



    address = (address).split('+').join('|');
 
    //Wikipedia ajax call
    $.ajax({
        url:'https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&format=json&titles=' + address,
        type: 'GET',
        data: {format: 'json'},
        dataType: 'jsonp',
        headers: {'Api-User-Agent': 'UdacitAjaxProject/1.0'}
        }).done(function(data){
            console.log(data);
            $.each(data.query.pages, function(index, element){
                console.log(element);
                $('#wikipedia-links').append("<li> <a href='" + element.fullurl + "'>" + element.title + "</a> </li>");
            });   
    });

    return false;
};
    
$('#form-container').submit(loadData);

// loadData();
