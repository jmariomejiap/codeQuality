import Project from './models/project';
import Branches from './models/branches';
import ProjectCommits from './models/commits';
import uuidv1 from 'uuid/v1';
import commitDummyGenerator from './util/commitDummyData';


export default function () {
  const codeQualityDummy = async () => {
    const projectsCount = await Project.count();

    if (projectsCount > 0) {
      return;
    }

    const projectDoc = await Project.create({
      name: 'dummyProject1',
      token: uuidv1(),
      dateCreated: new Date('2017-12-25T18:10:08.408+0000'),
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
      commitDummyGenerator(projectDoc._id, 'master', '2017-12-25T18:10:08.408+0000', 65, undefined),
      commitDummyGenerator(projectDoc._id, 'master', '2017-12-26T18:10:08.408+0000', 75, undefined, 'cool!!!'),
      commitDummyGenerator(projectDoc._id, 'master', '2017-12-27T18:10:08.408+0000', 85, 'seniorDev', 'everything works'),
      commitDummyGenerator(projectDoc._id, 'master', '2017-12-28T18:10:08.408+0000', 65, undefined),
      commitDummyGenerator(projectDoc._id, 'master', '2017-12-29T18:10:08.408+0000', 47, 'badDeveloper', 'all is ruined!'),
      commitDummyGenerator(projectDoc._id, 'master', '2017-12-30T18:10:08.408+0000', 91, 'seniorDev'),
      commitDummyGenerator(projectDoc._id, 'master', '2017-12-31T18:10:08.408+0000', 93, 'seniorDev', 'I can fix anything.'),
      commitDummyGenerator(projectDoc._id, 'master', '2018-01-01T18:10:08.408+0000', 80, 'junior', 'Im doing the best I can!'),
      commitDummyGenerator(projectDoc._id, 'develop', '2017-12-25T18:10:08.408+0000', 55, 'juniorDev', 'first try'),
      commitDummyGenerator(projectDoc._id, 'develop', '2017-12-26T18:10:08.408+0000', 65, undefined),
      commitDummyGenerator(projectDoc._id, 'develop', '2017-12-27T18:10:08.408+0000', 55, 'seniorDev', 'super cool!!'),
      commitDummyGenerator(projectDoc._id, 'develop', '2017-12-28T18:10:08.408+0000', 85, undefined),
      commitDummyGenerator(projectDoc._id, 'develop', '2017-12-29T18:10:08.408+0000', 95, undefined, 'improving code'),
      commitDummyGenerator(projectDoc._id, 'develop', '2017-12-30T18:10:08.408+0000', 91, undefined),
      commitDummyGenerator(projectDoc._id, 'featureBranch1', '2017-12-25T18:10:08.408+0000', 65, undefined),
      commitDummyGenerator(projectDoc._id, 'featureBranch1', '2017-12-26T18:10:08.408+0000', 55, undefined, 'bug fixed!!'),
      commitDummyGenerator(projectDoc._id, 'featureBranch1', '2017-12-27T18:10:08.408+0000', 85, 'seniorDev', 'improving tests'),
      commitDummyGenerator(projectDoc._id, 'featureBranch1', '2017-12-28T18:10:08.408+0000', 65, 'juniorDev', 'making things worse'),
      commitDummyGenerator(projectDoc._id, 'featureBranch1', '2017-12-30T18:10:08.408+0000', 81, undefined),
      commitDummyGenerator(projectDoc._id, 'featureBranch1', '2017-12-28T18:10:08.408+0000', 65, 'juniorDev', 'making things worse'),
      commitDummyGenerator(projectDoc._id, 'featureBranch1', '2018-01-03T18:10:08.408+0000', 75, 'juniorDev', 'some improvements'),
      commitDummyGenerator(projectDoc._id, 'featureBranch1', '2018-02-08T18:10:08.408+0000', 78, 'juniorDev', 'more improvements, yeah!!'),
    ];

    await ProjectCommits.create(dummyCommit);
  };

  codeQualityDummy();
}
