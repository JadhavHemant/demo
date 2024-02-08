import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import {expect} from 'chai';
import PageBase from './PageBase';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<PageBase />', () => {
  it('should have a span with the navigation text', () => {
    const wrapper = shallow(<PageBase navigation="navigation" />);
    const actual = wrapper.find('span').text();
    const expected = 'navigation';

    expect(expected).to.equal(actual);
  });

  it('should have a header with the title text', () => {
    const wrapper = shallow(<PageBase title="title" />);
    const actual = wrapper.find('h3').text();
    const expected = 'title';

    expect(expected).to.equal(actual);
  });
});
