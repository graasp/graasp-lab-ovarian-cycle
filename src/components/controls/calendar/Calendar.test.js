import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

describe('<Calendar />', () => {
  const props = {
    dayCount: 0,
  };

  const component = shallow(<Calendar {...props} />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('has one <svg /> with class fa-calendar', () => {
    expect(component.find('svg.fa-calendar').length).toEqual(1);
  });
});
