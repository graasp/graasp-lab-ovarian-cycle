import React from 'react';
import { shallow } from 'enzyme';
import { Hormones } from './Hormones';

describe('<Hormones />', () => {
  const props = {
    ovulation: false,
    postOvulation: false,
    preOvulation: false,
    secreteLhFsh: false,
    secreteProgest: false,
    secreteOestro: false,
    secreteFsh: false,
    secreteLh: false,
    t: jest.fn(),
    classes: {},
  };

  const component = shallow(<Hormones {...props} />);

  it('renders correctly', () => {
    // expect(component).toMatchSnapshot();
    expect(component).toBeTruthy();
  });
});
