
var distance = 500;

function set_Distance() {

  $('#radius').html(distance + 'm');


}

function build_Menu_item_2(item, image) {
  var button = '';
  button+='<div class="icons" id="' + item + '">';
  button+='<div class="img">';
  button+='<img class="img-inner" src="' + image + '" />';
  button+='</div>';
  button+='<p>' + item + '</p>';
  button+='</div>';

  $('#main').append(button);



}


function append_null() {
  button = '<div class="icons" id="none"><img src="./images/no_results.png" /><p>No results found can be found.</p></div>';
  $('#main').append(button);


}


function build_backbutton(interval , type) {
  newInterval = interval - 1;
  type = "'" + type + "'";

  var button = '<div class="icons" onclick="get_info_from_Google(' + type + ',' + newInterval + ')" id="remove"><img src="./images/return.png" /><p>Back</p></div>';
  $('#main').append(button);



}


function get_info_from_Google(type, interval) {


var lat = $("#lat").val();
var lng = $("#lng").val();
var apikey = 'AIzaSyA8jR3ZDuUecSVblC-7k1GMo8z1t1aVg78';
var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=" + distance + "&type=" + type + "&key=" + apikey;
var start = interval * 8;
var end = (interval + 1) * 8;
$('div.icons').remove();


$.ajax({
    url: url,
    type: 'POST',
    success: function (results) {
      if (interval == 0) {
        add_return();
      } else {
      build_backbutton(interval,type);

      }

        results = results.results;
        if (results.length == 0) {
          append_null();

        } else {
          var photo_url = "";
        for (result in results) {
          if (result >= start && result < end) {
          var image = results[result].photos;
          if (image == null) {
            photo_url  = results[result].icon;
          } else {
          image = image[0].photo_reference;
          photo_url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=' + image + '&key=' + apikey;
          }
          var name = results[result].name;
          if (name.length > 25) {
            name = name.substring(0,25) + "...";
          }

          build_Menu_item_2(name,photo_url);
         }
        }

        if (end < results.length) {
          type = "'" + type + "'";
          var button = '<div class="icons" onclick="get_info_from_Google(' + type + ',' + (interval + 1) + ')" id="remove"><img src="./images/next.png" /><p>More Results</p></div>';
          $('#main').append(button);
        }

      }
    },
    error: function(e) {
        alert('Error: '+e);
    }
});





}






// Sets coordinates
function setGPS() {


gm.info.getCurrentPosition(processPosition,true);
gm.info.watchPosition(processPosition, true)

function processPosition(position){
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;

  $("#lat").val(lat);
  $("#lng").val(lng);

}


}


function find_Food() {

    setGPS();
    $('div.buttons').remove();
    $('#sub_menu').hide();

    add_return();

    get_info_from_Google("restaurant", 0);




}

function find_Lodging() {
  setGPS();
  $('div.buttons').remove();
  $('#sub_menu').hide();
  add_return();

  get_info_from_Google("lodging", 0);



}

function find_Gas() {
  setGPS();
  $('div.buttons').remove();
  $('#sub_menu').hide();
  add_return();

  get_info_from_Google("gas_station", 0);



}


function find_Money() {
    setGPS();
    $('div.buttons').remove();
    $('#sub_menu').hide();
    add_return();

    get_info_from_Google("bank", 0);




}

function add_return() {

  var button ='<div class="icons" id="remove" onclick="create_Menu()"><img src="./images/return.png"/><p>Return</p></div>';
  $('#main').append(button);



}
