# cordova-setup-environment

This is a hook to allow changing variables before building. This is useful for example when targeting multiple environnements  with an api.

The hook simply copy data from the targetted env file to the main file.
You then need to import that env file in your project.

### Release Notes

See Usage section below for options flag info


## Install
Install the following package below inside of your app's root folder.
```bash
$ npm install cordova-setup-environment
```
A scripts/ folder will be created with the 'setupEnv.js' file in it

Then add the following to your app's config.xml file:
```html
<hook src="scripts/setupEnv.js" type="before_build"/>
```


## Usage

By default this hook not enabled.
Use the following option flags when executing `cordova build`:

`--app-env=xxx` which will copy the configuration from
`src/config/envs/config.xxx.json` to `src/config/envs/config.json`
where xxx should be something like "dev", "staging", "production" etc.



### Release History

v0.0.1
