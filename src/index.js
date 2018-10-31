import '../style/node_style.css'
import Scene from './lib/scene'
import Circle from './lib/circle'
import Packet from './lib/packet'

const ORANGE = '#ff5555'
const PURPLE = '#5533ff'
const GREEN = '#55ff33'

const scene = new Scene('scene')

const sink = new Circle()
sink.setBorderWidth(5)
sink.setBorderColor(ORANGE)
sink.setText('Sink')
sink.setRadius(30)

const source = new Circle()
source.setBorderWidth(5)
source.setBorderColor(PURPLE)
source.setText('Source')
source.setRadius(30)

const relay = new Circle()
relay.setBorderWidth(5)
relay.setBorderColor(GREEN)
relay.setText('relay')
relay.setRadius(30)

scene.addObject(sink)
scene.addObject(source)
scene.addObject(relay)

// source.updateXY(100, 100)
const doSimulation = () => {
	sink.updateXY(100, 100)
	sink.updateXY(10, 10)
	relay.updateXY(600, 100)
	sink
		.move(200, 200, 1000, 1)
		.then(() => source.unicast(new Packet('Hi relay', relay), 1, 1200, 3000))
		.then(() => source.broadcast(new Packet('Hi every one'), 1, 1200, 2500))
}

document.querySelector('#scene .restart').addEventListener('click', () => {
	doSimulation()
})
