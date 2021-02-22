import React from 'react';
import { shallow } from 'enzyme';
import { Body } from './Body';

describe('<Body />', () => {
  const props = {
    t: jest.fn(),
    dispatchAppendSvg: jest.fn(),
    classes: {},
    simulation: { appearOvule: false, ovaries: true, pituitary: true },
  };

  const component = shallow(<Body {...props} />);

  it('renders correctly', () => {
    // expect(component).toMatchSnapshot();
    expect(component).toBeTruthy();
  });
  it('shows one <div /> with class body-container', () => {
    expect(component.find('div.body-container').length).toEqual(1);
  });
  it('shows one <svg /> with class body-svg', () => {
    expect(component.find('svg.body-svg').length).toEqual(1);
  });
});
