import { LoggedUserEffects } from './loggedUser.effects';
import { NotificationEffects } from './notification.effects';
import { DirectMessageEffects } from './directMessages.effects';

export * from './loggedUser.effects';
export * from './notification.effects';
export * from './directMessages.effects';

export const effects: any[] = [
    LoggedUserEffects,
    NotificationEffects,
    DirectMessageEffects
]