class Header {
	constructor(type) {
		this.type = type
		this.params = []
	}
	addParam(paramObject) {
		const index = this.params.findIndex(
			search => search.param === paramObject.param
		)
		if (index !== -1) {
			this.params.splice(index, 1)
			this.params.push(paramObject)
		} else {
			this.params.push(paramObject)
		}
	}
	removeParam(param) {
		const index = this.params.findIndex(search => search.param === param)
		if (index !== -1) {
			return this.params.splice(index, 1)[0].value
		} else {
			return null
		}
	}
	getParam(param) {
		const index = this.params.findIndex(search => search.param === param)
		if (index !== -1) {
			return this.params[index].value
		} else {
			return null
		}
	}
}

export default Header
