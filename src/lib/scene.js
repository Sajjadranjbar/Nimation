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
	}
	removeObject(object) {
		const index = this.objects.findIndex(search => search.id === object.id)
		if (index !== -1) {
			this.objects.splice(index, -1)
		}
		this.element.removeChild(object.getElement())
	}
}

export default Scene
