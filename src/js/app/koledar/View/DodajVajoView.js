/*
 * Licenca GPLv3
 */


define([
    'radio',
    'i18next',
    'moment',
    'marionette',
    'underscore',
    'jquery',
    './WizardView',
    './IzbiraRazredDogodkaView',
    './IzbiraDatumView',
    './IzbiraProstoraView'
], function (
        Radio,
        i18next,
        moment,
        Marionette,
        _,
        $,
        WizardView,
        IzbiraView,
        IzbiraDatumView,
        IzbiraProstoraView
        ) {

    var DodajVajoView = WizardView.extend({
        defView: {
            views: [
                IzbiraView,
                IzbiraProstoraView,
                IzbiraDatumView
            ],
            title: i18next.t('dogodek.dodajDogodek')
        }
    });

    DodajVajoView.prototype.initialize = function (options) {
        this.model = options.model;
    };

    return DodajVajoView;
});