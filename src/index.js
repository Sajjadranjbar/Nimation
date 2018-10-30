import '../style/node_style.css'
import Node from './lib/node'
import Scene from './lib/scene'

const scene = new Scene('scene')
const scene1 = new Scene('scene2')

const node1 = new Node(0, 0, 4, 3, '#ffb1a1', 'AAA', 'medium')
const node2 = new Node(0, 0, 4, 3, '#ffb1a1', 'BBB', 'medium')
const node3 = new Node(0, 0, 4, 3, '#ffb1a1', 'CCC', 'medium')
scene.addObject(node1)
scene.addObject(node2)
scene.addObject(node3)

node1.move(400, 400, 2000)
node2.move(400, 400, 1000)
node3.move(400, 400, 700)

const snode1 = new Node(0, 0, 4, 3, '#ffb1a1', 'HHH', 'medium')
const snode2 = new Node(0, 0, 4, 3, '#ffb1a1', 'JJJ', 'medium')
const snode3 = new Node(0, 0, 4, 3, '#ffb1a1', 'TTT', 'medium')
scene1.addObject(snode1)
scene1.addObject(snode2)
scene1.addObject(snode3)

snode1.move(400, 400, 2000)
snode2.move(400, 400, 1000)
snode3.move(400, 400, 700)
