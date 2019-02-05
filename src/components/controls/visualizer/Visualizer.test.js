import React from 'react';
import { shallow } from 'enzyme';
import { Visualizer } from './Visualizer';
import Counter from '../counter/Counter';
import Phases from '../phases/Phases';

describe('<Visualizer />', () => {
  const props = {
    dayCount: 0,
    handleFullCycle: jest.fn(),
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

  const component = shallow(<Visualizer {...props} />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('has one <div /> with class visualizer-container', () => {
    expect(component.find('div.visualizer-container').length).toEqual(1);
  });
  it('shows one <Counter /> component', () => {
    expect(component.find(Counter).length).toEqual(1);
  });
  it('has one <Phases /> component', () => {
    expect(component.find(Phases).length).toBe(1);
  });
});
