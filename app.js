// Set variables
const colorDivs = document.querySelectorAll('.color')
const generateBtn = document.querySelector('generate')
const slider = document.querySelectorAll('input[type="range"]')
const currentHexes = document.querySelectorAll('.color h2')
let initialColors

//functions
function generateHex() {
  const hexColor = chroma.random()
  return hexColor
  //   const letters = '#0123456789ABCDEF'
  //   let hash = '#'
  //   for (i = 0; i < 6; i++) {
  //     hash += letters[Math.floor(Math.random() * 16)]
  //   }
  //   return hash
}

function randomColors() {
  colorDivs.forEach((div, index) => {
    const hexText = div.children[0]
    const randomColor = generateHex()
    div.style.backgroundColor = randomColor
    hexText.innerHTML = randomColor
  })
}

randomColors()
