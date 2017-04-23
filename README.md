# cordova-build-increment


### Release Notes

See Usage section below for options flag info


## Install
Install the following package below inside of your app's root folder.
```bash
$ npm install cordova-build-increment
```
A scripts/ folder will be created with the 'setupEnv.js' file in it

Then add the following to your app's config.xml file:
```html
<hook src="scripts/setupEnv.js" type="before_build"/>
```


## Usage

By default this hook is enabled for all builds and will increment platform specific version numbers.

With v0.1.0 the hook now supports option flags so that the script itself does not need to be edited before use. It also allows for direct incrementing of the `version` tag.

Use the following option flags when executing `cordova build`:

`--app-env=xxx` - no increments processed for this build (overrides other option flags)




### Release History

v0.0.1
