/**
 *
 * @author cclaudiu
 */
define(["jQuery", "EventBus"], function ($, EventBus) {

    $(document).ready(function () {
        console.info("Successfully loaded app demo page logic using requireJS");

        var notificationListener = function () {
            var buyNotification = $("#buy_notification_id");
            buyNotification.text("You've just added an item to your shopping cart");

            setTimeout(function() {
                buyNotification.text("");
            }, 2000)

        };

        var cartPopulateListener = function () {
            var cart = $("#cart_id");
            cart.text("One item added to the cart");
        };

        var mandatoryFieldsListener = function () {
            var emailField = $("#email_text_field_id");
            console.info(emailField.text());

            if(!emailField || emailField.val().length === 0) {
                alert("Missing email field!");
            }
        };

        // The interesting part is here :)
        EventBus.registerEvent("BUY_PRODUCT", mandatoryFieldsListener);
        EventBus.registerEvent("BUY_PRODUCT", cartPopulateListener);
        EventBus.registerEvent("BUY_PRODUCT", notificationListener);

        EventBus.registerEvent("SOME_OTHER_EVENT", notificationListener);

        var buyButton = $("#buy_button_id");
        buyButton.on("click", function() {
            EventBus.fireEvent("BUY_PRODUCT");
        });

    });

});
