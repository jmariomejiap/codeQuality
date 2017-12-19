import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectCommits = new Schema({
  token: { type: String, require: true },
  branch: { type: String, require: true },
  commitDate: { type: Date, require: true },
  testCoveragePorcentage: { type: Number, require: true },
  author: { type: String, require: true },
  gitCommitHash: { type: String, require: true },
});

export default mongoose.model('ProjectCommits', projectCommits);
