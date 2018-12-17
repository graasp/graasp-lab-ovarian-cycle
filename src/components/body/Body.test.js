import React from 'react';
import { shallow } from 'enzyme';
import Body from './Body';

describe('<Body />', () => {
  const component = shallow(<Body />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('shows one <div /> with class body-container', () => {
    expect(component.find('div.body-container').length).toEqual(1);
  });
  it('shows one <img /> with class human-image', () => {
    expect(component.find('img.human-image').length).toEqual(1);
  });
});
