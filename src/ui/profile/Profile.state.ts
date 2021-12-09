import Profile from '../../core/Profile'

export interface ProfileState {
    username: string
    profile?: Profile
    progress: number
    displayInput: boolean
    displayProgressBar: boolean
    displayProfile: boolean
    errorMessage?: string
}

export const initialState: ProfileState = {
    username: '',
    profile: undefined,
    progress: 0,
    displayInput: true,
    displayProgressBar: false,
    displayProfile: false,
}
