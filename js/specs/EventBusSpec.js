/**
 * @author cclaudiu on 1/20/14.
 */
define(["CoreSpecLibs", "EventBus"], function (Core, EventBus) {

    describe("EventBus", function () {

        describe("having a single pair of event/listener", function () {
            var listener, eventKey;

            beforeEach(function () {
                EventBus.cleanBus();

                listener = function () {
                    console.log("broadcast event is handled by this listener");
                    return "action listener";
                };

                eventKey = "openConnection";
            });

            // Runs foreach specification as opposed to each describe block
            afterEach(function () {
                EventBus.cleanBus();
            });

            describe("#registerEvent", function () {

                it("should add an event to the stack", function () {
                    EventBus.registerEvent(eventKey, listener);

                    expect(EventBus.getEventStackSize()).toBe(1);
                    expect(EventBus.lookupEvents()[0]).toMatch("openConnection");
                });
            });

            describe("#lookupListenersByEvent", function () {

                it("should return a valid listener for an eventKey", function () {
                    EventBus.registerEvent(eventKey, listener);

                    expect(typeof EventBus.lookupListenersByEvent(eventKey)[0]).toMatch("function");
                    expect(EventBus.lookupListenersByEvent(eventKey)[0]()).toMatch("action listener");
                });
            });

            describe("#fireEvents", function () {

                it("should fire the event registered", function () {
                    EventBus.registerEvent(eventKey, listener);

                    // invoke the real implementation
                    spyOn(console, 'log').andCallThrough();

                    EventBus.fireEvent(eventKey);

                    expect(console.log).toHaveBeenCalledWith("broadcast event is handled by this listener");
                });
            });
        });

        describe("having a collection of event/listeners", function () {
            var openConnectionListener,
                sendStreamListener,
                openConnectionEvent,
                sendStreamEvent;

            beforeEach(function () {
                openConnectionListener = function () {
                    console.log("open connection");
                };

                sendStreamListener = function () {
                    console.log("sending stream of bytes");
                };

                openConnectionEvent = "openConnectionEvent";
                sendStreamEvent = "sendStreamEvent";
            });

            afterEach(function () {
                EventBus.cleanBus();
            });

            describe("#registerEvent", function () {

                it("should add more events to the EventBus", function () {
                    EventBus.registerEvent(openConnectionEvent);
                    EventBus.registerEvent(sendStreamEvent);

                    expect(EventBus.getEventStackSize()).toBe(2);
                    expect(EventBus.lookupEvents()[0]).toMatch(openConnectionEvent);
                    expect(EventBus.lookupEvents()[1]).toMatch(sendStreamEvent);
                });

                it("should add more than one listener for one eventKey", function () {
                    EventBus.registerEvent(sendStreamEvent, openConnectionListener);
                    EventBus.registerEvent(sendStreamEvent, sendStreamListener);

                    expect(EventBus.getEventStackSize()).toBe(1);
                    expect(EventBus.lookupListenersByEvent(sendStreamEvent).length).toBe(2);
                });
            });

            describe("#fireEvents", function () {

                it("should fire the event triggering all listeners to act upon action", function () {
                    EventBus.registerEvent(sendStreamEvent, openConnectionListener);
                    EventBus.registerEvent(sendStreamEvent, sendStreamListener);

                    spyOn(console, 'log').andCallThrough();

                    EventBus.fireEvent(sendStreamEvent);

                    expect(console.log).toHaveBeenCalled();
                });
            });

            describe("#removeListenersForEvent", function () {

                it("should throw an error for missing eventKey", function () {
                    var failForMissingEventKey = false;

                    try {
                        EventBus.removeListenersForEvent();
                    } catch (Error) {
                        failForMissingEventKey = true;
                    }

                    expect(failForMissingEventKey).toBeTruthy();
                });

                it("should remove all listeners if not present for a specific eventKey", function() {
                    EventBus.registerEvent(openConnectionEvent, openConnectionListener);
                    EventBus.registerEvent(openConnectionEvent, sendStreamListener);

                    EventBus.removeListenersForEvent(openConnectionEvent);

                    expect(EventBus.getEventStackSize()).toBe(1);
                    expect(EventBus.lookupListenersByEvent(openConnectionEvent).length).toBe(0);
                });

                it("should remove only listeners present in the argument list for a specific event", function() {
                    EventBus.registerEvent(openConnectionEvent, openConnectionListener);
                    EventBus.registerEvent(openConnectionEvent, sendStreamListener);

                    EventBus.removeListenersForEvent(openConnectionEvent, sendStreamListener);

                    expect(EventBus.lookupListenersByEvent(openConnectionEvent).length).toBe(1);
                });
            });

            describe("#cleanBus", function () {

                it("should clean EventBus", function () {

                    EventBus.registerEvent(sendStreamEvent);
                    EventBus.registerEvent(openConnectionEvent);

                    expect(EventBus.getEventStackSize()).toBe(2);

                    EventBus.cleanBus();

                    expect(EventBus.getEventStackSize()).toBe(0);
                });

            });

        }); // end of collection fixture
    }); // end of EventBus Specs
}); // end of requireJS Module
