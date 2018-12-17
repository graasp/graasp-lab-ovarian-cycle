import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import Root from '../../Root';

describe('<Root />', () => {
  const component = shallow(<Root />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('shows one <Provider /> component', () => {
    expect(component.find(Provider).length).toEqual(1);
  });
  it('shows one <I18nextProvider /> component', () => {
    expect(component.find(I18nextProvider).length).toEqual(1);
  });
});
