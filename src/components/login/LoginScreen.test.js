import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";
import { LoginScreen } from "./LoginScreen";

const mockNavigate = jest.fn();
jest.mock( 'react-router-dom', () => ({ 
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockNavigate 
}) );

describe('LoginScreen component tests', () => {

  const userName = 'Daniel Ramírez';
  const contextValue = { user: { name: userName, logged: true }, dispatch: jest.fn() };
  const wrapper = mount(
    <MemoryRouter initialEntries={ ['/login'] }>
      <AuthContext.Provider value={ contextValue }>
        <LoginScreen />
      </AuthContext.Provider>  
    </MemoryRouter>
  );
  // Storage.prototype.getItem = jest.fn();

  test('should show LoginScreen component', () => {
    expect( wrapper ).toMatchSnapshot();
  });

  test('should call loginAction in dispatch function and navigate function', () => {
    const lastPath = '/dc';
    localStorage.setItem('lastPath', lastPath);

    act(() => wrapper.find('button').prop('onClick')());

    const loginAction = { type: types.login, payload: { name: 'Daniel Ramírez' } };
    expect( contextValue.dispatch ).toHaveBeenCalledWith( loginAction );

    expect( mockNavigate ).toHaveBeenCalledWith(lastPath, {replace: true});
  });

});
