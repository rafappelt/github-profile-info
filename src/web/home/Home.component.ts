import GitHubProfiles from '../../ui/profile/GithubProfiles.adapter'
import ProfilePresenter from '../../ui/profile/Profile.presenter'
import { ProfileState } from '../../ui/profile/Profile.state'
import Component from '../common/Component'
import * as html from './Home.html'
import './Home.scss'
export default class Home extends Component {
    protected presenter = new ProfilePresenter(new GitHubProfiles())

    constructor() {
        super()
    }

    connectedCallback() {
        this.init()
    }

    protected init() {
        this.innerHTML = html.default
        this.attachInputListener()
        this.attachEndOfInputListener()
        this.presenter.subscribe(this.handleStateChange.bind(this))
    }

    handleStateChange(state: ProfileState) {
        this.usernameInput.style.display = state.displayInput ? '' : 'none'
        this.progress.style.display = state.displayProgressBar ? '' : 'none'
        this.userProfile.style.display = state.displayProfile ? '' : 'none'
        this.progress.value = state.progress
        if (state.profile) {
            this.userProfile.setAttribute('data-name', state.profile.name)
            this.userProfile.setAttribute('data-picture', state.profile.picture)
            this.userProfile.setAttribute(
                'data-followers',
                state.profile.followers.toString()
            )
            this.userProfile.setAttribute(
                'data-stars',
                state.profile.stars.toString()
            )
            this.userProfile.setAttribute(
                'data-languages',
                JSON.stringify(state.profile.languages)
            )
            this.userProfile.setAttribute('data-notes', state.profile.notes)
        }
        if (state.errorMessage) {
            this.errorMessage.innerHTML = state.errorMessage
            this.errorMessage.style.display = ''
        } else {
            this.errorMessage.style.display = 'none'
        }
    }

    protected attachInputListener() {
        this.usernameInput.addEventListener(
            'username-change',
            this.handleInputChange.bind(this)
        )
    }

    protected attachEndOfInputListener() {
        this.usernameInput.addEventListener(
            'enter',
            this.handleEndOfInput.bind(this)
        )
    }

    handleInputChange(event: CustomEvent): void {
        this.presenter.username = event.detail
    }

    handleEndOfInput(event: KeyboardEvent) {
        this.presenter.handleInputComplete()
    }

    get usernameInput(): HTMLElement {
        return this.querySelector('username-input')
    }

    get userProfile(): HTMLElement {
        return this.querySelector('user-profile')
    }

    get progress(): HTMLProgressElement {
        return this.querySelector('progress')
    }

    get errorMessage(): HTMLElement {
        return this.querySelector('.error-message')
    }
}
