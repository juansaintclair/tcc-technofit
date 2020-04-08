import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';

import Info from '.';

configure({ adapter: new Adapter() });

describe('<Info />', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // this is important - it clears the cache
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  const wrap = mount(<Info />);

  it('renders', () => {
    expect(wrap.find(Info).exists()).toBe(true);
  });

  it('Info should return Commit Hash instead of version in development environment', () => {
    process.env.NODE_ENV = 'development';
    process.env.REACT_APP_GIT_SHA = '123';

    const wrapper = shallow(<Info />);
    expect(wrapper.find('p').text()).toEqual(
      'Env: development - Last Commit: 123',
    );
  });

  it('Info should return Version instead of commit in production environment', () => {
    process.env.NODE_ENV = 'production';
    process.env.REACT_APP_VERSION = '1.0.0';

    const wrapper = shallow(<Info />);
    expect(wrapper.find('p').text()).toEqual('Env: production - Versão: 1.0.0');
  });
});
