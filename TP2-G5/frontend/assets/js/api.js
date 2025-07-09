function getNameGenres(data) { //Funcion para recorrer el array de generos y obtener el nombre por su id
  const mapa = {};
  data.genres.forEach(genre => {
    mapa[genre.id] = genre.name;
  });
  return mapa;
}

async function obtenerSeriesMasViejas() {
  const apiKey = 'bd3f41a01696d2f52966baa70389edee';

  const responseGenre = await fetch(`https://api.themoviedb.org/3/genre/tv/list?language=es-ES&api_key=${apiKey}`);
  const dataGenres = await responseGenre.json();
  const genreNames = getNameGenres(dataGenres);

  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=first_air_date.asc&language=es-ES&page=1`;
  const response = await fetch(url, {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDNmNDFhMDE2OTZkMmY1Mjk2NmJhYTcwMzg5ZWRlZSIsIm5iZiI6MTc1MTkyOTA5Ny42Nywic3ViIjoiNjg2YzUxMDk0YTRiNDRhMGRhYTk2MDQzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.b4haPkvAzuFAVVWbybfWqPU3AsOheHXXih6N5C0Y4BI'
    }
  });
  const data = await response.json();
  const series = data.results.slice(0, 10); //Obtengo los 10 primeros (más viejos)

    const seriesResults = series.map(serie => ({
        title: serie.name, //Nombre de la serie
        synopsis: serie.overview ? serie.overview : 'Sinopsis no disponible', //Si no hay sinopsis, devuelve 'Sinopsis no disponible'
        generos: serie.genre_ids.length > 0  //Chequea que el array de generos no este vacio
            ? serie.genre_ids.map(id => genreNames[id] || 'Desconocido') //Si el id del genero no esta en el mapa, devuelve 'Desconocido'
            : ['No especificado'], //Si el array de generos esta vacio, devuelve 'No especificado'
        popularidad: serie.popularity, //Popularidad de la serie
        pais_origen: serie.origin_country //Pais de origen de la serie
    }));
  console.log(seriesResults);

}
