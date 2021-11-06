import simpleGit from 'simple-git';

const git = simpleGit({
  baseDir: process.cwd(),
  binary: 'git',
});

git.log().then(data => console.log(data));
