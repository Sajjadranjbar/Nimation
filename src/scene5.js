import './lib/nimation'
import Circle from './lib/circle'
import { BLUE, RED, GREEN, PURPLE } from './lib/nimation'
import Scene from './lib/scene'
import BatteryNode from './lib/batteryNode'
import Packet from './lib/packet'
import Energy from './lib/energy'

const scene5 = new Scene('scene5')

const source = new Circle()
source.setBorderColor(BLUE)
source.setText('Source')
source.updateXY(100, 300)
scene5.addObject(source)

const relay = new BatteryNode(1000, 500)
relay.setBorderColor(RED)
relay.setText('relay')
relay.updateXY(350, 300)
scene5.addObject(relay)

const relay2 = new BatteryNode(1000, 100)
relay2.setBorderColor(PURPLE)
relay2.setText('relay2')
relay2.updateXY(600, 300)
scene5.addObject(relay2)

const dest = new Circle()
dest.setBorderColor(GREEN)
dest.setText('dest')
dest.updateXY(850, 300)
scene5.addObject(dest)

let timer = null

source.addAction('start', () => {
	source
		.WPT(new Energy(80), 250, 2000)
		.then(() => source.unicast(new Packet('Hi', relay), 250, 2000))
})
source.addAction('reset', () => {
	relay.updateBattery(500)
	relay2.updateBattery(100)
})
source.addAction('stop', () => {
	clearInterval(timer)
})

relay.onRecv = packet => {
	if (packet.sender === source) {
		if (packet.type !== 'burst') {
			const relay_packet = new Packet('Hi', [source, relay2])
			relay_packet.addHeader({ type: 'activation', value: relay.getCharge() })
			relay.multicast(relay_packet, 250, 2000)
		} else {
			relay.unicast(new Packet('Hi', relay2, 'data'), 250, 2000)
		}
	}
}

relay2.onRecv = packet => {
	if (packet.sender === relay) {
		relay2.unicast(new Packet('Hi', dest, 'data'), 250, 2000)
	}
}
source.onRecv = packet => {
	if (packet.sender === relay) {
		const activation = packet.getHeader('activation').value
		source.unicast(
			new Packet('Hi', relay, 'burst'),
			250,
			2000,
			Math.floor(activation / 80)
		)
	}
}
