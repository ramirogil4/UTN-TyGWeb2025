const getSeries = async () => {
    try {
        const response = await fetch(`${STRAPI_URL}/api/grupo-5-series?populate=*`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}
const visualizar = async () => {
    const container = document.querySelector('.content');
    container.innerHTML = '';
    const series = await getSeries();
    console.log(series.data);
    if (!series || series.data.length === 0) {
        const noSeries = document.createElement('p');
        noSeries.textContent = 'No hay series disponibles.';
        container.appendChild(noSeries);
        return;
    }
    visualizarLista(series, container);
    container.appendChild(document.createElement('hr'));
    visualizarAnalytics(series, container);
}

const visualizarLista = (series, container) => {
    const lista = document.createElement('div');
    container.appendChild(lista);
    lista.className = 'series-lista';
    series.data.forEach(async (serie) => {
        const card = document.createElement('div');
        const generos = serie.grupo_5_generos.map(genero => {          
            return `<span class="badge bg-secondary mr-2">${genero.nombre}</span>`;
        }).join('');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${serie.titulo}</h5>
                <p class="card-text">${serie.sinopsis}</p>
                <p class="card-text"><small class="text-muted">País de origen: ${serie.paisOrigen}</small></p>
                <p class="card-text"><small class="text-muted">Popularidad: ${serie.popularidad}</small></p>
                <p class="card-text mb-0"><small class="text-muted">Géneros: </small></p>
                <div class="generos">
                    ${generos}
                </div>
            </div>  
        `;
        lista.appendChild(card);
    });
}

const visualizarAnalytics = (series, container) => {
    //hacer
}