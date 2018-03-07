import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import EmptyProjectPage from './EmptyProject';

test('Settings page renders properly', t => {
  const wrapper = shallow(<EmptyProjectPage />);

  t.is(wrapper.type(), 'div');
  t.is(wrapper.find('div').length, 1);
  t.is(wrapper.find('h2').length, 1);
  t.is(wrapper.find('h2').first().text(), 'No Projects have been created yet');
  t.is(wrapper.find('h3').length, 1);
  t.is(wrapper.find('h3').first().text(), 'Create your first project');
});

