import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import Settings from './settingsPage';

test('Settings page renders properly', t => {
  const wrapper = shallow(<Settings />);

  t.is(wrapper.type(), 'div');
  t.is(wrapper.find('div').length, 1);
  t.is(wrapper.find('h1').first().text(), 'SETTINGS PAGE!');
  t.is(wrapper.find('h1').length, 1);
  t.is(wrapper.find('RaisedButton').length, 1);
});

