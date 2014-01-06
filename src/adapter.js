if (!window.MY_LOADED) {
    window.MY_LOADED = 1;

    var S = KISSY;

    S.config('loadModsFn', function (rs, config) {
        var path = rs.fullpath || rs.path;
        chrome.runtime.sendMessage({
            path: path
        }, function () {
            config.success();
        });
    });

    S.config({
        'base': 'https://s.tbcdn.cn/g/kissy/k/1.4.1/',
        tag: false
    });

    S.use('dom', function (S, Dom) {
        Dom.prepend(Dom.create('<div style="text-align: center;">kissy loader in chrome extension!</div>'), 'body');
    });
}