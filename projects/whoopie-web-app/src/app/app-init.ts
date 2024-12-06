import { signal, WritableSignal } from "@angular/core";

export const appInit = () => {
    const appInitStatus: WritableSignal<'COMPLETE' | 'ERROR' | 'LOADING'> = signal('LOADING');

    setTimeout(() => {
        appInitStatus.set('COMPLETE');
    },2000)

    return appInitStatus.asReadonly()
}