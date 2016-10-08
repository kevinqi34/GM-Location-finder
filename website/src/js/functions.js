

function build_Menu_item_2(item, image) {
  var button = '';
  button+='<div class="icons" id="' + item + '">';
  button+='<img src="' + image + '" />';
  button+='<p>' + item + '</p>';
  button+='</div>';

  $('#main').append(button);



}

function get_info_from_Google(type) {


var lat = $("#lat").val();
var lng = $("#lng").val();
var apikey = 'AIzaSyA8jR3ZDuUecSVblC-7k1GMo8z1t1aVg78';
var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=500&type=" + type + "&key=" + apikey;

$.ajax({
    url: url,
    type: 'POST',
    success: function (results) {
        results = results.results;
        for (result in results) {
          var image = results[result].icon;
          var name = results[result].name;
          if (name.length > 20) {
            name = name.substring(0,20);
          }
          build_Menu_item_2(name,image);


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
    add_return();

    get_info_from_Google("restaurant");







}

function find_Lodging() {
  setGPS();
  $('div.buttons').remove();
  add_return();
  
  get_info_from_Google("lodging");



}

function add_return() {

  var button ='<div class="buttons" id="remove" onclick="create_Menu()"><img src="./images/return.png"/><p>Return</p></div>';
  $('#main').append(button);


}
