$(".search-button").on("click", function () {
  $.ajax({
    url:
      "http://www.omdbapi.com/?apikey=91d9df80&s=" + $(".input-keyword").val(),
    success: (results) => {
      // console.log(results);
      const movies = results.Search;
      // console.log(movies);
      let cards = "";
      movies.forEach((m) => {
        cards += showCards(m);
      });
      $(".movies-container").html(cards);

      // button detail
      $(".modal-detail-button").on("click", function () {
        //   console.log($(this).data(imdbid));
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=91d9df80&i=" +
            $(this).data("imdbid"),
          success: (m) => {
            const movieDetail = showDetails(m);
            $(".modal-body").html(movieDetail);
          },
          error: (err) => {
            console.log(err.responseText);
          },
        });
      });
    },
    error: (err) => {
      console.log(err.responseText);
    },
  });
});

function showCards(m) {
  return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" />
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#MovieDetailModal" data-imdbid="${m.imdbID}">Details</a>
                    </div>
                </div>
            </div>`;
}

function showDetails(m) {
  return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid" />
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4> ${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Director :</strong> ${m.Director}</li>
                            <li class="list-group-item"><strong>Actors :</strong> ${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer :</strong> ${m.Writer}</li>
                            <li class="list-group-item text-justify"><strong>Plot :</strong> ${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}