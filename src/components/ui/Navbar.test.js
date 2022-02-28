import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";
import { Navbar } from "./Navbar";

const mockNavigate = jest.fn();
jest.mock( 'react-router-dom', () => ({ 
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockNavigate 
}) );

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Navbar component tests', () => {

  const userName = 'Daniel Ramírez';
  const contextValue = { user: { name: userName, logged: true }, dispatch: jest.fn() };
  const wrapper = mount(
    <AuthContext.Provider  value={ contextValue }>
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test('should show component', () => {
    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find('.text-info').text().trim() ).toBe( userName );
  });

  test('should call logout, navigate, dispatch', () => {
    act( () => wrapper.find('button').prop('onClick')() );
    expect( contextValue.dispatch ).toBeCalledWith( { type: types.logout } );
    expect( mockNavigate ).toBeCalledWith( '/login', { replace: true } );
  });

});
