import Scene from './lib/scene'
import Circle from './lib/circle'
import Packet from './lib/packet'
import BatteryNode from './lib/batteryNode'
import Energy from './lib/energy'
import './lib/nimation'
import { PURPLE, YELLOW, RED, GREEN, BLUEVIOLET } from './lib/nimation'

const wait = ms => {
	return new Promise(done => {
		setTimeout(() => {
			done()
		}, ms)
	})
}

const scene10 = new Scene('scene10')

const source = new Circle()
source.setBorderColor(PURPLE)
source.setText('Source')
scene10.addObject(source)
source.updateXY(-100, 300)

const l11 = new BatteryNode(1000, 100)
l11.setBorderColor(YELLOW)
l11.setText('1,1')
l11.updateXY(100, 100)
scene10.addObject(l11)

const l12 = new BatteryNode(1000, 340)
l12.setBorderColor(YELLOW)
l12.setText('1,2')
l12.updateXY(100, 300)
scene10.addObject(l12)

const l13 = new BatteryNode(1000, 700)
l13.setBorderColor(YELLOW)
l13.setText('1,3')
l13.updateXY(100, 500)
scene10.addObject(l13)

const l21 = new BatteryNode(1000, 40)
l21.setBorderColor(RED)
l21.setText('2,1')
l21.updateXY(300, 100)
scene10.addObject(l21)

const l22 = new BatteryNode(1000, 600)
l22.setBorderColor(RED)
l22.setText('2,2')
l22.updateXY(300, 300)
scene10.addObject(l22)

const l23 = new BatteryNode(1000, 200)
l23.setBorderColor(RED)
l23.setText('2,3')
l23.updateXY(300, 500)
scene10.addObject(l23)

const l31 = new BatteryNode(1000, 10)
l31.setBorderColor(GREEN)
l31.setText('3,1')
l31.updateXY(500, 100)
scene10.addObject(l31)

const l32 = new BatteryNode(1000, 800)
l32.setBorderColor(GREEN)
l32.setText('3,2')
l32.updateXY(500, 300)
scene10.addObject(l32)

const l33 = new BatteryNode(1000, 500)
l33.setBorderColor(GREEN)
l33.setText('3,3')
l33.updateXY(500, 500)
scene10.addObject(l33)

const l41 = new BatteryNode(1000, 200)
l41.setBorderColor(BLUEVIOLET)
l41.setText('4,1')
l41.updateXY(700, 100)
scene10.addObject(l41)

const l42 = new BatteryNode(1000, 1000)
l42.setBorderColor(BLUEVIOLET)
l42.setText('4,2')
l42.updateXY(700, 300)
scene10.addObject(l42)

const l43 = new BatteryNode(1000, 10)
l43.setBorderColor(BLUEVIOLET)
l43.setText('4,3')
l43.updateXY(700, 500)
scene10.addObject(l43)

const dest = new Circle()
dest.setBorderColor(PURPLE)
dest.setText('Dest')
dest.updateXY(950, 300)
scene10.addObject(dest)

source.addAction('WPT', () => {
	source.WPT(new Energy(30), 400, 1000)
})
source.addAction('l11', () => {
	source.unicast(new Packet('Hi', l11), 585, 3000)
})
source.addAction('l12', () => {
	source.unicast(new Packet('Hi', l12), 450, 1200)
})
source.addAction('l13', () => {
	source.unicast(new Packet('Hi', l13), 200, 1200)
})
source.addAction('MC', () => {
	source.multicast(new Packet('Hi', [l11, l12, l13]), 600, 2000)
})

l12.onRecv = packet => {}
