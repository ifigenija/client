/* 
 * Licenca GPLv3
 */

define([
    'marionette',
    'backbone',
    'moment',
    'underscore',
    'jquery',
    '../Model/RazredDogodek',
    'template!../tpl/planer-dogodek.tpl',
    'template!../tpl/planer-dogodki-termin.tpl'
], function (
        Marionette,
        Backbone,
        moment,
        _,
        $,
        RazredDogodek,
        dogodekTpl,
        terminDogodkiTpl
        ) {

    /**
     * Prikazuje posamezen dogodek 
     * @type @exp;Marionette@pro;ItemView@call;extend
     */
    var DogodekItemView = Marionette.ItemView.extend({
        className: 'planer-dogodek',
        template: dogodekTpl,
        triggers: {
            'click': 'prikazi'
        },
        onPrikazi: function () {
            var dogodekModel = this.model;
            var razred = dogodekModel.get('razred');
            var modelT;

            if (razred === '100s') {
                modelT = new RazredDogodek({
                    id: dogodekModel.get('predstava'),
                    view: 'predstava'
                });
            } else if (razred === '200s') {
                modelT = new RazredDogodek({
                    id: dogodekModel.get('vaja'),
                    view: 'vaja'
                });
            } else if (razred === '300s') {
                modelT = new RazredDogodek({
                    id: dogodekModel.get('gostovanje'),
                    view: 'gostovanje'
                });

            } else if (razred === '400s') {
                modelT = new RazredDogodek({
                    id: dogodekModel.get('splosni'),
                    view: 'dogodekSplosni'
                });

            } else if (razred === '500s') {

            } else if (razred === '600s') {
                modelT = new RazredDogodek({
                    id: dogodekModel.get('tehnicni'),
                    view: 'dogodekTehnicni'
                });

            }
            var self = this;
            modelT.fetch({
                success: function () {
                    self.trigger('prikazi:dogodek', modelT);
                }
            });
        }
    });


    /**
     * Odgovoren za prika seznama dogodkov v določenem terminu
     * znotraj posameznega dela dneva 
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var PlanerDogodkiView = Marionette.CompositeView.extend({
        className: 'planer-termin',
        template: terminDogodkiTpl,
        childViewContainer: ".dogodki-container",
        childView: DogodekItemView,
        triggers: {
            'click .dodaj-dogodek': 'dodaj',
            'click .odstrani-dogodke': 'odstrani'
        },
        initialize: function(options){
            this.zacetek = options.zacetek || null;
            this.konec = options.konec || null;
        },
        onDodaj: function () {
            this.trigger('dodaj:dogodek', {
                zacetek: this.zacetek,
                konec: this.konec,
                collection: this.collection
            });
        },
        onOdstrani: function () {
            this.trigger('odstrani:dogodke');
        },
        onChildviewPrikaziDogodek: function (dogodekM, razredDogodkaM) {
            this.trigger('prikazi:dogodek', razredDogodkaM);
        }
    });

    return PlanerDogodkiView;
});