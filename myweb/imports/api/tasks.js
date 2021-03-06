export const TaskItems = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert': function (text) {
        // check(text, String);

        // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    TaskItems.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'tasks.remove': function (taskId) {
    check(taskId, String);

    TaskItems.remove(taskId);
  },
  'tasks.setChecked': function (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    TaskItems.update(taskId, { $set: { checked: setChecked } });
  },
});
