import React from 'react';
import { shallow } from 'enzyme';
import StudentMode from '../modes/StudentMode';

describe('<StudentMode />', () => {
  const component = shallow(<StudentMode />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('shows one <StudentMode /> component', () => {
    expect(component.find('div.App').length).toEqual(1);
  });
});
