import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { DashboardRoutes } from "./DashboardRoutes";
import { AuthContext } from "../auth/authContext";

describe('Dashboard Routes tests', () => {

  const contextValue = { user: { name: 'Daniel Ramírez', logged: true } };
  const wrapper = mount( 
    <AuthContext.Provider value={ contextValue }>
      <MemoryRouter  initialEntries={ ['/'] }>
        <DashboardRoutes />
      </MemoryRouter>
    </AuthContext.Provider>
   );

  test('should show navbar if user is logged', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe( contextValue.user.name );
  });

  test('should have HeroesScreen by default route', () => {
    const defaultComponentInRoute = 'HeroesScreen';
    expect(wrapper.find(defaultComponentInRoute).exists()).toBeTruthy();
  });

  test('should show component "MARVEL"', () => {
    const wrapper = mount( 
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter  initialEntries={ ['/marvel'] }>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
     );
     const marvelComponentName = 'MarvelScreen';
     expect(wrapper.find(marvelComponentName).exists()).toBeTruthy();
  });

  test('should show component "DC"', () => {
    const wrapper = mount( 
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter  initialEntries={ ['/dc'] }>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
     );
     const dcComponentName = 'DcScreen';
     expect(wrapper.find(dcComponentName).exists()).toBeTruthy();
  });

});