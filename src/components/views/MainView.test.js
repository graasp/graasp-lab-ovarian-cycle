import React from 'react';
import * as d3 from 'd3';
import { shallow } from 'enzyme';
import { MainView } from './MainView';
import Main from '../layout/Main';
import SideMenu from '../layout/SideMenu';

describe('<MainView />', () => {
  const props = {
    svg: d3.select('.Brain-holder'),
    dispatchPostOvulationState: jest.fn(),
    dispatchPreOvulationState: jest.fn(),
    dispatchOvulationState: jest.fn(),
    classes: {},
  };
  const component = shallow(<MainView {...props} />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('shows one <Main /> component', () => {
    expect(component.find(Main).length).toEqual(1);
  });
  it('shows one <SideMenu /> component', () => {
    expect(component.find(SideMenu).length).toEqual(1);
  });
});
