// Variáveis Globais
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonName = document.querySelector('.pokemon_name');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonShiny = document.querySelector('.btn-shiny');

let searchPokemon = 1;
let searchShiny = false;

// Busca os dados do pokemon na API e retorna um JSON
const fetchPokemon = async (pokemon) => {

    // Passa o valor do input
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


    if (APIResponse.status === 200) {
        const data = await APIResponse.json();

        return data;
    }
}

// Renderiza o resultado encontrado na tela
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    pokemonImage.src = './images/loading.gif';

    const data = await fetchPokemon(pokemon);

    // Verifica se o valor digitado é valido
    if (data) {

        searchPokemon = data.id;

        // a API só tem animações até o nº 649
        if (searchPokemon < 650) {

            // Verifica se a busca será pelo Shiny
            if (searchShiny) {
                pokemonNumber.innerHTML = data.id;
                pokemonName.innerHTML = data.name;
                pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];

                // Limpa o campo de pesquisa
                input.value = '';
            } else {
                pokemonNumber.innerHTML = data.id;
                pokemonName.innerHTML = data.name;
                pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

                // Limpa o campo de pesquisa
                input.value = '';
            }
        } else {

            // Verifica se a busca será pelo Shiny
            if (searchShiny) {
                pokemonNumber.innerHTML = data.id;
                pokemonName.innerHTML = data.name;
                pokemonImage.src = data['sprites']['front_shiny'];

                // Limpa o campo de pesquisa
                input.value = '';
            } else {
                pokemonNumber.innerHTML = data.id;
                pokemonName.innerHTML = data.name;
                pokemonImage.src = data['sprites']['front_default'];

                // Limpa o campo de pesquisa
                input.value = '';
            }
        }
    } else {
        pokemonNumber.innerHTML = '';
        pokemonName.innerHTML = 'Pokémon Not Found :(';
        pokemonImage.src = './images/notFound.png';

        // Limpa o campo de pesquisa
        input.value = '';
    }
}

// Envia o input para buscar na API
form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});


buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon++;
    renderPokemon(searchPokemon);
});

// Alterna o estado para Shiny ou não
buttonShiny.addEventListener('click', () => {
    if (searchShiny) {

        buttonShiny.style.background = '#222';
        buttonShiny.style.color = '#f8fdb6';

        searchShiny = false;
        renderPokemon(searchPokemon);

    } else {

        buttonShiny.style.background = 'goldenrod';
        buttonShiny.style.color = 'white';

        searchShiny = true;
        renderPokemon(searchPokemon);
    }
});

// Mostra o Pokemon 1 ao iniciar
renderPokemon(searchPokemon);