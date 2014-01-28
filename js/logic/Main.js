/**
 *
 * @author cclaudiu
 */
(function() {

    require.config({
        baseUrl: "../js",

        paths: {
            jquery: "libs/jquery-1.10.2",
            EventBus: "libs/EventBus",
            DemoEventBus: "logic/DemoEventBus"
        },

        shim: {
            jquery: {
                exports: "jquery"
            },

            EventBus: {
                exports: "EventBus"
            },

            DemoEventBus: {
                deps: ["jquery", "EventBus"],
                exports: "DemoEventBus"
            }
        }
    });

    define(["jquery", "DemoEventBus"], function() {
        console.info("Successfully loaded jQuery and EventBus using RequireJS");
    });

}( ));
