/* 
 * Licenca GPLv3
 * 
 * @author Lovro Rojko
 * 
 * Vhodni podatki:
 *      - vrsta filtra
 *      - collection
 *
 * Izbira kriterijev filtra
 *
 * Izhodni podatki:
 *      - collection izbranih kriterijev
 *      
 * Api Collection View
 *  metode:
 *      - getSelectedModels
 *      - getAllModels
 *      - onChildviewSelect
 *      - resetSelection
 *      - search
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'underscore'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        _
        ) {
    /**
     * V kolikor želimo overridat ItemView, mora itemView imeti
     * event, na klick da poberemo event podatke za shift in control
     * prožit more select s event podatki kot parametrom
     * @type @exp;Marionette@pro;ItemView@call;extend
     */
    var SelectListItemView = Marionette.ItemView.extend({
        template: Handlebars.compile('{{label}}'),
        tagName: 'li',
        className: 'selectlist-item list-group-item',
        events: {
            'click': 'klikVrstica'
        },
        klikVrstica: function (e) {
            this.trigger('select', e);
        }
    });

    return SelectListItemView;
});