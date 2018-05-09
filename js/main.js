// User code here

// HINT: start here: https://swapi.co/api/films/


$(document).ready(function() {
  $('#button').click(function() {
    $.ajax({
      url: 'https://swapi.co/api/films/',
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        var film = [];
        for (var i = 0; i < response.results.length; i++){
          film.push({
            title: response.results[i].title
          })

          var dropdownHtml = [];
          $.each(film, function(i){
            var newDropdown = "<li id='title'>"+ film[i].title + "</li>"
            dropdownHtml += newDropdown;
          })

          $(".dropdown-menu").html(dropdownHtml);
            }
          },
      error: function() {
        alert('Something went wrong');
      }
    });
  });
});
