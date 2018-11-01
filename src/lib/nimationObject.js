import anime from 'animejs'
class NimationObject {
	constructor(x, y, width, height) {
		this.scene = null
		this.elements = {}
		this.elements['node'] = document.createElement('div')
		this.elements['node'].id = Math.random()
			.toString(36)
			.substring(7)
		this.id = this.elements['node'].id
		this.elements['node'].style.position = 'absolute'
		this.elements['node'].style.border = 'solid'
		this.x = x
		this.y = y
		this.destX = null
		this.destY = null
		this.width = width
		this.height = height
		this.elements['node'].style.top = y + 'px'
		this.elements['node'].style.left = x + 'px'
		this.elements['node'].style.width = width + 'px'
		this.elements['node'].style.height = height + 'px'
		this.elements['node'].style.display = 'table'
		this.lastReceivedPacket = null
		this.type = 'node'
	}
	setNodeSize(width, height) {
		this.elements['node'].style.width = width + 'px'
		this.elements['node'].style.height = height + 'px'
	}
	wait(ms) {
		return new Promise(done => {
			setTimeout(() => {
				done()
			}, ms)
		})
	}
	setType(type) {
		this.type = type
	}
	getType() {
		return this.type
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
		this.elements['node'] = element
	}
	getNode() {
		return this.elements['node']
	}
	getElements() {
		return this.element
	}
	addElement(key, element) {
		if (this.elements['node'] === null) {
			console.error('this.elements[node] not initialized.')
			return
		}
		this.elements[key] = element
		this.elements['node'].appendChild(element)
	}
	updateXY(x, y) {
		if (this.elements['node'] !== undefined) {
			this.elements['node'].style.left = x + 'px'
			this.elements['node'].style.top = y + 'px'
			this.elements['node'].style.transform = ''
			this.x = x
			this.y = y
		}
	}
	move(x, y, duration, loop = false) {
		const deltaX = x - this.x
		const deltaY = y - this.y

		return new Promise(done => {
			anime({
				targets: this.elements['node'],
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
		if (this.elements['node'] !== undefined) {
			this.elements['node'].style.borderWidth = width + 'px'
			this.borderWidth = width
		}
	}
	setBorderColor(color) {
		if (this.elements['node'] !== undefined) {
			this.elements['node'].style.borderColor = color
			this.borderColor = color
		}
		if (this.elements['battery'] !== undefined) {
			this.elements['battery'].style.borderColor = color
			this.elements['battery'].children[0].style.backgroundColor = color
		}
	}
	setBackColor(color) {
		if (this.elements['node'] !== undefined) {
			this.elements['node'].style.backgroundColor = color
			this.backColor = color
		}
	}
	setTextColor(color) {
		if (this.elements['node'] !== undefined) {
			this.elements['node'].style.color = color
			this.textColor = color
		}
	}
	setOpacity(opacity) {
		if (this.elements['node'] !== undefined) {
			this.elements['node'].style.opacity = opacity
		}
	}
	setText(text) {
		if (this.elements['text'] === undefined) {
			let tx = document.getElementById(this.id + '_text')
			tx = document.createElement('div')
			tx.id = this.id + '_text'
			tx.style.display = 'table-cell'
			tx.style.verticalAlign = 'middle'
			this.elements['node'].appendChild(tx)
			tx.innerHTML = '<div>' + text + '</div>' + '</div>'
			this.elements['text'] = tx
		} else {
			this.elements['text'].innerHTML = '<div>' + text + '</div>' + '</div>'
		}
	}
	setTextSize(textSize) {
		if (this.elements['node'] !== undefined) {
			this.elements['node'].style.fontSize = textSize
		}
	}
	setBorderRadius(radius) {
		if (this.elements['node'] !== undefined) {
			this.elements['node'].style.borderRadius = radius + 'em'
		}
	}
	setBorderStyle(style) {
		if (this.elements['node'] !== undefined) {
			this.elements['node'].style.borderStyle = style
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
	setElementXY(x, y) {
		this.elements['node'].style.left = x + 'px'
		this.elements['node'].style.top = y + 'px'
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
	broadcast(packet, size, duration, loop = false) {
		const broadcast = this.cloneBorder('solid')
		broadcast.setType('broadcast')
		this.scene.addObject(broadcast)

		return new Promise(done => {
			anime({
				targets: broadcast.getNode(),
				complete: () => {
					this.scene.removeObject(broadcast)
					done()
				},
				update: () => {
					broadcast.setSize(
						parseInt(broadcast.getNode().style.width.slice(0, -2)),
						parseInt(broadcast.getNode().style.height.slice(0, -2))
					)

					broadcast.setXY(
						parseInt(broadcast.getNode().style.left.slice(0, -2)),
						parseInt(broadcast.getNode().style.top.slice(0, -2))
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
		every object use this method to unicast 
		it's message to the destination in the same scene.
	*/
	unicast(packet, size, duration, loop = false) {
		const unicast = this.cloneBorder('dotted')
		unicast.setType('unicast')
		this.scene.addObject(unicast)

		return new Promise(done => {
			anime({
				targets: unicast.getNode(),
				complete: () => {
					this.scene.removeObject(unicast)
					done()
				},
				update: () => {
					unicast.setSize(
						parseInt(unicast.getNode().style.width.slice(0, -2)),
						parseInt(unicast.getNode().style.height.slice(0, -2))
					)

					unicast.setXY(
						parseInt(unicast.getNode().style.left.slice(0, -2)),
						parseInt(unicast.getNode().style.top.slice(0, -2))
					)
					this.scene.updateUnicastMessage(packet, unicast, this)
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
		console.log(this.id, packet)
		// do some animation here
		const message = this.cloneBorder('solid')
		message.setType('message')
		message.setText('new:\n' + packet.payload)
		message.setTextSize('medium')
		message.setBorderRadius(0)
		message.setOpacity(0)
		message.setBorderWidth(1)
		message.setElementXY(
			this.getX() + this.getWidth() / 2,
			this.getY() + this.getHeight() * 2
		)
		this.scene.addObject(message)
		anime({
			targets: message.getNode(),
			complete: () => {
				this.scene.removeObject(message)
			},
			opacity: {
				value: 100,
				duration: 2000,
				easing: 'easeInOutSine'
			}
		})
	}
}
export default NimationObject
