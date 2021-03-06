import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const branches = new Schema({
  projectId: { type: String, require: true },
  name: { type: String, require: true },
});

export default mongoose.model('Branches', branches);
