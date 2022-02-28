import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../auth/authContext";
import { PrivateRoute } from "./PrivateRoute";



jest.mock( 'react-router-dom', () => ({ 
  ...jest.requireActual('react-router-dom'), 
  Navigate: () => <span>Saliendo de acá</span>
}) );



describe('PrivateRoute tests', () => {


  Storage.prototype.setItem = jest.fn();


  test('should show the component if user is auth and save lastPath in localStorage', () => {
    const contextValue = { user: { name: 'Daniel Ramírez', logged: true }, dispatch: jest.fn() };
    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={ ['/'] }>
          <PrivateRoute>
            <h1>Private Component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper.find('h1').text().trim()).toBe('Private Component');
    expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/');
  });


  test('should block component if user is not auth', () => {
    const contextValue = { user: { logged: false }};
    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={ ['/'] }>
          <PrivateRoute>
            <h1>Component should not showed</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect( wrapper.find('span').text().trim() ).toBe('Saliendo de acá')
  });


});