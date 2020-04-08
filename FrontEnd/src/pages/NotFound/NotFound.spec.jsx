import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

import NotFound from '.';

configure({ adapter: new Adapter() });

describe('<NotFound />', () => {
  const wrap = mount(<NotFound />);

  it('renders', () => {
    expect(wrap.find(NotFound).exists()).toBe(true);
  });
});
