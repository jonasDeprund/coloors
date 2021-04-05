// Set variables
const colorDivs = document.querySelectorAll('.color')
const generateBtn = document.querySelector('.generate')
const sliders = document.querySelectorAll('input[type="range"]')
const currentHexes = document.querySelectorAll('.color h2')
const popup = document.querySelector('.copy-container')
const adjustButton = document.querySelectorAll('.adjust')
const lockButton = document.querySelectorAll('.lock')
const closeAdjustments = document.querySelectorAll('.close-adjustment')
const sliderContainers = document.querySelectorAll('.sliders')
let initialColors

// Local storage
let savedPalettes = []

// Event Listeners
generateBtn.addEventListener('click', randomColors)

sliders.forEach((slider) => {
  slider.addEventListener('input', hslControls)
})

colorDivs.forEach((div, index) => {
  div.addEventListener('change', () => {
    updateTextUI(index)
  })
})

currentHexes.forEach((hex) => {
  hex.addEventListener('click', () => {
    copyToClipboard(hex)
  })
})

popup.addEventListener('transitionend', () => {
  const popupBox = popup.children[0]
  popup.classList.remove('active')
  popupBox.classList.remove('active')
})

adjustButton.forEach((button, index) => {
  button.addEventListener('click', () => {
    openAdjustmentPanel(index)
  })
})

closeAdjustments.forEach((button, index) => {
  button.addEventListener('click', () => {
    closeAdjustmentPanel(index)
  })
})

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
  initialColors = []
  colorDivs.forEach((div, index) => {
    const hexText = div.children[0]
    const randomColor = generateHex()
    // Add to an array
    if (div.classList.contains('locked')) {
      initialColors.push(hexText.innerText)
      return
    } else {
      initialColors.push(chroma(randomColor).hex())
    }

    div.style.backgroundColor = randomColor
    hexText.innerHTML = randomColor
    checkTextContrast(randomColor, hexText)
    const color = chroma(randomColor)
    const sliders = div.querySelectorAll('.sliders input')
    const hue = sliders[0]
    const brightness = sliders[1]
    const saturation = sliders[2]

    colorizeSliders(color, hue, brightness, saturation)
  })
  //reset input
  resetInputs()
  // Check for contrast
  adjustButton.forEach((button, index) => {
    checkTextContrast(initialColors[index], button)
    checkTextContrast(initialColors[index], lockButton[index])
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

  const midBright = color.set('hsl.l', 0.5)
  const scaleBright = chroma.scale(['black', midBright, 'white'])

  saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(
    0
  )}, ${scaleSat(1)})`
  brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(
    0
  )}, ${scaleBright(0.5)}, ${scaleBright(1)})`
  hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75), rgb(204,204,75), rgb(75,204,75), rgb(75,204,204), rgb(75,75,204), rgb(204,75,204), rgb(204,75,75))`
}

function hslControls(e) {
  const index =
    e.target.getAttribute('data-bright') ||
    e.target.getAttribute('data-sat') ||
    e.target.getAttribute('data-hue')

  let sliders = e.target.parentElement.querySelectorAll('input[type="range"]')
  const hue = sliders[0]
  const brightness = sliders[1]
  const saturation = sliders[2]

  const bgColor = initialColors[index]
  let color = chroma(bgColor)
    .set('hsl.s', saturation.value)
    .set('hsl.l', brightness.value)
    .set('hsl.h', hue.value)

  colorDivs[index].style.backgroundColor = color
  colorizeSliders(color, hue, brightness, saturation)
}

function updateTextUI(index) {
  const activeDiv = colorDivs[index]
  const color = chroma(activeDiv.style.backgroundColor)
  const textHex = activeDiv.querySelector('h2')
  const icons = activeDiv.querySelectorAll('.controls button')
  textHex.innerText = color.hex()

  checkTextContrast(color, textHex)
  for (icon of icons) {
    checkTextContrast(color, icon)
  }
}

function resetInputs() {
  colorDivs.forEach((div, i) => {
    const color = initialColors[i],
      hueValue = chroma(color).hsl()[0],
      satValue = chroma(color).hsl()[1],
      brightValue = chroma(color).hsl()[2]
    sliders[0 + 3 * i].value = Math.floor(hueValue)
    sliders[1 + 3 * i].value = Math.floor(brightValue * 100) / 100
    sliders[2 + 3 * i].value = Math.floor(satValue * 100) / 100
  })
}

function copyToClipboard(hex) {
  const el = document.createElement('textaera')
  el.value = hex.innerText
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  //popup animation
  const popupBox = popup.children[0]
  popup.classList.add('active')
  popupBox.classList.add('active')
}

function openAdjustmentPanel(index) {
  sliderContainers[index].classList.toggle('active')
}

function closeAdjustmentPanel(index) {
  sliderContainers[index].classList.remove('active')
}

// local storage stuff
const saveBtn = querySelectorAll('.save')
const submitSave = querySelector('.submit-save')
const closeSave = document.querySelector('.closeSave')
const saveContainer = document.querySelector('.save-container')
const saveInput = document.querySelector('save-container input')

// Event listeners
saveBtn.addEventListener('click', openPalette)

// functions

function openPalette(e) {
  const popup = saveContainer.children[0]
  saveContainer.classList.add('active')
  popup.classList.add('active')
}

randomColors()
