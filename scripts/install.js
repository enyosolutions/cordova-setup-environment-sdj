#!/usr/bin/env node

//Post install script, installs the cordova hook into scripts/ directory

//Assume script is run from its root directory

//Before
// ./proj
//		/node_modules
//			/cordova-setup-environment
//				setupEnv.js
//				/scripts
//					install.js
//					uninstall.js

//After
// ./proj
//		/scripts
//			setupEnv.js
//		/node_modules
//			/cordova-setup-environment
//				setupEnv.js

var fs = require('fs'),
    path = require('path'),
    cwd = process.cwd(), //proj directory
    scriptPath = __dirname; //node_modules/cordova-setup-environment/scripts

var writePath = path.join(cwd, '../../scripts');
var configWritePath = path.join(cwd, '../../src/config/envs');

console.log(cwd, scriptPath, writePath);

if (!fs.existsSync(writePath)) {
    console.log('Creating directory: ', writePath);
    fs.mkdirSync(writePath);
}

if (!fs.existsSync(configWritePath)) {
    console.log('Creating directory: ', configWritePath);
    fs.mkdirSync(configWritePath);
}


var buildIncrementPath = path.join(cwd, 'setupEnv.js');

var incrementFile = fs.readFileSync(buildIncrementPath);
//console.log('incrementFile: ', incrementFile)
var incrementFilePath = path.join(writePath, 'setupEnv.js')

console.log('Creating increment hook: ', incrementFilePath)
fs.writeFileSync(incrementFilePath, incrementFile);
