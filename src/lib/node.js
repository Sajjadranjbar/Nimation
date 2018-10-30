import NimationObject from './nimationObject'

class Node extends NimationObject {
	constructor(x, y, width, height, color, text = null, textSize = 'small') {
		super()
		this.element = document.createElement('div')
		this.element.style.position = 'absolute'
		this.element.style.left = x + '%'
		this.element.style.top = y + '%'
		this.element.style.width = width + '%'
		this.element.style.height = height + '%'
		this.element.style.border = '4px  solid ' + color
		this.element.style.color = color

		this.element.style.fontSize = textSize
		if (text !== null) {
			this.element.innerHTML = text
		}
	}
	move(x, y, duration) {
		this.scene.addAnimation({
			targets: this.element,
			translateX: [{ value: x, duration }],
			translateY: [{ value: y, duration }],
			complete: () => {
				this.element.style.left = x
				this.element.style.top = y
			}
		})
	}
}

export default Node
