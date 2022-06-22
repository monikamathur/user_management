import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SelectedUserPageActions } from '../actions';
import { User } from '../models';
import * as fromUsers from '../reducers';

@Component({
  selector: 'selected-user-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <user-detail
      [user]="(user$ | async)!"
      [inCollection]="(isSelectedUserInCollection$ | async)!"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)"
    >
    </user-detail>
  `,
})
export class SelectedUserPageComponent {
  user$: Observable<User>;
  isSelectedUserInCollection$: Observable<boolean>;

  constructor(private store: Store) {
    this.user$ = store.select(fromUsers.selectSelectedUser) as Observable<User>;
    this.isSelectedUserInCollection$ = store.select(
      fromUsers.isSelectedUserInCollection
    );
  }

  addToCollection(user: User) {
    this.store.dispatch(SelectedUserPageActions.addUser({ user }));
  }

  removeFromCollection(user: User) {
    this.store.dispatch(SelectedUserPageActions.removeUser({ user }));
  }
}
