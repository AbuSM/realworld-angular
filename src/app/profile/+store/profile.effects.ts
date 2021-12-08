import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    onToggleFollow,
    onToggleFollowSuccess,
    onToggleFollowFailure,
    fetchProfile,
    fetchProfileSuccess,
    fetchProfileFailure,
} from './profile.actions';
import { exhaustMap, map, catchError, iif } from 'rxjs';
import { ProfileService } from '../../services';
import { ProfileModel } from '../../models';

@Injectable()
export class ProfileEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private profileService: ProfileService
    ) {}

    fetchProfile$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fetchProfile),
            exhaustMap((action) => {
                return this.profileService.get(action.username);
            }),
            map(({ profile }: { profile: ProfileModel }) =>
                fetchProfileSuccess(profile)
            ),
            catchError((err) => fetchProfileFailure(err))
        );
    });

    onFollow$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(onToggleFollow),
            exhaustMap((action) =>
                iif(
                    () => action.following,
                    this.profileService.unfollow(action.username).pipe(
                        map(({ profile }: { profile: ProfileModel }) =>
                            onToggleFollowSuccess(profile)
                        ),
                        catchError((err) => onToggleFollowFailure(err))
                    ),
                    this.profileService.follow(action.username).pipe(
                        map(({ profile }: { profile: ProfileModel }) =>
                            onToggleFollowSuccess(profile)
                        ),
                        catchError((err) => onToggleFollowFailure(err))
                    )
                )
            )
        );
    });
}
