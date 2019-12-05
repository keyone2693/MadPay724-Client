import { LoggedUserEffects } from './loggedUser.effects';
import { NotificationEffects } from './notification.effects';

export * from './loggedUser.effects';
export * from './notification.effects';

export const effects: any[] = [
    LoggedUserEffects,
    NotificationEffects
]