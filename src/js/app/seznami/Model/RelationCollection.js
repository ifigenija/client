define([
    'baseUrl',
    'backbone',
    'radio',
    'underscore'
], function (baseUrl, Backbone, Radio, _) {
    
    /**
     *  Potrebujemo parametre za gradnjo urlja.
     *  parametri so:
     *  owner - entiteta, ki je lastnik asociacije
     *  ownerid - id ownerja
     *  relation - ime relacije
     *  
     * @type @exp;Backbone@pro;Collection@call;extend
     */
    var RelationCollection = Backbone.Collection.extend({
        model: Backbone.DeepModel,
        initialize: function (models, options) {
            options = options || {};
            this.owner = options.owner || null;
            this.relation = options.relation || null;
            this.ownerId = options.ownerId || null;
            this.view = options.view || "default";
        },
        url: function () {
            return baseUrl + '/rest/' + this.owner + '/' + this.view + '/' + this.ownerId + '/' + this.relation;
        }
    });
    
    return RelationCollection;
});