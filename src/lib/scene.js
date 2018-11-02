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
	updateMessage(packet, own, loop) {
		this.objects.forEach(object => {
			if (object.getType() == 'node' && own.id !== object.id)
				object.recv(packet, loop)
		})
	}
	updateUnicastMessage(packet, loop) {
		const index = this.objects.findIndex(search => {
			return search.id === packet.receivers.id && search.getType() === 'node'
		})
		if (index != -1) {
			this.objects[index].recv(packet, loop)
		}
	}
	updateMulticastMessage(packet, loop) {
		packet.receivers.forEach(receiver => {
			const index = this.objects.findIndex(search => {
				return search.id === receiver.id && search.getType() === 'node'
			})
			if (index != -1) {
				this.objects[index].recv(packet, loop)
			}
		})
	}
	updateEnergyMessage(energy, loop) {
		this.objects.forEach(object => {
			if (object.elements['battery'] !== undefined) object.harvest(energy)
		})
	}
}

export default Scene
