import React from 'react';
import { shallow } from 'enzyme';
import { Calendar } from './Calendar';
import { DEFAULT_THEME_COLOR } from '../../../config/settings';

describe('<Calendar />', () => {
  const props = {
    dayCount: 0,
    themeColor: DEFAULT_THEME_COLOR,
    classes: {},
  };

  const component = shallow(<Calendar {...props} />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('has one <svg /> with class fa-calendar', () => {
    expect(component.find('svg.fa-calendar').length).toEqual(1);
  });
});
