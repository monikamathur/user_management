import { reducer } from '../reducers/user.reducer';
import * as fromUsers from '../reducers/user.reducer';
import {
  UsersApiActions,
  UserActions,
  ViewUserPageActions,
  CollectionApiActions,
} from '../actions';
import { User, generateMockUser } from '../models';

describe('UsersReducer', () => {
  const user1 = generateMockUser();
  const user2 = { ...user1, id: '222' };
  const user3 = { ...user1, id: '333' };
  const initialState: fromUsers.State = {
    ids: [user1.id, user2.id],
    entities: {
      [user1.id]: user1,
      [user2.id]: user2,
    },
    selectedUserId: null,
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      // expect(result).toMatchSnapshot();
    });
  });

  describe('SEARCH_COMPLETE & LOAD_SUCCESS', () => {
    type UsersActions =
      | typeof UsersApiActions.searchSuccess
      | typeof CollectionApiActions.loadUsersSuccess;
    function noExistingUsers(
      action: UsersActions,
      usersInitialState: any,
      user: User[]
    ) {
      const createAction = action({ user });

      const result = reducer(usersInitialState, createAction);

      // expect(result).toMatchSnapshot();
    }

    function existingUsers(
      action: UsersActions,
      usersInitialState: any,
      user: User[]
    ) {
      // should not replace existing user
      const differentUser2 = { ...user[0], foo: 'bar' };
      const createAction = action({ user: [user[1], differentUser2] });

      const result = reducer(usersInitialState, createAction);

      // expect(result).toMatchSnapshot();
    }

    it('should add all user in the payload when none exist', () => {
      noExistingUsers(UsersApiActions.searchSuccess, initialState, [
        user1,
        user2,
      ]);

      noExistingUsers(CollectionApiActions.loadUsersSuccess, initialState, [
        user1,
        user2,
      ]);
    });

    it('should add only user when user already exist', () => {
      existingUsers(UsersApiActions.searchSuccess, initialState, [
        user2,
        user3,
      ]);

      existingUsers(CollectionApiActions.loadUsersSuccess, initialState, [
        user2,
        user3,
      ]);
    });
  });

  describe('LOAD', () => {
    const expectedResult = {
      ids: [user1.id],
      entities: {
        [user1.id]: user1,
      },
      selectedUserId: null,
    };

    it('should add a single user, if the user does not exist', () => {
      const action = UserActions.loadUser({ user: user1 });

      const result = reducer(fromUsers.initialState, action);

      // expect(result).toMatchSnapshot();
    });

    it('should return the existing state if the user exists', () => {
      const action = UserActions.loadUser({ user: user1 });

      const result = reducer(expectedResult, action);

      // expect(result).toMatchSnapshot();
    });
  });

  describe('SELECT', () => {
    it('should set the selected user id on the state', () => {
      const action = ViewUserPageActions.selectUser({ id: user1.id });

      const result = reducer(initialState, action);

      // expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('selectId', () => {
      it('should return the selected id', () => {
        const result = fromUsers.selectId({
          ...initialState,
          selectedUserId: user1.id,
        });

        // expect(result).toMatchSnapshot();
      });
    });
  });
});
