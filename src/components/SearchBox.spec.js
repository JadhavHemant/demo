import React from 'react';
import {expect} from 'chai';
import Enzyme, {shallow} from 'enzyme';
import SearchBox from './SearchBox';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
describe('<SearchBox />', () => {
  it('should have a textbox with hintText \'Search\'', () => {
    const wrapper = shallow(<SearchBox />);
    const actual = wrapper.find('TextField').prop('hintText');
    const expected = 'Search...';

    expect(expected).to.equal(actual);
  });
});
