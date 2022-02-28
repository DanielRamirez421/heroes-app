import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { getHeroById } from "../../selectors/getHeroById";
import { HeroScreen } from "./HeroScreen";


const mockNavigate = jest.fn();
jest.mock( 'react-router-dom', () => ({ 
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockNavigate 
}) );



describe('HeroScreen component tests', () => {

  test('should show component', () => {
    const heroId = 'dc-batman';
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/hero/${ heroId }`]}>
         <Routes>
           <Route path="/hero/:heroId" element={ <HeroScreen /> }/>
         </Routes>
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
  
  test('should show empty view when non-existent heroId in url params', () => {
    const nonExistentHero = 'non-existent-hero';
    const wrapper = mount(
      <MemoryRouter initialEntries={ [`/hero/${ nonExistentHero }`] }>
        <Routes>
          <Route path="/hero/:heroId" element={ <HeroScreen /> }/>
          <Route path="/" element={ <h1>No hero page</h1> }/>
        </Routes>
      </MemoryRouter>
    );
    expect( wrapper.find('h1').text().trim() ).toBe( 'No hero page' );
  });


  test('should show HeroScreen component if hero in params exists', () => {
    const existingHeroId = 'dc-batman';
    const wrapper = mount(
      <MemoryRouter initialEntries={ [`/hero/${ existingHeroId }`] }>
        <Routes>
          <Route path="/hero/:heroId" element={ <HeroScreen /> }/>
          <Route path="/" element={ <h1>No hero page</h1> }/>
        </Routes>
      </MemoryRouter>
    );
    const { superhero } = getHeroById( existingHeroId );
    expect( wrapper.find('h3').text().trim() ).toBe( superhero );
  });

  test('should navigate when user press button', () => {
    const heroId = 'dc-batman';
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/hero/${ heroId }`]}>
         <Routes>
           <Route path="/hero/:heroId" element={ <HeroScreen /> }/>
         </Routes>
      </MemoryRouter>
    );
    wrapper.find('button').prop('onClick')();
    expect( mockNavigate ).toHaveBeenCalledWith(-1);

  });
});