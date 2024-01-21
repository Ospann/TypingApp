const measureText = (text: string) => {
    const measureDiv = document.createElement('div')
    document.body.appendChild(measureDiv)
    measureDiv.style.fontSize = 'xxx-large'
    measureDiv.style.fontFamily = 'Consolas, Courier New, monospace'
    measureDiv.style.position = 'absolute'
    measureDiv.style.visibility = 'hidden'
    measureDiv.style.whiteSpace = 'nowrap'
    measureDiv.textContent = text

    const width = measureDiv.clientWidth
    document.body.removeChild(measureDiv)
    return width
}

export default measureText
