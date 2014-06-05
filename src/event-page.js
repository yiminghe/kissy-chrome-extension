/**
 * proxy script request from extension
 */

var kissy = 'https://s.tbcdn.cn/g/kissy/k/1.4.1/seed.js?t=1231';
var S = KISSY;

/*global chrome*/

function insertKISSY(tabId, callback) {
    xhr(kissy, function (code) {
        chrome.tabs.executeScript(tabId, {
            code: 'if(!window.KISSY){' + code + '}'
        }, callback);
    });
}

function xhr(url, callback) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = function () {
        S.log('fetch remote file: ' + url);
        callback(req.responseText);
    };
    req.send(null);
}

function insert(tabId, request, callback) {
    xhr(request.path, function (code) {
        if (code.indexOf('KISSY.add(') !== -1 &&
            (code.indexOf('KISSY.add("') === -1 && code.indexOf('KISSY.add(\'') === -1 )) {
            if (request.mods.length === 1) {
                // extension does not guarantee call success (in adapter.js of content script) immediately after execute KISSY.add
                // so complete module name manually to allow correct module registration
                code = code.replace(/KISSY\.add\(/, 'KISSY.add("' + request.mods[0].name + '", ');
            }
        }
        chrome.tabs.executeScript(tabId, {
            code: code
        }, callback);
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    S.log(request);

    if (!request.path) {
        return;
    }

    var tabId = sender.tab.id;
    var wait = true;
    insert(tabId, request, function () {
        sendResponse({
            ok: 1
        });
        wait = false;
    });
    return wait;
});

chrome.webNavigation.onDOMContentLoaded.addListener(function (e) {
    var tabId = e.tabId;
    insertKISSY(tabId, function () {
        insert(tabId, {path: chrome.runtime.getURL('adapter.js')});
    });
}, {
    url: [
        {
            hostSuffix: 'taobao.com'
        }
    ]
});