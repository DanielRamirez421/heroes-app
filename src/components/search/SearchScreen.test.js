import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import { SearchScreen } from "./SearchScreen";


const mockNavigate = jest.fn(); // this variable should have this name with no exceptions

jest.mock('react-router-dom', () => {

  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };

});


describe('SearchScreen component tests', () => {

  test('should show component', () => {
    const wrapper = mount( 
      // MemoryRouter allow us to use useLocation()
      <MemoryRouter initialEntries={ ['/search'] }> 
        <SearchScreen /> 
      </MemoryRouter>
    );
    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find('h4').at(0).text().trim() ).toBe( 'Search' );
  });

  test('should show Batman and input with queryStringValue', () => {
    const queryString = 'batman';
    const wrapper = mount( 
      <MemoryRouter initialEntries={ [`/search?q=${ queryString }`] }> 
        <SearchScreen /> 
      </MemoryRouter>
    );
    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find('input').prop('value') ).toBe( queryString )
  });

  test('should return a message for non-existent hero', () => {
    const queryString = 'non-existentHero';
    const errorMessage = `No results for: ${ queryString }`;
    const wrapper = mount( 
      <MemoryRouter initialEntries={ [`/search?q=${ queryString }`] }> 
        <SearchScreen /> 
      </MemoryRouter>
    );
    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find('input').prop('value') ).toBe( queryString )
    expect( wrapper.find('.alert-danger').text().trim() ).toBe( errorMessage )
  });

  test('should call navigate hook method with custom param', () => {
    const inputName = 'search';
    const valueToSend = 'Batman';

    const wrapper = mount( 
      <MemoryRouter initialEntries={ [`/search`] }> 
        <SearchScreen /> 
      </MemoryRouter>
    );

    wrapper.find('input').simulate('change', { target: { name: inputName,  value: valueToSend } });
    expect(wrapper.find('input').prop('value')).toBe(valueToSend);

    act(() => { wrapper.find('form').prop('onSubmit')({ preventDefault: () => {} }); });
    expect( mockNavigate ).toBeCalledWith(`?q=${ valueToSend }`);
  });

});
