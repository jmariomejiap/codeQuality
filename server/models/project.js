import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const project = new Schema({
  name: { type: String, require: true },
  token: { type: String, require: true },
  dateCreated: { type: Date, require: true },
  dateUpdated: { type: Date, require: true },
  isActive: { type: Boolean, require: true },
});

export default mongoose.model('Project', project);
