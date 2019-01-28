import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'reactstrap';
import Counter from './Counter';

describe('<Counter />', () => {
  const props = {
    t: jest.fn(),
    handleFullCycle: jest.fn(),
    handleStop: jest.fn(),
    isStarted: false,
    ovulationActive: false,
    postOvulationActive: false,
    preOvulationActive: false,
    isDisabled: false,
  };

  const component = shallow(<Counter {...props} />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('has one <div /> with class counter-container', () => {
    expect(component.find('div.counter-container').length).toEqual(1);
  });
  it('shows one <Button />', () => {
    expect(component.find(Button).length).toEqual(1);
  });
});
