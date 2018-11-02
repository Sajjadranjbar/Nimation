class Energy {
	constructor(charge, receivers = null) {
		this.charge = charge
		this.receivers = receivers
		this.sender = null
		this.uid = Energy.uidCounter
		Energy.uidCounter++
		this.duration = null
		this.areaSize = null
	}
	getCharge() {
		return this.charge
	}
	setCharge(charge) {
		this.charge = charge
	}
}
Energy.uidCounter = 0
export default Energy
