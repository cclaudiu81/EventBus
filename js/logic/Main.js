/**
 *
 * @author cclaudiu
 */
(function () {

    require.config({
        baseUrl: "../js",

        paths: {
            jQuery: "libs/jquery-1.10.2",
            EventBus: "libs/EventBus",
            jasmine: "libs/jasmine-1.3.0",
            jasmineHtml: "libs/jasmine-html-1.3.0",

            DemoEventBus: "logic/DemoEventBus",

            CoreSpecLibs: "specs/CoreSpecLibs",
            SpecRunner: "specs/SpecRunner",

            BinarySearchSpec: "specs/BinarySearchWTriangulationSpec",
            EventBusSpec: "specs/EventBusSpec"
        },

        shim: {
            jQuery: {
                exports: "jQuery"
            },

            jasmine: {
                exports: "jasmine"
            },

            jasmineHtm: {
                deps: ["jasmine"],
                exports: "jasmineHtml"
            },

            EventBus: {
                exports: "EventBus"
            },

            DemoEventBus: {
                deps: ["jQuery", "EventBus"],
                exports: "DemoEventBus"
            },

            CoreSpecLibs: {
                deps: ["jasmine", "jasmineHtml"],
                exports: "CoreSpecLibs"
            },

            BinarySearchSpec: {
                deps: ["CoreSpecLibs"],
                exports: "BinarySearchSpec"
            },

            EventBusSpec: {
                deps: ["CoreSpecLibs", "EventBus"],
                exports: "EventBusSpec"
            },

            SpecRunner: {
                deps: ["BinarySearchSpec", "EventBusSpec"],
                exports: "SpecRunner"
            }
        }
    });

    define(["jQuery", "DemoEventBus", "SpecRunner"], function () {
        console.info("Successfully loaded jQuery and EventBus using RequireJS");
    });

}());
