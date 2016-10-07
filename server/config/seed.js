/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'NodeJS',
      type: 'skill',
      info: '50'
    },
    {
      name: 'HTML',
      type: 'skill',
      info: '90'
    },
    {
      name: 'JS',
      type: 'skill',
      info: '90'
    },
    {
      name: 'CSS',
      type: 'skill',
      info: '80'
    },
    {
      name: 'AngularJS',
      type: 'skill',
      info: '70'
    },
    {
      name: 'Bootstrap',
      type: 'skill',
      info: '70'
    },
    {
      name: 'MongoDB',
      type: 'skill',
      info: '60'
    },
    {
      name: 'MySql',
      type: 'skill',
      info: '50'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
