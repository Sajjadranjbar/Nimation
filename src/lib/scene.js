import anime from 'animejs'

class Scene {
	constructor(elementId) {
		this.timeline = anime.timeline()
		this.element = document.getElementById(elementId)
	}
	addObject(object) {
		this.element.appendChild(object.getElement())
		object.setScene(this)
	}
	addAnimation(object) {
		this.timeline.add(object)
	}
}

export default Scene
