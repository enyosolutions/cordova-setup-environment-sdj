module.exports = function(context) {
    var util = require('util'),
        fs = require('fs'),
        path = require('path');

    console.log("Setup en hook", context);
    var platforms = context.opts.platforms,
        cliCommand = context.cmdLine,
        fileName = 'src/config/envs/config.',
        configXmlPath = path.normalize(path.join(context.opts.projectRoot, "config.xml")),
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
    }, function(err, data) {
        if (err) throw err;
        setEnvInfo(data);
    });

    fs.readFile(configXmlPath, {
        encoding: 'utf8'
    }, function(err, data) {
        if (err) throw err;
        updateBundleId(data, env);
    });

    /**
    @descripttion  write
    */
    function setEnvInfo(info) {
        fs.writeFile(filePath + 'json', info, function(err, data) {
            if (err) throw err;
            console.log("settings updated with env", env);
        });
    }

    /**
    @descripttion  change bundle id according to env.
    */
    function updateBundleId(info, env) {
        var bundleId;
        switch (env) {
            default:
                case "dev":
                bundleId = "fr.dvmobile.entreprise.sdj-sav-dev";
            break;
            case "qa":
                    bundleId = "fr.dvmobile.entreprise.sdj-sav-qa";
                break;
            case "prod":
                    bundleId = "fr.dvmobile.entreprise.sdj-sav-prod";
                break;
        }
        info = info.replace(/fr\.dvmobile\.entreprise\.sdj\-sav\-(prod|qa|dev)/, bundleId);
        console.log(info);
        fs.writeFile(configXmlPath, info, function(err, data) {
            if (err) throw err;
            console.log("config.xml updated with env", env, bundleId);
        });
    }


}
