import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BehaviorSubject } from 'rxjs';

import {
  UserAuthorsComponent,
  UserDetailComponent,
} from '@example-app/user/components';
import { SelectedUserPageComponent } from '@example-app/user/containers';
import { ViewUserPageComponent } from '@example-app/user/containers';
import { ViewUserPageActions } from '@example-app/user/actions';
import { AddCommasPipe } from '@example-app/shared/pipes/add-commas.pipe';
import { MaterialModule } from '@example-app/material';

describe('View User Page', () => {
  let fixture: ComponentFixture<ViewUserPageComponent>;
  let store: MockStore;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: new BehaviorSubject({}) },
        },
        provideMockStore(),
      ],
      declarations: [
        ViewUserPageComponent,
        SelectedUserPageComponent,
        UserDetailComponent,
        UserAuthorsComponent,
        AddCommasPipe,
      ],
    });

    fixture = TestBed.createComponent(ViewUserPageComponent);
    store = TestBed.inject(MockStore);
    route = TestBed.inject(ActivatedRoute);

    jest.spyOn(store, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a user.Select action on init', () => {
    const action = ViewUserPageActions.selectUser({ id: '2' });

    (route.params as BehaviorSubject<any>).next({ id: '2' });

    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });
});
