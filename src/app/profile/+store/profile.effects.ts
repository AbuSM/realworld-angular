import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    onToggleFollow,
    onToggleFollowSuccess,
    onToggleFollowFailure,
} from './profile.actions';
import { exhaustMap, map, catchError } from 'rxjs';
import { ProfileService } from '../../services';

@Injectable()
export class ProfileEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private profileService: ProfileService
    ) {}

    onFollow$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(onToggleFollow),
            exhaustMap((action) => {
                if (action.follow) {
                    return this.profileService.unfollow(action.username).pipe(
                        map(({ profile }) => onToggleFollowSuccess(profile)),
                        catchError((err) => onToggleFollowFailure(err))
                    );
                } else {
                    return this.profileService.follow(action.username).pipe(
                        map(({ profile }) => onToggleFollowSuccess(profile)),
                        catchError((err) => onToggleFollowFailure(err))
                    );
                }
            })
        );
    });
}
