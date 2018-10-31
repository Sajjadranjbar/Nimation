import anime from 'animejs'
class NimationObject {
	constructor(x, y, width, height) {
		this.scene = null
		this.element = document.createElement('div')
		this.element.id = Math.random()
			.toString(36)
			.substring(7)
		this.id = this.element.id
		this.element.style.position = 'absolute'
		this.element.style.border = 'solid'
		this.x = x
		this.y = y
		this.destX = null
		this.destY = null
		this.width = width
		this.height = height
		this.element.style.position = 'absolute'
		// this.setXY(x, y)

		this.element.style.top = y + 'px'
		this.element.style.left = x + 'px'
		this.element.style.width = width + 'px'
		this.element.style.height = height + 'px'
		this.element.style.display = 'table'
		this.lastReceivedPacket = null
	}
	setScene(scene) {
		this.scene = scene
	}
	getScene() {
		return this.scene
	}
	getId() {
		return this.id
	}
	setElement(element) {
		this.element = element
	}
	getElement() {
		return this.element
	}
	updateXY(x, y) {
		if (this.element !== null) {
			this.element.style.left = x + 'px'
			this.element.style.top = y + 'px'
			this.element.style.transform = ''
			this.x = x
			this.y = y
		}
	}
	move(x, y, duration, loop) {
		const deltaX = x - this.x
		const deltaY = y - this.y

		return new Promise(done => {
			anime({
				targets: this.element,
				translateX: [{ value: deltaX + 'px', duration }],
				translateY: [{ value: deltaY + 'px', duration }],
				complete: () => {
					this.updateXY(x, y)
					done()
				},
				loop,
				elasticity: 1,
				autoplay: true
			})
		})
	}

	setBorderWidth(width) {
		if (this.element !== null) {
			this.element.style.borderWidth = width + 'px'
			this.borderWidth = width
		}
	}
	setBorderColor(color) {
		if (this.element !== null) {
			this.element.style.borderColor = color
			this.borderColor = color
		}
	}
	setBackColor(color) {
		if (this.element !== null) {
			this.element.style.backgroundColor = color
			this.backColor = color
		}
	}
	setTextColor(color) {
		if (this.element !== null) {
			this.element.style.color = color
			this.textColor = color
		}
	}
	setText(text) {
		if (this.element !== null) {
			this.element.innerHTML =
				'<div style="display: table-cell; vertical-align: middle;"><div>' +
				text +
				'</div></div>'
		}
	}
	setTextSize(textSize) {
		if (this.element !== null) {
			this.element.style.fontSize = textSize
		}
	}
	setBorderRadius(radius) {
		if (this.element !== null) {
			this.element.style.borderRadius = radius
		}
	}
	setSize(width, height) {
		this.width = width
		this.height = height
	}
	setXY(x, y) {
		this.x = x
		this.y = y
	}
	getX() {
		return this.x
	}
	getY() {
		return this.y
	}
	getWidth() {
		return this.width
	}
	getHeight() {
		return this.height
	}

	/*
		every object use this method to broadcast 
		it's message to the scene attached to.
	*/
	broadcast(packet, loop, size, duration) {
		const broadcast = this.cloneBorder()
		this.scene.addObject(broadcast)

		return new Promise(done => {
			anime({
				targets: broadcast.getElement(),
				complete: () => {
					this.scene.removeObject(broadcast)
					done()
				},
				update: () => {
					broadcast.setSize(
						parseInt(broadcast.getElement().style.width.slice(0, -2)),
						parseInt(broadcast.getElement().style.height.slice(0, -2))
					)

					broadcast.setXY(
						parseInt(broadcast.getElement().style.left.slice(0, -2)),
						parseInt(broadcast.getElement().style.top.slice(0, -2))
					)
					this.scene.updateMessage(packet, broadcast, this)
				},
				width: {
					value: '+=' + size,
					duration,
					easing: 'easeInOutSine'
				},
				height: {
					value: '+=' + size,
					duration,
					easing: 'easeInOutSine'
				},
				left: {
					value: '-=' + size / 2,
					duration,
					easing: 'easeInOutSine'
				},
				top: {
					value: '-=' + size / 2,
					duration,
					easing: 'easeInOutSine'
				},
				opacity: {
					value: 0,
					duration,
					easing: 'easeInOutSine'
				},
				loop
			})
		})
	}
	/*
		when ever there is a packet for this object 
		scene will call this method with packet as argument.
	*/
	recv(packet) {
		//received a packet from scene
		if (
			this.lastReceivedPacket !== null &&
			this.lastReceivedPacket.uid === packet.uid
		) {
			return
		}

		// new packet recv here do stuffs
		this.lastReceivedPacket = packet
		console.log(packet)
	}
}
export default NimationObject
