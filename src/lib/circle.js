import Node from './node'

class Circle extends Node {
	constructor(
		text = 'A',
		radius = 50,
		borderColor = 'white',
		backColor = 'none',
		textColor = 'white',
		borderWidth = 10,
		textSize = 'medium',
		x = 0,
		y = 0
	) {
		super(
			x,
			y,
			radius * 2,
			radius * 2,
			borderColor,
			backColor,
			textColor,
			900,
			borderWidth,
			text,
			textSize
		)
		this.radius = radius
		this.borderColor = borderColor
		this.backColor = backColor
		this.borderWidth = borderWidth
	}
	setRadius(radius) {
		this.setSize(radius * 2, radius * 2)
	}
	cloneBorder(style) {
		const cln = new Circle(
			'',
			this.radius / 2,
			this.borderColor,
			this.backColor,
			'none',
			this.borderWidth,
			'xx-small',
			this.x + this.radius / 2,
			this.y + this.radius / 2
		)
		cln.setBorderStyle(style)
		return cln
	}
}

export default Circle
