type Subscription<S> = (state: S) => void

export abstract class Presenter<S> {
    private internalState: S
    private listeners: Subscription<S>[] = []

    constructor(initalState: S) {
        this.internalState = initalState
    }

    public get state(): S {
        return this.internalState
    }

    protected changeState(state: S): void {
        this.internalState = state

        if (this.listeners.length > 0) {
            this.listeners.forEach((listener) =>
                this.notifyStateChange(listener)
            )
        }
    }

    protected notifyStateChange(listener: Subscription<S>) {
        listener(this.state)
    }

    public subscribe(listener: Subscription<S>): void {
        this.listeners.push(listener)
        this.notifyStateChange(listener)
    }

    public unsubscribe(listener: Subscription<S>): void {
        const index = this.listeners.indexOf(listener)
        if (index > -1) {
            this.listeners.splice(index, 1)
        }
    }
}
