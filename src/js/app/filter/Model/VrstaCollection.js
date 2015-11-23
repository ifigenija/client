define([
    'radio',
    'i18next',
    'baseUrl',
    'backbone',
    'underscore',
    '../View/DualListView',
    '../View/AktivnaVrstaView',
    '../View/PovzetekView',
    '../View/SelectListItemView'
], function (
        Radio,
        i18next,
        baseUrl,
        Backbone,
        _,
        DualListView,
        AktivnaVrstaView,
        PovzetekView,
        SelectListItemView
        ) {
    /**
     * Parametri
     *      - title
     *      - icon
     *      - stIzpisov
     *      - SelectView
     *      - ItemView
     *      - itemTpl
     *      - mozni, (podatki, ki jih lahko izbiramo)
     *      - izbrani (izbrani podatki)
     * @param Array attr
     * @returns {undefined}
     */
    var VrstaModel = Backbone.Model.extend({
        defaults: {
            title: i18next.t('std.title'),
            vrsta: 'nedoloceno',
            icon: 'fa fa-tablet',
            stIzpisov: 2,
            AktivnaVrstaView: AktivnaVrstaView,
            aktivnaVrstaTpl: null,
            PovzetekView: PovzetekView,
            povzetekTpl: null,
            SelectView: DualListView,
            ItemView: SelectListItemView,
            itemTpl: null,
            mozni: new Backbone.Collection(),
            izbrani: new Backbone.Collection()
        }
    });

    VrstaModel.prototype.initialize = function (attr) {
        this.attributes = _.extend(this.attributes, attr);
        
        if(attr.mozni){
            var mozni = attr.mozni;
            if(_.isArray(mozni)){
                
            }else if(_.isObject(mozni)){
                
            }else if(mozni instanceof Backbone.Collection){
                
            }
        }
    };

    var VrstaCollection = Backbone.Collection.extend({
        model: VrstaModel
    });

    return VrstaCollection;
});