import Profile from '../../core/Profile'
export type ProgressListener = (progress: number) => void
export interface ProfileService {
    find(
        username: string,
        progressListener?: ProgressListener
    ): Promise<Profile>
}
