import { TestBed } from '@angular/core/testing';

import {
  CollectionApiActions,
  CollectionPageActions,
  SelectedUserPageActions,
} from '@example-app/user/actions';
import { CollectionEffects } from '@example-app/user/effects';
import { User } from '@example-app/user/models';
import {
  UserStorageService,
  LOCAL_STORAGE_TOKEN,
} from '@example-app/core/services';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

describe('CollectionEffects', () => {
  let db: any;
  let effects: CollectionEffects;
  let actions$: Observable<any>;

  const user1 = { id: '111', volumeInfo: {} } as User;
  const user2 = { id: '222', volumeInfo: {} } as User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionEffects,
        {
          provide: UserStorageService,
          useValue: {
            supported: jest.fn(),
            deleteStoredCollection: jest.fn(),
            addToCollection: jest.fn(),
            getCollection: jest.fn(),
            removeFromCollection: jest.fn(),
          },
        },
        {
          provide: LOCAL_STORAGE_TOKEN,
          useValue: {
            removeItem: jest.fn(),
            setItem: jest.fn(),
            getItem: jest.fn((_) => JSON.stringify([])),
          },
        },
        provideMockActions(() => actions$),
      ],
    });

    db = TestBed.inject(UserStorageService);
    effects = TestBed.inject(CollectionEffects);
    actions$ = TestBed.inject(Actions);
  });
  describe('checkStorageSupport$', () => {
    it('should call db.checkStorageSupport when initially subscribed to', () => {
      effects.checkStorageSupport$.subscribe();
      expect(db.supported).toHaveBeenCalled();
    });
  });
  describe('loadCollection$', () => {
    it('should return a collection.LoadSuccess, with the user, on success', () => {
      const action = CollectionPageActions.enter();
      const completion = CollectionApiActions.loadUsersSuccess({
        user: [user1, user2],
      });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: [user1, user2] });
      const expected = cold('--c', { c: completion });
      db.getCollection = jest.fn(() => response);

      expect(effects.loadCollection$).toBeObservable(expected);
    });

    it('should return a collection.LoadFail, if the query throws', () => {
      const action = CollectionPageActions.enter();
      const error = 'Error!';
      const completion = CollectionApiActions.loadUsersFailure({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      db.getCollection = jest.fn(() => response);

      expect(effects.loadCollection$).toBeObservable(expected);
    });
  });

  describe('addUserToCollection$', () => {
    it('should return a collection.AddUserSuccess, with the user, on success', () => {
      const action = SelectedUserPageActions.addUser({ user: user1 });
      const completion = CollectionApiActions.addUserSuccess({ user: user1 });

      actions$ = hot('-a', { a: action });
      const response = cold('-b', { b: true });
      const expected = cold('--c', { c: completion });
      db.addToCollection = jest.fn(() => response);

      expect(effects.addUserToCollection$).toBeObservable(expected);
      expect(db.addToCollection).toHaveBeenCalledWith([user1]);
    });

    it('should return a collection.AddUserFail, with the user, when the db insert throws', () => {
      const action = SelectedUserPageActions.addUser({ user: user1 });
      const completion = CollectionApiActions.addUserFailure({ user: user1 });
      const error = 'Error!';

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      db.addToCollection = jest.fn(() => response);

      expect(effects.addUserToCollection$).toBeObservable(expected);
    });

    describe('removeUserFromCollection$', () => {
      it('should return a collection.RemoveUserSuccess, with the user, on success', () => {
        const action = SelectedUserPageActions.removeUser({ user: user1 });
        const completion = CollectionApiActions.removeUserSuccess({
          user: user1,
        });

        actions$ = hot('-a', { a: action });
        const response = cold('-b', { b: true });
        const expected = cold('--c', { c: completion });
        db.removeFromCollection = jest.fn(() => response);

        expect(effects.removeUserFromCollection$).toBeObservable(expected);
        expect(db.removeFromCollection).toHaveBeenCalledWith([user1.id]);
      });

      it('should return a collection.RemoveUserFail, with the user, when the db insert throws', () => {
        const action = SelectedUserPageActions.removeUser({ user: user1 });
        const completion = CollectionApiActions.removeUserFailure({
          user: user1,
        });
        const error = 'Error!';

        actions$ = hot('-a', { a: action });
        const response = cold('-#', {}, error);
        const expected = cold('--c', { c: completion });
        db.removeFromCollection = jest.fn(() => response);

        expect(effects.removeUserFromCollection$).toBeObservable(expected);
        expect(db.removeFromCollection).toHaveBeenCalledWith([user1.id]);
      });
    });
  });
});
