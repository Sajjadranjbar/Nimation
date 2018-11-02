import './lib/nimation'
import Circle from './lib/circle'
import { BLUE, RED, GREEN } from './lib/nimation'
import Scene from './lib/scene'
import BatteryNode from './lib/batteryNode'
import Packet from './lib/packet'
import Energy from './lib/energy'

const scene1 = new Scene('scene1')

const source = new Circle()
source.setBorderColor(BLUE)
source.setText('Source')
source.updateXY(100, 300)
scene1.addObject(source)

const relay = new BatteryNode(1000, 0)
relay.setBorderColor(RED)
relay.setText('relay')
relay.updateXY(350, 300)
scene1.addObject(relay)

const dest = new Circle()
dest.setBorderColor(GREEN)
dest.setText('dest')
dest.updateXY(600, 300)
scene1.addObject(dest)

let timer = null
source.addAction('start', () => {
	source
		.WPT(new Energy(80), 250, 1500)
		.then(() => source.unicast(new Packet('Hi', relay), 250, 1500))
		.then(() => relay.unicast(new Packet('Hi', dest), 250, 1500))
	timer = setInterval(() => {
		source
			.WPT(new Energy(80), 250, 1500)
			.then(() => source.unicast(new Packet('Hi', relay), 250, 1500))
			.then(() => relay.unicast(new Packet('Hi', dest), 250, 1500))
	}, 5000)
})
source.addAction('stop', () => {
	clearInterval(timer)
})
