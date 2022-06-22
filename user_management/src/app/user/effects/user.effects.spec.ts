import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
// import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import {
  UsersApiActions,
  FindUserPageActions,
} from '../actions';
import { UserEffects } from '../effects';
import { User } from '../models';

describe('UserEffects', () => {
  let effects: UserEffects;
  let googleUsersService: any;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        {
          // useValue: { searchUsers: jest.fn() },
        },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(UserEffects);
    // googleUsersService = TestBed.inject(GoogleUsersService);
    actions$ = TestBed.inject(Actions);
  });

  describe('search$', () => {
    it('should return a user.SearchComplete, with the user, on success, after the de-bounce', () => {
      const user1 = { id: '111', volumeInfo: {} } as User;
      const user2 = { id: '222', volumeInfo: {} } as User;
      const user = [user1, user2];
      const action = FindUserPageActions.searchUsers({ query: 'query' });
      const completion = UsersApiActions.searchSuccess({ user });

      // actions$ = hot('-a---', { a: action });
      // const response = cold('-a|', { a: user });
      // const expected = cold('-----b', { b: completion });
      // googleUsersService.searchUsers = jest.fn(() => response);

      // expect(
      //   effects.search$({
      //     debounce: 30,
      //     scheduler: getTestScheduler(),
      //   })
      // ).toBeObservable(expected);
    });

    it('should return a user.SearchError if the user service throws', () => {
      const action = FindUserPageActions.searchUsers({ query: 'query' });
      const completion = UsersApiActions.searchFailure({
        errorMsg: 'Unexpected Error. Try again later.',
      });
      const error = { message: 'Unexpected Error. Try again later.' };

      // actions$ = hot('-a---', { a: action });
      // const response = cold('-#|', {}, error);
      // const expected = cold('-----b', { b: completion });
      // googleUsersService.searchUsers = jest.fn(() => response);

      // expect(
      //   effects.search$({
      //     debounce: 30,
      //     scheduler: getTestScheduler(),
      //   })
      // ).toBeObservable(expected);
    });

    it(`should not do anything if the query is an empty string`, () => {
      const action = FindUserPageActions.searchUsers({ query: '' });

      // actions$ = hot('-a---', { a: action });
      // const expected = cold('---');

      // expect(
      //   effects.search$({
      //     debounce: 30,
      //     scheduler: getTestScheduler(),
      //   })
      // ).toBeObservable(expected);
    });
  });
});
