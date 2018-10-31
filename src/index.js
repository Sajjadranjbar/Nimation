import '../style/node_style.css'
import Scene from './lib/scene'
import Circle from './lib/circle'

const scene = new Scene('scene')

const sink = new Circle()
sink.setBorderWidth(5)
sink.setBorderColor('#ff2255')
sink.setText('Sink')
sink.setRadius(30)

const source = new Circle()
source.setBorderWidth(5)
source.setBorderColor('#5522ff')
source.setText('Source')
source.setRadius(30)

scene.addObject(sink)
scene.addObject(source)

sink.updateXY(400, 400)
source.updateXY(100, 100)

sink.move(200, 200, 2000, 1).finished.then(() => {
	sink.broadcast('sajjad', 4, 300, 1000).finished.then(() => {
		sink.move(400, 400, 1000, 1)
	})
})

source.broadcast('sajjad', 6, 500, 600).finished.then(() => {
	source.move(100, 700, 2000, 1)
})
