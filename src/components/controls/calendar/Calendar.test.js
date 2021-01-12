import React from 'react';
import { shallow } from 'enzyme';
import { Calendar } from './Calendar';
import { DEFAULT_THEME_COLOR } from '../../../config/settings';

describe('<Calendar />', () => {
  const props = {
    dayCount: 0,
    themeColor: DEFAULT_THEME_COLOR,
    classes: { rootCalendar: 'sm' },
  };

  const component = shallow(<Calendar {...props} />);

  it('renders correctly', () => {
    // expect(component).toMatchSnapshot();
    expect(component).toBeTruthy();
  });

  it('has one <svg /> with class rootCalendar', () => {
    expect(component.find('svg.rootCalendar').length).toEqual(1);
  });
});
