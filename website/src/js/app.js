

function build_Menu_item(item) {
  var button = '';
  button+='<div onclick="find_' + item + '()" class="buttons" id="' + item + '">';
  button+='<img src="./images/' + item + '.png" />';
  button+='<p>' + item + '</p>';
  button+='</div>';

  $('#main').append(button);



}



function create_Menu() {
    $('#remove, div.icons').remove();
    var data = ['Food', 'Lodging'];
    for (datas in data) {
      var element = data[datas];
      build_Menu_item(element);

    }

}







// Driver
$( document ).ready(function() {
  // Create initial Menu
  create_Menu();

  setGPS();


  // fade in
  $('div.buttons').hide();
  $('div.buttons').fadeIn("slow");



});
