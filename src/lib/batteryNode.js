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
	updateBattery(value) {
		this.charge = value
		let height = (this.charge / this.capacity) * (this.height - 12) //6 is border width
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
		if (
			this.lastReceivedEnergy !== null &&
			this.lastReceivedEnergy.uid === energy.uid
		) {
			return
		}
		this.lastReceivedEnergy = energy
		console.log('battery node recv energy')
		this.updateBattery(this.charge + energy.getCharge())
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
				},
				update: () => {
					energyAnim.setSize(
						parseInt(energyAnim.getNode().style.width.slice(0, -2)),
						parseInt(energyAnim.getNode().style.height.slice(0, -2))
					)

					energyAnim.setXY(
						parseInt(energyAnim.getNode().style.left.slice(0, -2)),
						parseInt(energyAnim.getNode().style.top.slice(0, -2))
					)
					this.scene.updateEnergyMessage(energy, energyAnim, this)
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
}

export default BatteryNode
