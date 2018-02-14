import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectCommits = new Schema({
  projectId: { type: String, require: true },
  branch: { type: String, require: true },
  commitDate: { type: Date, require: true },
  testCoveragePorcentage: { type: Object, require: true },
  author: { type: String, require: true },
  gitCommitHash: { type: String, require: true },
  message: { type: String, require: true },
});

export default mongoose.model('ProjectCommits', projectCommits);
