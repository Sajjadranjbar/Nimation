import './lib/nimation'
import Circle from './lib/circle'
import { BLUE, RED, GREEN } from './lib/nimation'
import Scene from './lib/scene'
import BatteryNode from './lib/batteryNode'
import Packet from './lib/packet'
import Energy from './lib/energy'

const scene_1 = new Scene('scene_1')

const source = new Circle()
source.setBorderColor(BLUE)
source.setText('Source')
source.updateXY(100, 300)
scene_1.addObject(source)

const relay = new BatteryNode(1000, 41)
relay.setBorderColor(RED)
relay.setText('relay')
relay.updateXY(350, 300)
scene_1.addObject(relay)

const dest = new Circle()
dest.setBorderColor(GREEN)
dest.setText('dest')
dest.updateXY(600, 300)
scene_1.addObject(dest)

let timer = null
source.addAction('start', () => {
	source.unicast(new Packet('Hi', relay), 250, 2000)
	timer = setInterval(() => {
		source.unicast(new Packet('Hi', relay), 250, 2000)
	}, 5000)
})
source.addAction('stop', () => {
	clearInterval(timer)
})

relay.onRecv = packet => {
	if (packet.sender === source) {
		relay.unicast(new Packet('Hi', dest, 'data'), 250, 2000)
	}
}
