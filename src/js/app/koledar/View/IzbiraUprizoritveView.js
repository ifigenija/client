/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'template!../tpl/dogodek-izbira.tpl'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        izbiraTpl
        ) {

    var sch = {type: 'Toone', targetEntity: 'uprizoritev', editorAttrs: {class: 'form-control'}, title: 'Uprizoritev'};

    var IzbriraUprizoritveView = Form({
        template: Handlebars.compile('<form><div data-fields="uprizoritev"></div></form>'),
        schema: {
            uprizoritev: sch
        }
    });

    return IzbriraUprizoritveView;
});