/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette
        ) {

    /**
     * View odgovoren za prikaz osebe
     * @type @exp;Marionette@pro;ItemView@call;extend
     */
    var OsebaView = Marionette.ItemView.extend({
        tagName: 'li',
        classname: 'oseba',
        template: Handlebars.compile('<div class="oseba">{{label}}</div>'),
        trigger: {
            'click': 'izbrana:oseba'
        }
    });

    /**
     * View odgovoren za prikaz Oseb funkcije in izbiro osebe
     * @type @exp;Marionette@pro;CompositeView@call;extend
     */
    var FunkcijaView = Marionette.CompositeView.extend({
        tagName: 'li',
        className: 'select-funkcija',
        template: Handlebars.compile('<h4 class="title">{{title}}</h4><ul class="region-osebe"></ul>'),
        childViewContainer: 'region-osebe',
        childview: OsebaView,
        onChildviewIzbranaOseba: function (child) {
            this.each(function (model) {
                model.set('izbran', false);
            });
            child.model.set('izbran', true);
            this.trigger('change', child);
        }
    });

    /**
     * View odgovoren za prikaz vseh funkcij z več kot eno osebo
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var SelectSodelujociView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'select-funkcije',
        childView: FunkcijaView,
        childViewOptions: function (model, index) {
            return{
                collection: model.get('osebe')
            };
        }
    });

    /**
     * Ko child proži change se izvede ta metoda.
     * sestavi polje    [
     *                      funkcijaid: osebaid
     *                      funkcijaid: osebaid
     *                  ]
     * @param {type} item
     * @returns {undefined}
     */
    SelectSodelujociView.prototype.onChildviewChange = function (item) {
        var funkcijaOseba = [];
        //gremo skozi vse funkcije
        this.collection.each(function (funkcija) {
            var osebe = funkcija.get('osebe');
            var osebaTemp;
            //gremo skozi vse osebe
            osebe.each(function (oseba) {
                //v primeru da je oseba izbrana
                if (oseba.get('izbrana')) {
                    osebaTemp = oseba;
                }
            });
            funkcijaOseba[funkcija.get('id')] = osebaTemp.get('id');
        });
        this.trigger('selected:model', funkcijaOseba);
    };

    return SelectSodelujociView;
});