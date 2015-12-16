/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'baseUrl',
    'backbone',
    'app/Max/Model/MaxPageableCollection',
    'underscore',
    'moment',
    'deep-model',
    './Dogodki'
], function (
        baseUrl,
        Backbone,
        Pageable,
        _,
        moment,
        Dogodki
        ) {

    var PlanerModel = Backbone.DeepModel.extend({
        datum: moment(),
        dopoldanColl: new Dogodki(),
        popoldanColl: new Dogodki(),
        zvecerColl: new Dogodki()
    });

    var PlanerCollection = Backbone.Collection({
        model: PlanerModel
    });

    return PlanerCollection;

});


