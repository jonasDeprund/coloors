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
    checkTextContrast(randomColor, hexText)
    const color = chroma(randomColor)
    const sliders = div.querySelectorAll('.sliders input')
    console.log(sliders)
    const hue = sliders[0]
    const brightness = sliders[1]
    const saturation = sliders[2]

    colorizeSliders(color, hue, brightness, saturation)
  })
}

function checkTextContrast(color, text) {
  const luminance = chroma(color).luminance()
  if (luminance > 0.5) {
    text.style.color = 'black'
  } else {
    text.style.color = 'white'
  }
}

function colorizeSliders(color, hue, brightness, saturation) {
  const noSat = color.set('hsl.s', 0)
  const fullSat = color.set('hsl.s', 1)
  const scaleSat = chroma.scale([noSat, color, fullSat])

  saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(
    0
  )}, ${scaleSat(1)})`
}

randomColors()
