import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'reactstrap';
import { Phases } from './Phases';

describe('<Phases />', () => {
  const props = {
    t: jest.fn(),
    handleOvulation: jest.fn(),
    handlePostOvulation: jest.fn(),
    handlePreOvulation: jest.fn(),
    ovulationActive: false,
    postOvulationActive: false,
    preOvulationActive: false,
    preOvulation: false,
    preOvulationStep: false,
    ovulationStep: false,
    postOvulationStep: false,
  };

  const component = shallow(<Phases {...props} />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('has one <div /> with class phases-container', () => {
    expect(component.find('div.phases-container').length).toEqual(1);
  });
  it('has one <div /> with class phases', () => {
    expect(component.find('div.phases').length).toEqual(1);
  });
  it('shows three <Button /> components', () => {
    expect(component.find(Button).length).toEqual(3);
  });
});
