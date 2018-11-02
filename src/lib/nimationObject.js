import anime from 'animejs'
import '../../style/node_style.css'
class NimationObject {
	constructor(x, y, width, height) {
		this.scene = null
		this.elements = {}
		this.elements['node'] = document.createElement('div')
		this.elements['node'].addEventListener('dblclick', () => {
			this.showActions()
		})
		this.elements['node'].addEventListener('click', () => {
			this.hideActions()
		})
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
		this.elements['node'].style.zIndex = 900
		this.lastReceivedPacket = null
		this.type = 'node'
		this.onRecv = packet => {}
		this.actions = null
		this.borderColor = null
		this.backColor = null
		this.textColor = null
	}
	setNodeSize(width, height) {
		this.elements['node'].style.width = width + 'px'
		this.elements['node'].style.height = height + 'px'
	}
	addAction(title, callback) {
		if (this.actions === null) {
			this.actions = this.cloneBorder('solid')
			this.actions.setType('action')
			this.actions.setBorderRadius(0)
			this.actions.setOpacity(0)
			this.actions.setBorderWidth(2)
			this.actions.setElementXY(
				this.getX() + this.getWidth() / 3,
				this.getY() + this.getHeight() + 20
			)

			this.actions.setBorderColor(this.borderColor)
			this.actions.setTextColor(this.textColor)
			this.actions.getNode().style.zIndex = 1000
		}
		const act = document.createElement('button')
		act.id = 'action_' + title + '_' + this.id
		act.innerHTML = title
		act.setAttribute('class', 'node_action')
		act.style.color = this.textColor
		act.addEventListener('click', () => {
			this.hideActions()
			callback()
		})
		this.actions.addElement('action_' + title + '_' + this.id, act)
		this.scene.addObject(this.actions)
	}
	showActions() {
		if (this.actions === null) return false
		this.actions.setOpacity(100)
		// anime({
		// 	targets: this.actions.getNode(),
		// 	opacity: {
		// 		value: 100,
		// 		duration: 400,
		// 		easing: 'easeInOutSine'
		// 	}
		// })
	}
	hideActions() {
		if (this.actions === null) return
		this.actions.setOpacity(0)
		// anime({
		// 	targets: this.actions.getNode(),
		// 	opacity: {
		// 		value: 0,
		// 		duration: 400,
		// 		easing: 'easeInOutSine'
		// 	}
		// })
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
		packet.sender = this
		packet.duration = duration
		packet.areaSize = size * 2
		return new Promise(done => {
			anime({
				targets: broadcast.getNode(),
				complete: () => {
					this.scene.removeObject(broadcast)
					done()
				},
				begin: () => {
					this.scene.updateMessage(packet, this, loop)
				},
				width: {
					value: '+=' + size * 2,
					duration,
					easing: 'easeInOutSine'
				},
				height: {
					value: '+=' + size * 2,
					duration,
					easing: 'easeInOutSine'
				},
				left: {
					value: '-=' + size,
					duration,
					easing: 'easeInOutSine'
				},
				top: {
					value: '-=' + size,
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
		packet.sender = this
		packet.duration = duration
		packet.areaSize = size * 2
		return new Promise(done => {
			anime({
				targets: unicast.getNode(),
				complete: () => {
					this.scene.removeObject(unicast)
					done()
				},
				begin: () => {
					this.scene.updateUnicastMessage(packet, loop)
				},

				width: {
					value: '+=' + size * 2,
					duration,
					easing: 'easeInOutSine'
				},
				height: {
					value: '+=' + size * 2,
					duration,
					easing: 'easeInOutSine'
				},
				left: {
					value: '-=' + size,
					duration,
					easing: 'easeInOutSine'
				},
				top: {
					value: '-=' + size,
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
	multicast(packet, size, duration, loop = false) {
		const unicast = this.cloneBorder('dotted')
		unicast.setType('unicast')
		this.scene.addObject(unicast)
		packet.sender = this
		packet.duration = duration
		packet.areaSize = size * 2
		return new Promise(done => {
			anime({
				targets: unicast.getNode(),
				complete: () => {
					this.scene.removeObject(unicast)
					done()
				},
				begin: () => {
					this.scene.updateMulticastMessage(packet, loop)
				},
				width: {
					value: '+=' + size * 2,
					duration,
					easing: 'easeInOutSine'
				},
				height: {
					value: '+=' + size * 2,
					duration,
					easing: 'easeInOutSine'
				},
				left: {
					value: '-=' + size,
					duration,
					easing: 'easeInOutSine'
				},
				top: {
					value: '-=' + size,
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
	showMessage(message, duration, callback, color = null) {
		const messageAnim = this.cloneBorder('solid')
		messageAnim.setType('message')
		messageAnim.setText(message)
		messageAnim.setTextSize('medium')
		messageAnim.setBorderRadius(0)
		messageAnim.setOpacity(0)
		messageAnim.setBorderWidth(1)
		messageAnim.setElementXY(
			this.getX() + this.getWidth() / 3,
			this.getY() + this.getHeight() + 20
		)
		if (color !== null) {
			messageAnim.setBorderColor(color)
			messageAnim.setTextColor(color)
		}
		this.scene.addObject(messageAnim)
		anime({
			targets: messageAnim.getNode(),
			complete: () => {
				this.scene.removeObject(messageAnim)
				callback()
			},
			opacity: {
				value: 100,
				duration: duration,
				easing: 'easeInOutSine'
			}
		})
	}

	/*
		when ever there is a packet for this object 
		scene will call this method with packet as argument.
	*/
	recv(packet, loop) {
		const distance = Math.sqrt(
			Math.pow(this.x - packet.sender.x, 2) +
				Math.pow(this.y - packet.sender.y, 2)
		)
		if (distance < packet.areaSize / 2 + this.width) {
			if (!loop) loop = 1
			for (let index = 0; index < loop; index++) {
				setTimeout(() => {
					this.showMessage(packet.payload, packet.duration - 500, () => {
						this.onRecv(packet)
					})
				}, ((packet.areaSize - distance + 100) / packet.areaSize) * packet.duration * (index + 1))
			}
		}
	}

	/*
		every object use this method to Transfer Wireless Power 
		to space
	*/
	WPT(energy, size, duration, loop = false) {
		const energyAnim = this.cloneFill()
		energyAnim.setType('energy')
		this.scene.addObject(energyAnim)
		energy.sender = this
		energy.areaSize = size * 2
		energy.duration = duration
		return new Promise(done => {
			anime({
				targets: energyAnim.getNode(),
				complete: () => {
					this.scene.removeObject(energyAnim)

					done()
				},
				begin: () => {
					this.scene.updateEnergyMessage(energy, loop)
				},
				width: {
					value: '+=' + size * 2,
					duration,
					easing: 'easeInOutSine'
				},
				height: {
					value: '+=' + size * 2,
					duration,
					easing: 'easeInOutSine'
				},
				left: {
					value: '-=' + size,
					duration,
					easing: 'easeInOutSine'
				},
				top: {
					value: '-=' + size,
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
}
export default NimationObject
