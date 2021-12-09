import axios from 'axios'
import Profile from '../../core/Profile'
import { ProfileService, ProgressListener } from './Profile.service'

export default class GitHubProfiles implements ProfileService {
    async find(
        username: string,
        notifyProgress?: ProgressListener
    ): Promise<Profile | undefined> {
        notifyProgress(0)

        const userData = await this.getUserData(username)
        if (!userData) {
            return undefined
        }

        const steps = 3 + userData.public_repos
        const stepSize = 100 / steps
        let progress = 0
        notifyProgress(Math.floor(++progress * stepSize))

        const repos = await this.getRepos(username)
        notifyProgress(Math.floor(++progress * stepSize))

        let stars = await this.getStarsCount(username)
        notifyProgress(Math.floor(++progress * stepSize))

        const repositoryPercent = 70 / repos.length
        let userLanguages: Record<string, number> = {}

        for (const repo of repos) {
            const repoLanguages = await this.getLanguages(repo)
            userLanguages = this.mergeLanguagesData(
                userLanguages,
                repoLanguages
            )
            notifyProgress(Math.floor(++progress * stepSize))
            await new Promise((resolve) => setTimeout(resolve, 0))
        }

        return this.buildProfile(
            userData,
            stars,
            this.convertLanguagesToPercentage(userLanguages)
        )
    }

    protected mergeLanguagesData(languages1: any, languages2: any) {
        const result = { ...languages1 }
        for (const key in languages2) {
            if (result.hasOwnProperty(key)) {
                result[key] += languages2[key]
            } else {
                result[key] = languages2[key]
            }
        }
        return result
    }

    protected convertLanguagesToPercentage(
        languages: Record<string, number>
    ): Record<string, number> {
        if (!Object.keys(languages).length) return languages

        const total = Object.values(languages).reduce(
            (e1: number, e2: number) => e1 + e2
        )

        const result: Record<string, number> = {}

        for (const key in languages) {
            result[key] = Math.floor((languages[key] / total) * 100)
        }

        return result
    }

    protected async getStarsCount(username: string) {
        const starred = await this.getStarred(username)
        return starred.length
    }

    protected async getUserData(username: string) {
        return this.getData(`https://api.github.com/users/${username}`)
    }

    protected async getRepos(username: string) {
        return this.getData(`https://api.github.com/users/${username}/repos`)
    }

    protected async getStarred(username: string) {
        return this.getData(`https://api.github.com/users/${username}/starred`)
    }

    protected async getLanguages(repositoryData: any) {
        return this.getData(repositoryData.languages_url)
    }

    protected async getData(url: string) {
        try {
            const result = await axios.get(url)
            return result.data
        } catch (error) {
            if (error.response.status == 404) {
                throw Error('Profile not found.')
            }

            if (error.response.status == 403) {
                throw Error('Github API rate limit exceeded.')
            }

            throw error
        }
    }

    buildProfile(
        userData: any,
        stars: number,
        languages: Record<string, number>
    ): Profile {
        return {
            name: userData.name,
            picture: userData.avatar_url,
            followers: userData.followers,
            stars,
            languages,
            notes: userData.bio,
        }
    }
}
