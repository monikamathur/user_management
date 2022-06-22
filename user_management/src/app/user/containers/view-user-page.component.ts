import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ViewUserPageActions } from '../actions';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View User Page's responsibility is to map router params
 * to a 'Select' user action. Actually showing the selected
 * user remains a responsibility of the
 * SelectedUserPageComponent
 */
@Component({
  selector: 'view-user-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <selected-user-page></selected-user-page> `,
})
export class ViewUserPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map((params) => ViewUserPageActions.selectUser({ id: params.id })))
      .subscribe((action) => store.dispatch(action));
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
