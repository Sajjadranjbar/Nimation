import './lib/nimation'
import Circle from './lib/circle'
import { BLUE, RED, GREEN } from './lib/nimation'
import Scene from './lib/scene'
import BatteryNode from './lib/batteryNode'
import Packet from './lib/packet'
import Energy from './lib/energy'

const scene0 = new Scene('scene0')

const source = new Circle()
source.setBorderColor(BLUE)
source.setText('Source')
source.updateXY(100, 300)
scene0.addObject(source)

const relay = new BatteryNode(1000, 0)
relay.setBorderColor(RED)
relay.setText('relay')
relay.updateXY(350, 300)
scene0.addObject(relay)

const dest = new Circle()
dest.setBorderColor(GREEN)
dest.setText('dest')
dest.updateXY(600, 300)
scene0.addObject(dest)

let timer = null
source.addAction('start', () => {
	source.unicast(new Packet('Hi', relay), 250, 1500)
	timer = setInterval(() => {
		source.unicast(new Packet('Hi', relay), 250, 1500)
	}, 3000)
})
source.addAction('stop', () => {
	clearInterval(timer)
})
