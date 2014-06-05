if (!window.MY_LOADED) {
    window.MY_LOADED = 1;

    var S = KISSY;

    S.config('loadModsFn', function (rs, config) {
        var path = rs.fullpath || rs.path || rs.url;
        if (path.indexOf('.css') !== -1) {
            S.getScript(path, config);
        } else {
            var mods = [];
            rs.mods.forEach(function (m) {
                mods.push({
                    name: m.name
                });
            });
            chrome.runtime.sendMessage({
                path: path,
                mods: mods
            }, function () {
                config.success();
            });
        }
    });

    S.config({
        'base': 'https://s.tbcdn.cn/g/kissy/k/1.4.1/',
        tag: false,
        packages: {
            tests: {
                combine: false,
                base: 'http://localhost:5555/tests',
                ignorePackageNameInUri: true
            }
        }
    });

    S.use('tests/t', function (S, t) {
        t.init();
    });
}