import Post from './models/post';
import Project from './models/project';
import Branches from './models/branches';
import ProjectCommits from './models/commits';
import uuidv1 from 'uuid/v1';
import { commitExample } from './util/commitExample';



export default function () {
  const codeQualityDummy = async () => {
    const projectsCount = await Project.count();

    if (projectsCount > 0) {
      return;
    }

    const projectDoc = await Project.create({
      name: 'dummyProject1',
      token: uuidv1(),
      dateCreated: new Date(),
      dateUpdated: new Date(),
      isActive: true,
    });

    const dummyBranches = [
      {
        projectId: projectDoc._id,
        name: 'master',
      },
      {
        projectId: projectDoc._id,
        name: 'develop',
      },
      {
        projectId: projectDoc._id,
        name: 'featureBranch1',
      },
    ];

    await Branches.create(dummyBranches);

    const dummyCommit = [
      {
        projectId: projectDoc._id,
        branch: 'develop',
        commitDate: new Date(),
        testCoveragePorcentage: commitExample,
        author: 'mySelf',
        gitCommitHash: 'adefe45a',
      },
      {
        projectId: projectDoc._id,
        branch: 'develop',
        commitDate: new Date(),
        testCoveragePorcentage: commitExample,
        author: 'mySelf',
        gitCommitHash: 'adefe45a',
      },
      {
        projectId: projectDoc._id,
        branch: 'develop',
        commitDate: new Date(),
        testCoveragePorcentage: commitExample,
        author: 'mySelf',
        gitCommitHash: 'adefe45a',
      },
    ];

    await ProjectCommits.create(dummyCommit);
  };

  codeQualityDummy();


  Post.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = `Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum`;

    const content2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum. Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet.`;

    const post1 = new Post({ name: 'Admin', title: 'Hello MERN', slug: 'hello-mern', cuid: 'cikqgkv4q01ck7453ualdn3hd', content: content1 });
    const post2 = new Post({ name: 'Admin', title: 'Lorem Ipsum', slug: 'lorem-ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });

    Post.create([post1, post2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
