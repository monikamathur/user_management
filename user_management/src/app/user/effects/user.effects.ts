import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { User } from '../models';
import {
  UsersApiActions,
  FindUserPageActions,
} from '../actions';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class UserEffects {
  // search$ = createEffect(
  //   () =>
  //     ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
  //       this.actions$.pipe(
  //         ofType(FindUserPageActions.searchUsers),
  //         debounceTime(debounce, scheduler),
  //         switchMap(({ query }) => {
  //           if (query === '') {
  //             return empty;
  //           }

  //           const nextSearch$ = this.actions$.pipe(
  //             ofType(FindUserPageActions.searchUsers),
  //             skip(1)
  //           );

  //           return this.googleUsers.searchUsers(query).pipe(
  //             takeUntil(nextSearch$),
  //             map((user: User[]) => UsersApiActions.searchSuccess({ user })),
  //             catchError((err) =>
  //               of(UsersApiActions.searchFailure({ errorMsg: err.message }))
  //             )
  //           );
  //         })
  //       )
  // );

  constructor(
    private actions$: Actions,
  ) {}
}
