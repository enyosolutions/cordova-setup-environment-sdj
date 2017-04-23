module.exports = function (context) {
    var util = require('util'),
        fs = require('fs'),
        path = require('path');

    console.log("Setup en hook", context);
    var platforms = context.opts.platforms,
        cliCommand = context.cmdLine,
        fileName = 'src/config/envs/config.',
        filePath = path.normalize(path.join(context.opts.projectRoot, fileName));
    // hook configuration
    var idx = cliCommand.indexOf('--app-env=');
    if (idx === -1) {
        console.log('no --app-env flag detected. No app env setup executed.');
        return;
    }
    var endIdx = cliCommand.indexOf(' ', idx) > -1 ? cliCommand.indexOf(' ', idx) : undefined;
    var env = cliCommand.substring(idx + 10, endIdx);
    if (!env || env.length < 0) {
        console.log('no --app-env value detected. No app env setup executed.');
        return;
    }
    console.log('--app-env flag detected. using env', env);

    fs.readFile(filePath + env + '.json', {
        encoding: 'utf8'
    }, function (err, data) {
        if (err) throw err;
        setEnvInfo(data);
    });

    function setEnvInfo(info) {
        fs.writeFile(filePath + 'json', info, function (err, data) {
            if (err) throw err;
            console.log("settings updated with env", env);
        });
    }


}
