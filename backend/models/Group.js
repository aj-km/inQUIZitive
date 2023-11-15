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

module.exports = mongoose.model('Group', GroupSchema);
