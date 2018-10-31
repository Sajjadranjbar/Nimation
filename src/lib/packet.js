class Packet {
	constructor(payload) {
		this.payload = payload
		this.headers = []
	}
	addHeader(header) {
		const index = this.headers.findIndex(search => search.type === header.type)
		if (index !== -1) {
			this.headers.splice(index, 1)
			this.headers.push(header)
		} else {
			this.headers.push(header)
		}
	}
	removeHeader(headerType) {
		const index = this.headers.findIndex(search => search.type === headerType)
		if (index !== -1) {
			return this.headers.splice(index, 1)[0]
		} else {
			return null
		}
	}
	getHeader(headerType) {
		const index = this.headers.findIndex(search => search.type === headerType)
		if (index !== -1) {
			return this.headers[index]
		} else {
			return null
		}
	}
	getPayload() {
		return this.payload
	}
	setPayload(payload) {
		this.payload = payload
	}
}

export default Packet
