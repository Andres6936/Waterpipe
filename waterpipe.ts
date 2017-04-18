/*
 *  waterpipe.js - v1.0
 *  jQuery plugin. Smoky backgrounds generator
 *  http://www.dragdropsite.com
 *
 *  Made by dragdropsite.com
 *
 *  Under MIT License
 *
 *  Credits: rectangleworld.com
 */

import {Smoke} from "./src/Smoke";

(($, window: Window, document: Document, undefined) => {
    const pluginName = "waterpipe";

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new Smoke(this, options));
            }
        });

        // chain jQuery functions
        return this;
    };

})(jQuery, window, document);