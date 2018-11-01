import '../style/node_style.css'
import Scene from './lib/scene'
import Circle from './lib/circle'
import Packet from './lib/packet'
import BatteryNode from './lib/batteryNode'
import Energy from './lib/energy'

const wait = ms => {
	return new Promise(done => {
		setTimeout(() => {
			done()
		}, ms)
	})
}
const ORANGE = '#ff5555'
const PURPLE = '#5533ff'
const GREEN = '#55ff33'
const BLUE = '#1144ff'

const scene = new Scene('scene')

const sink = new Circle()
sink.setBorderColor(ORANGE)
sink.setText('Sink')

const source = new Circle()
source.setBorderColor(PURPLE)
source.setText('Source')

const relay = new BatteryNode(10000, 10000)
relay.setBorderColor(GREEN)
relay.setText('relay')

const bNode = new BatteryNode(10000, 3000)
bNode.setBorderColor(BLUE)
bNode.setText('Battery')

scene.addObject(sink)
scene.addObject(source)
scene.addObject(relay)
scene.addObject(bNode)

// source.updateXY(100, 100)
const doSimulation = () => {
	sink.updateXY(300, 100)
	source.updateXY(10, 10)
	relay.updateXY(600, 100)
	bNode.updateXY(300, 500)

	sink
		.wait(100)
		.then(() => relay.WPT(new Energy(5000), 900, 3000))
		.then(() => bNode.WPT(new Energy(5000), 900, 3000))
		.then(() => relay.WPT(new Energy(5000), 900, 3000))
		.then(() => bNode.WPT(new Energy(5000), 900, 3000))

	// .then(() => bNode.move(100, 100, 2000))
	// .then(() => source.unicast(new Packet('Hi relay', relay), 1200, 3000))
	// .then(() => source.broadcast(new Packet('Hello every body'), 1200, 2500))
	// .then(() => relay.updateBattery(100))
}

document.querySelector('#scene .restart').addEventListener('click', () => {
	doSimulation()
})
