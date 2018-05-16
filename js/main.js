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
            title: response.results[i].title,
            id: response.results[i].title,
            url: response.results[i].url,
            release: response.results[i].release_date
          })
           film.sort(function(a,b){
            var dateA = new Date(a.release);
            var dateB = new Date(b.release);
            return dateA - dateB;
          });
          }
          console.log(film);
          var dropdownHtml = [];
          $.each(film, function(i){
            var newDropdown = "<a href='#' style='text-decoration:none'><li id="+film[i].id+">"+film[i].title+"</li></a>"
            dropdownHtml += newDropdown;
          })

          $(".dropdown-menu").html(dropdownHtml);

          var filmData;
          $("li").click(function () {
              var id = $(this).text();

              console.log($(this).text());
              for(var i = 0; i < film.length; i++){
                if(id === film[i].title){
                  console.log(film[i].title)
                  // filmData = JSON.stringify(film[i].url)
                  filmData = $.getJSON(film[i].url.toString())
                }
              }
              var filmRequest;
              var filmSelected = [];
              filmData.done(function(data) {

                for(var i=0; i < data.characters.length; i++){
                  filmRequest = $.getJSON(data.characters[i].toString(), function(character){
                    filmSelected.push({name: character.name, starships: character.starships})
                  })
                }
                console.log(filmSelected);

                var shipsFetched;
                var starships = [];
                filmRequest.done(function() {
                    filmSelected.forEach(function(char){
                      for(var j = 0; j < char.starships.length; j++){
                        shipsFetched = $.getJSON(char.starships[j], function(data){
                          starships.push({name: data.name, url: data.url})
                        })
                      }
                    })
                    console.log("**********************************************");
                    console.log(starships);
                    var tablerow;
                    shipsFetched.done(function() {
                      filmSelected.forEach(function(char){
                       for (var i = 0; i < char.starships.length; i++){
                          starships.forEach(function(ship){
                            if(ship.url === char.starships[i]){
                              char.starships[i] = " " + ship.name
                            }
                          })
                        }
                      })
                      $.each(filmSelected, function(val){
                        tablerow += "<tr>"
                        tablerow += "<td id='charName'>"+ filmSelected[val].name + "<span class='glyphicon glyphicon-remove' onclick='deleteRow(this)'></span></td>";
                        tablerow += "<td id='starships'>" + filmSelected[val].starships + "</td>";
                        // tablerow += "<td id='btn' class='btn-default btn-danger' value='Delete' style='width:100px;' onclick='deleteRow(this)'>" + "Delete" + "</td>";
                        tablerow += "</tr>"
                      })
                      return $("tbody").html(tablerow);
                    })
                })
            })
        })
      },
      error: function() {
        alert('Something went wrong');
      }
    });
  });
});

function deleteRow(btn){
  $(btn).closest("tr").remove();
}
