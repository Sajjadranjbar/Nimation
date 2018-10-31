import anime from 'animejs'

class Scene {
	constructor(elementId) {
		this.timeline = anime.timeline()
		this.element = document.getElementById(elementId)
		this.objects = []
		this.packets = []
	}
	addObject(object) {
		this.element.appendChild(object.getElement())
		this.objects.push(object)
		object.setScene(this)
		console.log(object)
	}
	removeObject(object) {
		const index = this.objects.findIndex(search => search.id === object.id)
		if (index !== -1) {
			this.objects.splice(index, -1)
		}
		this.element.removeChild(object.getElement())
	}
	updateMessage(packet, object, ownNode) {
		this.objects.forEach(objectInList => {
			if (
				ownNode !== objectInList &&
				objectInList.getX() > object.getX() &&
				objectInList.getX() < object.getX() + object.getWidth() &&
				(objectInList.getY() > object.getY() &&
					objectInList.getY() < object.getY() + object.getHeight())
			) {
				objectInList.recv(packet)
			}
		})
	}
}

export default Scene
