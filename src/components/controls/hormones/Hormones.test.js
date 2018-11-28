import React from 'react';
import { shallow } from 'enzyme';
import Hormones from './Hormones';

describe('<Hormones />', () => {
  const props = {
    ovulation: false,
    postOvulation: false,
    preOvulation: false,
    secreteLhFsh: false,
    secreteProgest: false,
    secreteOestro: false,
    t: jest.fn(),
  };

  const component = shallow(<Hormones {...props} />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('has one <div /> with class hormone-container', () => {
    expect(component.find('div.hormone-container').length).toEqual(1);
  });
  it('has one <div /> with class lh-hormones', () => {
    expect(component.find('div.lh-hormones').length).toEqual(1);
  });
  it('has one <div /> with class fsh-hormones', () => {
    expect(component.find('div.fsh-hormones').length).toEqual(1);
  });
  it('has one <div /> with class oestro-hormones', () => {
    expect(component.find('div.oestro-hormones').length).toEqual(1);
  });
  it('has one <div /> with class progest-hormones', () => {
    expect(component.find('div.progest-hormones').length).toEqual(1);
  });
});
