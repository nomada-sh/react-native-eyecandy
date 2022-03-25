const getWorkspaces = require('get-yarn-workspaces');
const path = require('path');

const workspaces = getWorkspaces(__dirname);

const watchFolders = [
  path.resolve(__dirname, '..', 'node_modules'),
  ...workspaces.filter(
    workspaceDir => !(workspaceDir === __dirname),
  ),
];

module.exports = {
  watchFolders,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
