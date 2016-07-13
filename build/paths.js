import path from 'path';

const appDirName = 'app';
const srcDirName = 'public';
const releaseDirName = 'dist';
const root = path.dirname(__dirname);

export default {
	root: root,
	systemConfigJs: `${srcDirName}/config.js`,
	packageJson: `${root}/package.json`,
	srcDir: `${root}/${srcDirName}`,
	releaseDir: `${root}/${releaseDirName}`,
	release: {
		root: `${root}/${releaseDirName}`
	},
	releaseDirName: releaseDirName,
	app: {
		entryPoint: `${appDirName}/app.bootstrap`,
		name: appDirName
	},
	glob: {
		js: `${root}/${srcDirName}/${appDirName}/**/!(*.spec).js`,
		html: `${root}/${srcDirName}/${appDirName}/**/*.html`
	},
	jsonServerData: `${root}/server/item-data.json`
}