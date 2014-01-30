/**
 *
 * @author cclaudiu
 */
define(["CoreSpecLibs"], function () {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

// ###################
// # NOT invoked because the window is already loaded before the jasmine test suite is wired up
// ###################
//
//    var currentWindowOnload = window.onload;
//
//    window.onload = function () {
//        if (currentWindowOnload) {
//            currentWindowOnload();
//        }
//        execJasmine();
//    };
// ######################################################################################

    var execJasmine = function() {
        jasmineEnv.execute();
    };

// Workaround for combining RequireJS with Jasmine:
// In order to fix the event triggered on window.load, set a delay on when the Jasmine to be fired
    setTimeout(function() {
        execJasmine();
    }, 1000)

    console.log("SpecRunner executed! Typeof Jasmine: " + (typeof jasmine));
});

