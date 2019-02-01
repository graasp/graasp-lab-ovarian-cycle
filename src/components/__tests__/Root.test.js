import { shallow } from 'enzyme';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import Root from '../Root';

describe('<Root />', () => {
  const component = shallow(<Root />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('shows one <I18nextProvider /> component', () => {
    expect(component.find(I18nextProvider).length).toEqual(1);
  });
});
