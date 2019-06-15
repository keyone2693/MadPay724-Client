import { trigger, transition, query, style, animate } from '@angular/animations';


export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
        query(':enter',
        [style({opacity: 0, filter: 'blur(0)' })],
        {optional: true}),

        query(':leave',
        [style({ opacity: 1, filter: 'blur(5px)' }), animate('0.5s', style({  opacity: 0, filter: 'blur(0)' }))],
        {optional: true}),

        query(':enter',
        [style({ opacity: 0, filter: 'blur(0)' }), animate('0.5s', style({ opacity: 1, filter: 'blur(5px)' }))],
        {optional: true})
    ])
]);
