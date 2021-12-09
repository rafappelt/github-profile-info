import Component from '../common/Component'
import * as html from './ProgressBar.html'
import './ProgressBar.scss'
export default class ProgressBar extends Component {
    constructor() {
        super()
    }

    connectedCallback() {
        this.innerHTML = html.default
    }
}
