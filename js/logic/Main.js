/**
 *
 * @author cclaudiu
 */
(function() {

    require.config({
        baseUrl: "../js",

        paths: {
            jQuery: "libs/jquery-1.10.2",
            EventBus: "libs/EventBus",
            DemoEventBus: "logic/DemoEventBus"
        },

        shim: {
            jQuery: {
                exports: "jQuery"
            },

            EventBus: {
                exports: "EventBus"
            },

            DemoEventBus: {
                deps: ["jQuery", "EventBus"],
                exports: "DemoEventBus"
            }
        }
    });

    define(["jQuery", "DemoEventBus"], function() {
        console.info("Successfully loaded jQuery and EventBus using RequireJS");
    });

}( ));
