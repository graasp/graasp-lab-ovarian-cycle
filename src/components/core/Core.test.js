import React from 'react';
import { shallow } from 'enzyme';
import Core from './Core';
import Body from '../body/Body';
import Visualizer from '../controls/visualizer/Visualizer';

describe('<Core /> component', () => {
  const props = {
    dayCount: 0,
    handleStart: jest.fn(),
    handleStop: jest.fn(),
    handleOvulation: jest.fn(),
    handlePostOvulation: jest.fn(),
    handlePreOvulation: jest.fn(),
    reloadPage: jest.fn(),
    isStarted: false,
    ovulation: false,
    postOvulation: false,
    preOvulation: false,
    ovulationActive: false,
    postOvulationActive: false,
    preOvulationActive: false,
    secreteLhFsh: false,
    secreteOestro: false,
    secreteProgest: false,
    t: jest.fn(),
  };

  const component = shallow(<Core {...props} />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('has one <div /> with class core-container', () => {
    expect(component.find('div.core-container').length).toBe(1);
  });
  it('shows one <Body /> component', () => {
    expect(component.find(Body).length).toEqual(1);
  });
  it('has one <Visualizer /> component', () => {
    expect(component.find(Visualizer).length).toBe(1);
  });
});
