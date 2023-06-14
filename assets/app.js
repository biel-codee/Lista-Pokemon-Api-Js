const btnChangeTheme = document.getElementById("btn-change-theme");
const body = document.querySelector("body");
const imgBtnChangeTheme = document.querySelector(".img-btn")

btnChangeTheme.addEventListener("click", () => {
    const darkModeIsActive = body.classList.contains("dark-mode");
    body.classList.toggle("dark-mode");

    if (darkModeIsActive) {
        imgBtnChangeTheme.setAttribute("src", "./assets/img/sun.png")

    } else {
        imgBtnChangeTheme.setAttribute("src", "./assets/img/moon.png")
    }
});


const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 150
const colors = {

    fire: '#f76363',
    grass: '#b9edb7',
    electric: '#eed535',
    water: '#9ed7e8',
    ground: '#ab9842',
    rock: '#d5d5d4',
    fairy: '#fdb9e9',
    poison: '#956f9e',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#f366b9',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#a4acaf'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i)
    }
}

const getPokemons = async (id) => {
    const ulr = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(ulr)
    const data = await resp.json()
    createPokemonCard(data)
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color

    const pokemonInnerHTML = `
        <div class="imgContainer">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
        </div>
    `

    card.innerHTML = pokemonInnerHTML

    pokeContainer.appendChild(card)
}

fetchPokemons()

function performSearch(event) {
    event.preventDefault();
  
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const pokemons = document.querySelectorAll('.pokemon');
  
    pokemons.forEach(pokemon => {
      const name = pokemon.querySelector('.name').textContent.toLowerCase();
      const number = pokemon.querySelector('.number').textContent.toLowerCase();
  
      if (name.includes(searchTerm) || number.includes(searchTerm)) {
        pokemon.style.display = 'block';
      } 
      else {
        pokemon.style.display = 'none';
      }
    });
  
    event.target.reset(); 
  }
  
  
