import React from 'react';
import { shallow } from 'enzyme';
import Visualizer from './Visualizer';
import Calendar from '../calendar/Calendar';
import Counter from '../counter/Counter';
import Hormones from '../hormones/Hormones';
import Phases from '../phases/Phases';
import Refresher from './Refresher';

describe('<Visualizer /> component', () => {
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

  const component = shallow(<Visualizer {...props} />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('has one <div /> with class visualizer-container', () => {
    expect(component.find('div.visualizer-container').length).toEqual(1);
  });
  it('shows one <Calendar /> component', () => {
    expect(component.find(Calendar).length).toEqual(1);
  });
  it('shows one <Counter /> component', () => {
    expect(component.find(Counter).length).toEqual(1);
  });
  it('has one <Hormones /> component', () => {
    expect(component.find(Hormones).length).toBe(1);
  });
  it('has one <Phases /> component', () => {
    expect(component.find(Phases).length).toBe(1);
  });
  it('has one <Refresher /> component', () => {
    expect(component.find(Refresher).length).toBe(1);
  });
});
