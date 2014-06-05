/**
 * user test code
 */
KISSY.add(function (S, require) {
    var dom = require('dom');
    require('./t.css');
    return {
        init: function () {
            dom.prepend(dom.create('<div class="kissy-chrome-test">kissy loader in chrome extension!</div>'), 'body');
        }
    };
});