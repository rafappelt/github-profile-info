import Component from '../common/Component'
import * as html from './UserProfile.html'
import './UserProfile.scss'
export default class UserProfile extends Component {
    constructor() {
        super()
    }

    connectedCallback() {
        this.innerHTML = html.default
    }

    static get observedAttributes() {
        return [
            'data-picture',
            'data-name',
            'data-languages',
            'data-followers',
            'data-stars',
            'data-notes',
        ]
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        this.refresh()
    }

    refresh() {
        this.image.src = this.getAttribute('data-picture')
        this.name.innerText = this.getAttribute('data-name')
        this.followersCounter.innerText = this.getAttribute('data-followers')
        this.starsCounter.innerText = this.getAttribute('data-stars')
        const languagesPercentAttr = this.getAttribute('data-languages')

        if (languagesPercentAttr) {
            const languagesPercent = JSON.parse(languagesPercentAttr)
            this.languages.innerHTML = Object.keys(languagesPercent)
                .map((lang) => {
                    return `
                <tr>
                    <td>${lang}</td>
                    <td>${languagesPercent[lang]}%</td>
                </tr>
            `
                })
                .join('\n')
        }

        this.notesContent.innerText = this.getAttribute('data-notes')
    }

    get image(): HTMLImageElement {
        return this.querySelector('img')
    }

    get name(): HTMLImageElement {
        return this.querySelector('.name')
    }

    get languages(): HTMLTableElement {
        return this.querySelector('.languages')
    }

    get followersCounter(): HTMLTableElement {
        return this.querySelector('.followers__count')
    }

    get starsCounter(): HTMLTableElement {
        return this.querySelector('.stars__count')
    }

    get notesContent(): HTMLTableElement {
        return this.querySelector('.notes__content')
    }
}
