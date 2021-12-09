import Profile from '../../core/Profile'
import { Presenter } from '../common/Presenter'
import { ProfileService } from './Profile.service'
import { initialState, ProfileState } from './Profile.state'

export default class ProfilePresenter extends Presenter<ProfileState> {
    constructor(protected profileService: ProfileService) {
        super(initialState)
    }

    public set username(username: string) {
        this.changeState({
            ...this.state,
            username,
        })
    }

    handleInputComplete() {
        this.loadProfile()
    }

    protected async loadProfile() {
        this.displayProgressBar()
        try {
            const profile = await this.profileService.find(
                this.state.username,
                this.handleProgress.bind(this)
            )

            if (!profile) {
                throw Error('Profile not found.')
            }

            this.displayProfile(profile)
        } catch (err) {
            this.displayError(err.message)
        }
    }

    protected async displayError(message: string) {
        this.changeState({
            ...this.state,
            displayProgressBar: false,
            displayInput: false,
            displayProfile: false,
            errorMessage: message,
        })
    }

    protected async displayProgressBar() {
        this.changeState({
            ...this.state,
            progress: 0,
            displayProgressBar: true,
            displayInput: false,
        })
    }

    protected async displayProfile(profile: Profile) {
        this.changeState({
            ...this.state,
            profile,
            displayProfile: true,
            displayInput: false,
            displayProgressBar: false,
        })
    }

    protected handleProgress(progress: number) {
        this.changeState({
            ...this.state,
            progress,
        })
    }
}
