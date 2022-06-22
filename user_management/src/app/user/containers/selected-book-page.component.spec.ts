import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SelectedUserPageActions } from '@example-app/user/actions';
import {
  UserAuthorsComponent,
  UserDetailComponent,
} from '@example-app/user/components';
import { SelectedUserPageComponent } from '@example-app/user/containers';
import { User, generateMockUser } from '@example-app/user/models';
import { AddCommasPipe } from '@example-app/shared/pipes/add-commas.pipe';
import { MaterialModule } from '@example-app/material';

describe('Selected User Page', () => {
  let fixture: ComponentFixture<SelectedUserPageComponent>;
  let store: MockStore;
  let instance: SelectedUserPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule],
      declarations: [
        SelectedUserPageComponent,
        UserDetailComponent,
        UserAuthorsComponent,
        AddCommasPipe,
      ],
      providers: [provideMockStore()],
    });

    fixture = TestBed.createComponent(SelectedUserPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    jest.spyOn(store, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a collection.AddUser action when addToCollection is called', () => {
    const $event: User = generateMockUser();
    const action = SelectedUserPageActions.addUser({ user: $event });

    instance.addToCollection($event);

    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });

  it('should dispatch a collection.RemoveUser action on removeFromCollection', () => {
    const $event: User = generateMockUser();
    const action = SelectedUserPageActions.removeUser({ user: $event });

    instance.removeFromCollection($event);

    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });
});
