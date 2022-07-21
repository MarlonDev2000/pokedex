// Dados Iniciais
const pokeName = document.querySelector('.pokemon-name')
const pokeNumber = document.querySelector('.pokemon-number')
const pokeType = document.querySelector('.pokemon-type')
const pokeType2 = document.querySelector('.pokemon-type2')
const pokeImg = document.querySelector('.pokemon-image')
const pokeHeight = document.querySelector('.pokemon-height')
const pokeWeight = document.querySelector('.pokemon-weight')

const form = document.querySelector('.form')
const inputSearch = document.querySelector('.input-search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPoke = 3 // Variável de controle de qual pokémon inicia

// Funções
const fetchPoke = async (pokemon) => {
  const API = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

  if(API.status === 200 ) {
    const responseJson = await API.json()
    return responseJson
  }
}

const renderPoke = async (pokemon) => {

  pokeName.innerHTML = 'Carregando!'
  pokeNumber.innerHTML = ''
  pokeType.innerHTML = ''

  const data = await fetchPoke(pokemon)

  if(data) {
    searchPoke = data.id
    inputSearch.value = ''
    pokeImg.style.display = 'block'
    pokeName.innerHTML = data.name
    pokeNumber.innerHTML = data.id
    pokeType.innerHTML = data.types[0].type.name
    pokeImg.src = data.sprites.versions['generation-v']['black-white'].animated.front_default
    pokeHeight.innerHTML = `Height: ${data.height}`
    pokeWeight.innerHTML = `Weight: ${data.weight} kg`
    if(pokeType2.innerHTML = data.types.length > 1) {
      pokeType2.innerHTML = data.types[1].type.name
    } else {
      pokeType2.innerHTML = ''
    }
  } else {
    pokeName.innerHTML = 'Not Found!'
    pokeNumber.innerHTML = ''
    pokeType.innerHTML = ''
    pokeType2.innerHTML = ''
    pokeImg.style.display = 'none'
    pokeHeight.innerHTML = ''
    pokeWeight.innerHTML = ''
  }

}
renderPoke(searchPoke)

// Eventos

form.addEventListener('submit', (e) => {
  e.preventDefault()
  renderPoke(inputSearch.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
  if(searchPoke > 1) {
    searchPoke -= 1
    renderPoke(searchPoke)
  }
})

buttonNext.addEventListener('click', () => {
  searchPoke += 1
  renderPoke(searchPoke)
})

document.addEventListener('keyup', (e) => {
  if(e.key === 'ArrowRight') {
    searchPoke += 1
    renderPoke(searchPoke)
  } else if(e.key === 'ArrowLeft' && searchPoke > 1) {
    searchPoke -= 1
    renderPoke(searchPoke)
  }
})




