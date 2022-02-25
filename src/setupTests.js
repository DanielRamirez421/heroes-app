// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json'

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));



// IMPORT ALL THIS
// npm i --save-dev enzyme
// npm install --save-dev enzyme-to-json
// npm install --save-dev @wojtekmaj/enzyme-adapter-react-17

// import Enzyme from 'enzyme';
// import { createSerializer } from 'enzyme-to-json'
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// Enzyme.configure({ adapter: new Adapter() });
// expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
