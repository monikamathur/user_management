import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { FindUserPageActions } from '../actions';
import { User } from '../models';
import * as fromUsers from '../reducers';

@Component({
  selector: 'bc-find-user-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <user-search
      [query]="(searchQuery$ | async)!"
      [searching]="(loading$ | async)!"
      [error]="(error$ | async)!"
      (search)="search($event)"
    >
    </user-search>
    <user-preview-list [user]="(user$ | async)!"> </user-preview-list>
  `,
})
export class FindUserPageComponent {
  searchQuery$: Observable<string>;
  user$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store) {
    this.searchQuery$ = store.select(fromUsers.selectSearchQuery).pipe(take(1));
    this.user$ = store.select(fromUsers.selectSearchResults);
    this.loading$ = store.select(fromUsers.selectSearchLoading);
    this.error$ = store.select(fromUsers.selectSearchError);
  }

  search(query: string) {
    this.store.dispatch(FindUserPageActions.searchUsers({ query }));
  }
}
