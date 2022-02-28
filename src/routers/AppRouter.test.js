import { mount } from "enzyme";
import { AuthContext } from "../auth/authContext";
import { AppRouter } from "./AppRouter";

describe('App Router tests', () => {

  test('should show login screen if user is not auth', () => {
    const contextValue = { user: { logged: false } };
    const wrapper = mount( 
      <AuthContext.Provider value={ contextValue }>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text().trim()).toBe('Login');
  });

  test('should show HeroesScreen if user is auth', () => {
    const dashboardPageTitle = 'All Publishers';
    const contextValue = { user: { logged: true, name: 'Daniel Ramírez' } };
    const wrapper = mount( 
      <AuthContext.Provider value={ contextValue }>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text().trim()).toBe( dashboardPageTitle );
  });

});