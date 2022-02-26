import { types } from "../types/types";
import { authReducer } from "./authReducer";

describe('AuthReducer tests', () => { 

  const defaultState = { logged: false };
  const defaultAction = {};

  test('should return default auth state', () => { 
    const state = authReducer( defaultState, defaultAction);
    expect(state).toEqual( defaultState );
  });

  test('should should identify username', () => { 
    const userName = 'Daniel Ramírez';
    const loginAction = { type: types.login, payload: { name: userName } };
    const state = authReducer( defaultState, loginAction );
    expect(state).toEqual( { logged: true, name: userName} );
  });

  test('should return state of logout', () => {
    const logoutAction = { type: types.logout };
    const state = authReducer( defaultState, logoutAction );
    expect(state).toEqual( { logged: false } );
  });
 
}); 