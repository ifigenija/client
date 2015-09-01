/* 
 * Licenca GPLv3
 */

define(['backbone', 'underscore'], function (Backbone, _) {

    /**
     * Metapodatki o posameznem koledarju, ki ga imamo naloženega za prikaz
     * @type @exp;Backbone@pro;MÏodel@call;extend
     */
    
    var Koledar = Backbone.Model.extend({
        initialize: function (attrs, options) {
            this.set('dogodki', new Dogodki([], {}));
        },
        getEvents: function (start, stop, callback) {
            return this.get('dogodki').getEvents(start, stop, callback);
        }
    });

    /** 
     * krovni seznam koledarjev, ki jih imamo naložene oz kij želimo naložiti 
     */
    var Koledarji = Backbone.Collection.extend({
        model: Koledar,
        addKoledar: function (type, options) {
            var k = new Kodelar({type: type}, options);
            this.add(k);
        }
    });

    return Koledarji;
    
    
    });