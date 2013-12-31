KISSY.config({
    combine: true,
    packages: {
        popup: {
            base: './',
            combine: false,
            ignorePackageNameInUri: true
        }
    }
});

KISSY.use('popup/', function (S, popup) {
    popup.init();
});