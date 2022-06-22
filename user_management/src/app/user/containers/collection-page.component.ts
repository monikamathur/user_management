import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CollectionPageActions } from '../actions';
import { User } from '../models';
import * as fromUsers from '../reducers';

@Component({
  selector: 'bc-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>My Collection</mat-card-title>
    </mat-card>

    <user-preview-list [user]="(user$ | async)!"></user-preview-list>
  `,
  /**
   * Container components are permitted to have just enough styles
   * to bring the view together. If the number of styles grow,
   * consider breaking them out into presentational
   * components.
   */
  styles: [
    `
      mat-card-title {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class CollectionPageComponent implements OnInit {
  user$: Observable<User[]>;

  constructor(private store: Store) {
    this.user$ = store.select(fromUsers.selectUserCollection);
  }

  ngOnInit() {
    this.store.dispatch(CollectionPageActions.enter());
  }
}
