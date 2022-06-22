import { Action, createAction, props } from '@ngrx/store';

export enum AuthActionTypes {
  Login = '[Login Page] Login',
  LoginComplete = '[Login Page] Login Complete',
  LoginSuccess = '[Auth API] Login Success',
  LoginFailure = '[Auth API] Login Failure',
  CheckLogin = '[Auth] Check Login',
  Logout = '[Auth] Confirm Logout',
  LogoutCancelled = '[Auth] Logout Cancelled',
  LogoutConfirmed = '[Auth] Logout Confirmed'
}

// export class Login implements Action {
//   readonly type = AuthActionTypes.Login;
//   constructor(public payload: any) { }
// }

export const login = createAction(
  AuthActionTypes.Login,
  props<{ credentials: any }>()
);

export const loginComplete = createAction(
  AuthActionTypes.LoginComplete);



// export class LoginComplete implements Action {
//   readonly type = AuthActionTypes.LoginComplete;
// }

export const loginSuccess = createAction(
  AuthActionTypes.LoginSuccess
);

// export class LoginSuccess implements Action {
//   readonly type = AuthActionTypes.LoginSuccess;
// }

export const loginFailure = createAction(
  AuthActionTypes.LoginFailure,
  props<{ error: any }>()

);

// export class LoginFailure implements Action {
//   readonly type = AuthActionTypes.LoginFailure;

//   constructor(public payload: any) { }
// }

export const checkLogin = createAction(
  AuthActionTypes.CheckLogin
);

// export class CheckLogin implements Action {
//   readonly type = AuthActionTypes.CheckLogin;
// }

export const logout = createAction(
  AuthActionTypes.Logout
);

// export class Logout implements Action {
//   readonly type = AuthActionTypes.Logout;
// }

export const logoutConfirmed = createAction(
  AuthActionTypes.LogoutConfirmed
);

// export class LogoutConfirmed implements Action {
//   readonly type = AuthActionTypes.LogoutConfirmed;
// }

export const logoutCancelled = createAction(
  AuthActionTypes.LogoutCancelled
);

// export class LogoutCancelled implements Action {
//   readonly type = AuthActionTypes.LogoutCancelled;
// }

