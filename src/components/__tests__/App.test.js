import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';

describe('<App />', () => {
  const props = {
    loading: false,
    dispatchGetContext: jest.fn(),
    dispatchGetAppInstance: jest.fn(),
    dispatchToggleLoader: jest.fn(),
    i18n: {
      defaultNS: '',
      changeLanguage: jest.fn(),
    },
    t: jest.fn(),
  };
  const component = shallow(<App {...props} />);
  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
