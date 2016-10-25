import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import Task from '../Task.jsx';

describe('Gmap component', () => {
    it('should render', () => {
        // const task = Factory.build('task', { text: 'testing', checked: false });
        const item = shallow(<Task key={1} task={{}}  />);
        chai.assert(item.hasClass('list-group-item'));
        // chai.assert(!item.hasClass('checked'));
        // chai.assert.equal(item.find('.editing').length, 0);
        // chai.assert.equal(item.find('input[type="text"]').prop('defaultValue'), 'testing');
    });
});
