
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

    // YOUR CODE GOES HERE!
    var $street  = $('#street').val();
    var $city    = $('#city').val();
    var $address =  $street + " , " + $city;
    var $streetView = "<img class='bgimg' src='https://maps.googleapis.com/maps/api/streetview?size=600x400&location="
                       + $address + "'>"
    
    $($streetView).appendTo("body");
    
    $greeting.text("So you want to live at " + $address + "?"); 

    return false;
};
    
$('#form-container').submit(loadData);

// loadData();
