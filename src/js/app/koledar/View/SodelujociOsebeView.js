/*
 * Licenca GPLv3
 */

define([
    './SodelujociView'
], function (
        SodelujociView
        ) {

    var SodelujociOstaliView = SodelujociView.extend({
        renderiraj: function () {
            this.renderSodelujoci();
        }
    });

    return SodelujociOstaliView;
});