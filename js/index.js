document.addEventListener("DOMContentLoaded", function(event) {

  const width = 60
  const height = 20
  const COLORS = ['red', 'green', 'blue', 'yellow', 'purple', 'orange']

  function createGrid(grid) {
    for (let j = 0; j < height; j++) {
      // create a row
      let row = document.createElement('div')
      row.classList.add("row")

      // creat pixels in the row
      for (let i = 0; i < width; i++) {
        let div = document.createElement('div')
        div.classList.add("pixel")
        row.appendChild(div)
      }

      grid.appendChild(row)
    }
  }

  function createPallete(pallete){
    for(let color of COLORS) {
      console.log('adding', color)
      let div = document.createElement('div')
      div.setAttribute('data-color', color)
      div.classList.add('pallete-color')
      div.classList.add(color)

      pallete.appendChild(div)
    }
  }

  function listenToPallete(pallete) {
    pallete.addEventListener('click', (event) => {
      if (event.target.className.match(/pallete-color/)){
        selectColor(event.target)
      }
    })
  }

  function updateColor(div, selectedColor) {
      // clear any previously set
      for(let color of COLORS) {
        div.classList.remove(color)
      }

      div.classList.add(selectedColor)
  }

  function currentColor() {
    let selected = document.querySelector('div.selected')
    console.log("selected color is", selected)

    // which color is in the classname list
    return selected && selected.getAttribute('data-color') || COLORS[0]
  }

  function selectColor(div) {
    document.querySelectorAll('#pallete div').forEach(elem => {
      elem.classList.remove('selected')
    })
    div.classList.add('selected')
    console.log("finsihed selecting color", div)
  }

  function listenToPixel(){
    document.addEventListener('mouseover', (event) => {
      let target = event.target
      if (target.className.match(/pixel/)) {
        console.log('clicked', event.target)
        updateColor(event.target, currentColor())
      }
    })
  }

  function init(){
    // create pixels
    const grid = document.getElementById('pixel-grid')
    const pallete = document.getElementById('pallete')

    createGrid(grid)
    listenToPixel(grid)

    createPallete(pallete)
    listenToPallete(pallete)
  }

  init()
})
