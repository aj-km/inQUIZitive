const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  emailIds: {
    type: [String],
    required: true,
  },
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
