import Component from '../common/Component'
import * as html from './UsernameInput.html'
import './UsernameInput.scss'
export default class UsernameInput extends Component {
    constructor() {
        super()
    }

    connectedCallback() {
        this.init()
    }

    init() {
        this.innerHTML = html.default
        this.attachInputListener()
        this.attachKeyupListener()
    }

    attachInputListener() {
        this.input.addEventListener('input', this.handleInput.bind(this))
    }

    attachKeyupListener() {
        this.input.addEventListener('keyup', this.handleKeyup.bind(this))
    }

    handleInput(event: InputEvent): void {
        this.dispatchEvent(
            new CustomEvent('username-change', { detail: this.input.value })
        )
    }

    handleKeyup(event: KeyboardEvent) {
        if (event.key == 'Enter') {
            this.dispatchEvent(
                new CustomEvent('enter', { detail: this.input.value })
            )
        }
    }

    get input(): HTMLInputElement {
        return this.querySelector('input')
    }
}
