import Circle from './circle'
import anime from 'animejs'

class BatteryNode extends Circle {
	constructor(capacity, charge = 0) {
		super()
		this.capacity = capacity
		this.lastReceivedEnergy = null
		this.charge = charge
		this.batOutDiv = null
		this.batInDiv = null
		this.batOutDiv = document.createElement('div') // battery outer rect
		this.batInDiv = document.createElement('div') // battery outer rect

		this.batOutDiv.style.position = 'absolute'
		this.batOutDiv.style.border = 'solid'
		this.batOutDiv.style.borderWidth = '3px'
		this.batOutDiv.style.borderColor = this.borderColor

		this.batOutDiv.style.top = 0 + 'px'
		this.batOutDiv.style.left = this.width + 10 + 'px'
		this.batOutDiv.style.width = 13 + 'px'
		this.batOutDiv.style.height = 45 + 'px'
		this.batOutDiv.style.display = 'table'

		this.batInDiv.style.position = 'absolute'
		this.batInDiv.style.backgroundColor = this.borderColor

		this.batInDiv.style.width = 13 + 'px'

		let height = (this.charge / this.capacity) * (this.height - 12) //6 is border width
		if (height > this.height) height = this.height

		this.batInDiv.style.height = height + 'px'

		this.batInDiv.style.display = 'table'
		this.batInDiv.style.bottom = 0

		this.batOutDiv.appendChild(this.batInDiv)
		this.addElement('battery', this.batOutDiv)
	}
	setBatteryBorderWidth(width) {
		if (this.batOutDiv !== null) {
			this.batOutDiv.style.borderWidth = width + 'px'
		}
	}
	setBatteryBorderColor(color) {
		if (this.batOutDiv !== null) {
			this.batOutDiv.style.borderColor = color
		}
	}
	setBatteryBackColor(color) {
		if (this.batInDiv !== null) {
			this.batInDiv.style.backgroundColor = color
		}
	}
	setBatterySize(width, height) {
		if (this.batInDiv !== null && this.batOutDiv !== null) {
			this.batOutDiv.style.width = width + 'px'
			this.batInDiv.style.width = width + 'px'
			this.batOutDiv.style.height = height + 'px'
			this.height = height
			this.batInDiv.style.height = (this.charge / this.capacity) * this.height
			if (this.batInDiv.style.height > this.height)
				this.batInDiv.style.height = this.height
		}
	}
	getCharge() {
		return this.charge
	}
	setCharge(charge) {
		this.charge = charge
	}
	updateBattery(value) {
		this.charge = value
		let height = (this.charge / this.capacity) * (this.height - 14) //6 is border width
		if (height > this.height) {
			height = this.height - 14
		}
		anime({
			targets: this.batInDiv,
			height: {
				value: height,
				duration: 1000,
				easing: 'easeInOutSine'
			}
		})
	}
	harvest(energy) {
		const distance = Math.sqrt(
			Math.pow(this.x - energy.sender.x, 2) +
				Math.pow(this.y - energy.sender.y, 2)
		)
		if (distance < energy.areaSize / 2 + this.width) {
			setTimeout(() => {
				const ex =
					this.charge + energy.getCharge() > this.capacity
						? this.capacity
						: this.charge + energy.getCharge()
				this.updateBattery(ex)
			}, ((energy.areaSize - distance + 100) / energy.areaSize) * energy.duration)
		}
	}

	unicast(packet, size, duration, loop = false) {
		if (this.charge >= 40) {
			this.charge -= 40
			return super.unicast(packet, size, duration, loop)
		} else {
			return new Promise((done, reject) => {
				this.showMessage('Low Battery Send', 2000, () => {}, '#ff0000')
				reject()
			})
		}
	}

	broadcast(packet, size, duration, loop = false) {
		if (this.charge >= 40) {
			this.charge -= 40
			return super.unicast(packet, size, duration, loop)
		} else {
			return new Promise((done, reject) => {
				this.showMessage('Low Battery Send', 2000, () => {}, '#ff0000')
				reject()
			})
		}
	}

	multicast(packet, size, duration, loop = false) {
		if (this.charge >= 40) {
			this.charge -= 40
			return super.multicast(packet, size, duration, loop)
		} else {
			return new Promise((done, reject) => {
				this.showMessage('Low Battery Send', 2000, () => {}, '#ff0000')
				reject()
			})
		}
	}

	/*
		every object use this method to Transfer Wireless Power 
		to space
	*/
	WPT(energy, size, duration) {
		const transferEnergy =
			this.charge > 0
				? this.charge < energy.charge
					? this.charge
					: energy.charge
				: 0
		if (transferEnergy === 0) {
			return new Promise(done => {
				done()
			})
		}
		const energyAnim = this.cloneFill()
		energyAnim.setType('energy')
		this.scene.addObject(energyAnim)
		energy.setCharge(transferEnergy)
		energy.sender = this
		energy.areaSize = size
		energy.duration = duration
		return new Promise(done => {
			anime({
				targets: energyAnim.getNode(),
				complete: () => {
					this.scene.removeObject(energyAnim)
					done()
				},
				begin: () => {
					//in animation begin decrease nodes battery level
					this.updateBattery(this.charge - transferEnergy)
					this.scene.updateEnergyMessage(energy)
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
				}
			})
		})
	}
	recv(packet, loop) {
		const distance = Math.sqrt(
			Math.pow(this.x - packet.sender.x, 2) +
				Math.pow(this.y - packet.sender.y, 2)
		)
		if (distance < packet.areaSize / 2 + this.width) {
			if (!loop) loop = 1
			for (let index = 0; index < loop; index++) {
				setTimeout(() => {
					if (!(this.charge > 40)) {
						this.showMessage('Low Battery Recv', 2000, () => {}, '#ff0000')
						return
					}
					// has energy to recv message
					this.showMessage(packet.payload, packet.duration - 500, () => {
						this.onRecv(packet)
					})
					this.updateBattery(this.charge - 40)
				}, ((packet.areaSize - distance + 100) / packet.areaSize) * packet.duration * (index + 1))
			}
		}
	}
}

export default BatteryNode
