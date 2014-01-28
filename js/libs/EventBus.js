/**
 * @author cclaudiu on 1/20/14.
 */
define([], function () {

    var mappingContainer = {
    };

    var doGetEvents = function (scope) {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            eventsContainer = [],
            each;

        for (each in scope) {
            if (hasOwnProperty.call(scope, each)) {
                eventsContainer.push(each);
            }
        }
        return eventsContainer;
    };

    var doGetEventsSize = function (scope) {
        return doGetEvents(scope).length || 0;
    };

    var extractListenersFor = function (eventKey, scope) {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            slice = Array.prototype.slice,
            registeredListeners = [];

        if (hasOwnProperty.call(scope, eventKey)) {
            registeredListeners = slice.call(scope[eventKey], 0);
        }

        return registeredListeners;
    };

    var doRegisterEvent = function (event, listener, scope) {
        var context = scope || mappingContainer,
            push = Array.prototype.push;

        if (!context[event]) {
            context[event] = [];
        }

        push.call(context[event], listener);
    };

    var EventBus = {
        registerEvent: function (eventKey, listener, scope) {
            doRegisterEvent(eventKey, listener, scope);
        },

        lookupEvents: function () {
            return doGetEvents(mappingContainer);
        },

        lookupListenersByEvent: function () {
            var slice = Array.prototype.slice,
                args = slice.call(arguments, 0);

            return extractListenersFor(args[0], mappingContainer);
        },

        getEventStackSize: function () {
            return doGetEventsSize(mappingContainer);
        },

        fireEvent: function (eventKey) {
            var extractedListeners = extractListenersFor(eventKey, mappingContainer),
                each = Array.prototype.forEach;

            each.call(extractedListeners, function (callback) {
                callback();
            });
        },

        removeListenersForEvent: function (eventKey, optionalListeners) {
            var slice = Array.prototype.slice,
                each = Array.prototype.forEach,
                args = slice.apply(arguments, [0]),
                // get and remove the first argument which should be the eventKey
                eventKey = args.shift(),
                // the remainder are the listeners, or get all listeners for this eventKey
                toRemoveListeners = args.length ? args : extractListenersFor(eventKey, mappingContainer);

            if (eventKey) {
                each.call(toRemoveListeners, function (each, idx) {
                    if (typeof mappingContainer[eventKey].indexOf(each) !== "undefined") {
                        mappingContainer[eventKey].splice(0, 1);
                    }
                });
                return;
            }

            throw new Error("Missing eventKey to remove listeners for!");
        },

        cleanBus: function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                each;

            // for demo purpose
            for (each in mappingContainer) {
                if (hasOwnProperty.call(mappingContainer, each)) {
                    mappingContainer[each] = null;
                    each = null;
                }
            }
            mappingContainer = { };
        }
    };

    return EventBus;
});
