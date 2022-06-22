import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CollectionPageActions } from '../actions';
import {
  UserPreviewComponent,
  UserPreviewListComponent,
} from '../components';
import { CollectionPageComponent } from '../containers';
import * as fromUsers from '../reducers';
import { AngularMaterialModule } from '../../angular-material.module';

describe('Collection Page', () => {
  let fixture: ComponentFixture<CollectionPageComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, AngularMaterialModule, RouterTestingModule],
      declarations: [
        CollectionPageComponent,
        UserPreviewListComponent,
        UserPreviewComponent,
      ],
      providers: [
        provideMockStore({
          selectors: [{ selector: fromUsers.selectUserCollection, value: [] }],
        }),
      ],
    });

    fixture = TestBed.createComponent(CollectionPageComponent);
    store = TestBed.inject(MockStore);

    // jest.spyOn(store, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();

    // expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a collection.Load on init', () => {
    const action = CollectionPageActions.enter();

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
