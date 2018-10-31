import NimationObject from './nimationObject'

class Node extends NimationObject {
	constructor(
		x,
		y,
		width,
		height,
		borderColor,
		backColor,
		textColor,
		borderRadius = '0em',
		borderWidth = '10px',
		text = null,
		textSize = 'small'
	) {
		super(x, y, width, height)
		this.setBorderWidth(borderWidth)
		this.setBorderColor(borderColor)
		this.setBackColor(backColor)
		this.setBorderRadius(borderRadius)
		this.setTextColor(textColor)
		this.setTextSize(textSize)
		if (text !== null) {
			this.setText(text)
		}
	}
}

export default Node
