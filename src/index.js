import '../style/node_style.css'
import Scene from './lib/scene'
import Circle from './lib/circle'
import Packet from './lib/packet'

const scene = new Scene('scene')

const sink = new Circle()
sink.setBorderWidth(5)
sink.setBorderColor('#ff5555')
sink.setText('Sink')
sink.setRadius(30)

const source = new Circle()
source.setBorderWidth(5)
source.setBorderColor('#5533ff')
source.setText('Source')
source.setRadius(30)

scene.addObject(sink)
scene.addObject(source)

sink.updateXY(100, 100)
// source.updateXY(100, 100)

sink
	.move(200, 200, 1000, 1)
	.then(() => sink.broadcast(new Packet('sajjad'), 1, 700, 2000))

// document.querySelector('#scene .play').onclick = TLcontrols.play;
// document.querySelector('#scene .pause').onclick = pause
// document.querySelector('#scene .restart').onclick = TLcontrols.restart;
