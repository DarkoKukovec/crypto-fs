module.exports = {
  readFileSync: require('./sync/readFile'),
  writeFileSync: require('./sync/writeFile'),
  mkdirSync: require('./sync/mkdir'),
  existsSync: require('./sync/exists'),
  statSync: require('./sync/stat'),
  rmdirSync: require('./sync/rmdir'),
  unlinkSync: require('./sync/unlink')
};
