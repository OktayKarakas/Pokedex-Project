const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#d6b3ff',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
  ice: '#e0f5ff ',
  ghost: '#fff',
}
const pokemonContentEl = document.getElementById('container')
const allPokeBox = document.getElementsByClassName('poke-box')
const createBox = document.createElement('div')
const searchInputEl = document.getElementById('searchInput')

async function idCounter() {
  for (let i = 1; i <= 151; i++) {
    await getPokemon(i)
  }
}

const getPokemon = async (id) => {
  await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => {
      function createPokemonCard(data) {
        const img = data.sprites.other['official-artwork'].front_default
        const name =
          data.forms[0].name[0].toUpperCase() + data.forms[0].name.slice(1)
        const type = data.types[0].type.name
        const weight = data.weight
        const createBox = document.createElement('div')
        createBox.classList.add('poke-box')
        const color = colors[type]
        createBox.style.backgroundColor = color

        const pokeinnerHTML = `
       <div class="poke-box" id="poke-box">
        <img
          src="${img}"
          alt=""
        />
        <div class="pokemon-content">
          <h2 class="pokemon-name">${name}</h2>
          <p class="pokemon-id">#${id}</p>
          <p class="pokemon-weight">${weight} kg</p>
          <p class="pokemon-type">Type: ${type}</p>
        </div>
      </div>
      `
        createBox.innerHTML = pokeinnerHTML
        pokemonContentEl.appendChild(createBox)
      }
      createPokemonCard(data)
    })
}

idCounter()

searchInputEl.addEventListener('keyup', function (event) {
  const search = event.target.value.toLowerCase()
  const pokemons = document.getElementsByClassName('poke-box')
  console.log(search)
  for (let i = 0; i < pokemons.length; i++) {
    let currentName = pokemons[i].textContent.toLowerCase()
    if (currentName.includes(search)) {
      pokemons[i].style.display = 'block'
    } else {
      pokemons[i].style.display = 'none'
    }
  }
})
