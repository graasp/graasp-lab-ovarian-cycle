import React from 'react';
import { shallow } from 'enzyme';
import StudentView from './StudentView';
import Core from '../components/Core';

describe('<StudentView />', () => {
  const component = shallow(<StudentView />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('shows one <StudentView /> component', () => {
    expect(component.find('div.App').length).toEqual(1);
  });
  it('has one <Core />', () => {
    expect(component.find(Core).length).toBe(1);
  });
});
