import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'reactstrap';
import Refresher from './Refresher';

describe('<Refresher /> component', () => {
  const props = {
    reloadPage: jest.fn(),
  };

  const component = shallow(<Refresher {...props} />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('shows three <Button /> components', () => {
    expect(component.find(Button).length).toEqual(1);
  });
  it('has one <svg /> with class fa-redo-alt', () => {
    expect(component.find('svg.fa-redo-alt').length).toEqual(1);
  });
});
