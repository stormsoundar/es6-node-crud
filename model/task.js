import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    subTasks: [
      {
        type: String,
        trim: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    starred: {
      type: Boolean,
      enum: ['true', 'false'],
      default: 'false',
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      enum: ['incomplete', 'completed'],
      default: 'incomplete',
    },
  },
  { timestamps: true }
);

const tasks = mongoose.model('tasks', taskSchema);

export default tasks;
