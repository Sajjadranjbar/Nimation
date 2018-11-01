import anime from 'animejs'

class Scene {
	constructor(elementId) {
		this.timeline = anime.timeline()
		this.element = document.getElementById(elementId)
		this.objects = []
		this.packets = []
	}
	addObject(object) {
		this.element.appendChild(object.getNode())
		this.objects.push(object)
		object.setScene(this)
	}
	removeObject(object) {
		const index = this.objects.findIndex(search => search.id === object.id)
		if (index !== -1) {
			this.objects.splice(index, 1)
		}
		this.element.removeChild(object.getNode())
	}
	updateMessage(packet, object, ownNode) {
		this.objects.forEach(objectInList => {
			if (
				ownNode !== objectInList &&
				objectInList.getType() === 'node' &&
				objectInList.getX() > object.getX() &&
				objectInList.getX() < object.getX() + object.getWidth() &&
				(objectInList.getY() > object.getY() &&
					objectInList.getY() < object.getY() + object.getHeight())
			) {
				objectInList.recv(packet)
			}
		})
	}
	updateUnicastMessage(packet, object, ownNode) {
		this.objects.forEach(objectInList => {
			if (
				ownNode !== objectInList &&
				packet.receiver.id === objectInList.id &&
				objectInList.getType() === 'node' &&
				(objectInList.getX() > object.getX() &&
					objectInList.getX() < object.getX() + object.getWidth()) &&
				(objectInList.getY() > object.getY() &&
					objectInList.getY() < object.getY() + object.getHeight())
			) {
				objectInList.recv(packet)
			}
		})
	}
	updateEnergyMessage(energy, object, ownNode) {
		this.objects.forEach(objectInList => {
			if (
				ownNode !== objectInList &&
				objectInList.elements['battery'] !== undefined &&
				objectInList.getType() === 'node' &&
				(objectInList.getX() > object.getX() &&
					objectInList.getX() < object.getX() + object.getWidth()) &&
				(objectInList.getY() > object.getY() &&
					objectInList.getY() < object.getY() + object.getHeight())
			) {
				objectInList.harvest(energy)
			}
		})
	}
}

export default Scene
