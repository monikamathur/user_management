import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import {
  CollectionApiActions,
  CollectionPageActions,
  SelectedUserPageActions,
} from '../actions';
import { User } from '../models';
// import { UserStorageService } from '@example-app/core/services';

@Injectable()
export class CollectionEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the supported call in `defer` makes
   * effect easier to test.
   */
  // checkStorageSupport$ = createEffect(
  //   () => defer(() => this.storageService.supported()),
  //   { dispatch: false }
  // );

  // loadCollection$ = createEffect(() =>
    // this.actions$.pipe(
    //   ofType(CollectionPageActions.enter),
    //   switchMap(() =>
    //     this.storageService.getCollection().pipe(
    //       map((user: User[]) =>
    //         CollectionApiActions.loadUsersSuccess({ user })
    //       ),
    //       catchError((error) =>
    //         of(CollectionApiActions.loadUsersFailure({ error }))
    //       )
    //     )
    //   )
    // )
  //   {
  //     CollectionApiActions.loadUsersSuccess({user : []})
  //   }
  // );

  // addUserToCollection$ = createEffect(() =>
    // this.actions$.pipe(
    //   ofType(SelectedUserPageActions.addUser),
    //   mergeMap(({ user }) =>
    //     this.storageService.addToCollection([user]).pipe(
    //       map(() => CollectionApiActions.addUserSuccess({ user })),
    //       catchError(() => of(CollectionApiActions.addUserFailure({ user })))
    //     )
    //   )
    // )
  //   {
  //     let user : User 
  //     CollectionApiActions.addUserFailure({user})}
  // );

  // removeUserFromCollection$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(SelectedUserPageActions.removeUser),
  //     mergeMap(({ user }) =>
  //       this.storageService.removeFromCollection([user.id]).pipe(
  //         map(() => CollectionApiActions.removeUserSuccess({ user })),
  //         catchError(() => of(CollectionApiActions.removeUserFailure({ user })))
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    // private storageService: UserStorageService
  ) {}
}
