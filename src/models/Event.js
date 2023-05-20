'use strict';
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const Event = mongoose.model('Event', newSchema);
  return Event;
};