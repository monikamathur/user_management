import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { FindUserPageActions } from '@example-app/user/actions';
import {
  UserAuthorsComponent,
  UserPreviewComponent,
  UserPreviewListComponent,
  UserSearchComponent,
} from '@example-app/user/components';
import { FindUserPageComponent } from '@example-app/user/containers';
import * as fromUsers from '@example-app/user/reducers';
import { AddCommasPipe } from '@example-app/shared/pipes/add-commas.pipe';
import { EllipsisPipe } from '@example-app/shared/pipes/ellipsis.pipe';
import { MaterialModule } from '@example-app/material';

describe('Find User Page', () => {
  let fixture: ComponentFixture<FindUserPageComponent>;
  let store: MockStore;
  let instance: FindUserPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MaterialModule,
        ReactiveFormsModule,
      ],
      declarations: [
        FindUserPageComponent,
        UserSearchComponent,
        UserPreviewComponent,
        UserPreviewListComponent,
        UserAuthorsComponent,
        AddCommasPipe,
        EllipsisPipe,
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: fromUsers.selectSearchQuery, value: '' },
            { selector: fromUsers.selectSearchResults, value: [] },
            { selector: fromUsers.selectSearchLoading, value: false },
            { selector: fromUsers.selectSearchError, value: '' },
          ],
        }),
      ],
    });

    fixture = TestBed.createComponent(FindUserPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    jest.spyOn(store, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a user.Search action on search', () => {
    const $event = 'user name';
    const action = FindUserPageActions.searchUsers({ query: $event });

    instance.search($event);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
