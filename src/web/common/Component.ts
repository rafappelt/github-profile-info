export default class Component extends HTMLElement {
    constructor() {
        super()
        this.classList.add(this.className)
    }

    get className() {
        return this.tagName.toLowerCase()
    }
}
