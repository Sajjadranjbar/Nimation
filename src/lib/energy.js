class Energy {
	constructor(charge, receiver = null) {
		this.charge = charge
		this.receiver = receiver
		this.uid = Energy.uidCounter
		Energy.uidCounter++
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
