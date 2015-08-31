/* 
 * Licenca GPLv3
 */

/* 
 * Licenca GPLv3
 */

define(['backbone', 'underscore', 'radio', 'baseUrl', 'app/Max/Model/MaxPageableCollection'], function (Backbone, _, Radio, baseUrl, Pageable) {

    /**
     * Metapodatki o posameznem koledarju, ki ga imamo naloženega za prikaz
     * @type @exp;Backbone@pro;MÏodel@call;extend
     */

    var Resurs = Backbone.Model.extend({
        initialize: function (attrs, options) {
            
        }
    });


    /** 
     * krovni seznam koledarjev, ki jih imamo naložene oz kij želimo naložiti 
     */
    var ResProstoriCollection = Pageable.extend({
        model: Resurs,
        mode: "server",        
        initialize: function () {
            _.bindAll(this, 'getResources');
        },
        url: function () {
            return baseUrl + '/rest/prostor';
        },
        /**
         * Ustvari definicijo resource groupe
         * @returns {undefined}
         */
        getResDef: function () {
            return {
                eventResourceField: 'prostor',
                resourceGroupText: function (x) {
                    return x.popa.label;
                }
            };
        },
        /**
         * TRansformira kolekcijo v seznam resursov
         * 
         * @returns {Resursi_L9.ResursiAnonym$2@call;map}
         */
        transformResources: function () {
            var a =  this.map(function (r) {
                var p = r.get('popa');
                return {
                    id: r.get('id'),
                    title: r.get('naziv'),
                    groupId: p ? p.id : 'Doma',
                    groupText: p ? p.label: ''  
                };
            });
            console.log(a);
            return a;
        },
        /**
         * Funkcija, ki jo pokliče fullcalendar
         * 
         * @param {type} callback
         * @returns {undefined}
         */
        getResources: function (callback) {
            var self= this;
            if (this.length === 0) {
                this.fetch({
                    success: function (coll, resp, xhr) {
                        var resources;
                        callback(self.transformResources());
                    },
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            } else {
                callback(self.transformResources());
            }
        }
    });



    return {
        prostori: new ResProstoriCollection()// ,
//        osebe: new ResOsebeCollection(),
//        uprizoritve: new ResUprizoritveCollection()
    };


});


