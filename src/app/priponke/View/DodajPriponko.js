define([
    'application',
    'backbone',
    'marionette',
    'underscore',
    'text!../tpl/nova-priponka.tpl',
    '../Model/Priponka',
    'app/Max/View/ToOneLookup'
],
        function(App, Backbone, Marionette, _, tpl, Priponka, Lookup) {

            return Marionette.ItemView.extend({
                template: _.template(tpl),
                events: {
                    'click button.preklici': 'preklici',
                    'click button.shrani': 'shraniPriponko'
                },
                ui: {
                    'naziv': '#priponka-naziv',
                    'tip': '#priponka-tip',
                },
                onRender: function() {

                    this.tdok = new Lookup({
                        entity: 'Tdok',
                        minLength: 2,
                        el: this.$('.lookup'),
                        initialId: this.priponka ? this.priponka.get('tdok') : ''
                    });
                    this.tdok.render();
                    if (this.priponka) {
                        this.ui.naziv.val(this.priponka.get('naziv'));
                        var v = this.priponka.get('jeMapa') ? 'folder' : 'file';
                        this.ui.tip.val(v);
                    }
                },
                initialize: function(options) {
                    this.vent = options.vent;
                    this.priponka = options.priponka;
                    this.owner = options.owner;
                    this.ownerClass = options.ownerClass;
                    this.kolekcija = options.kolekcija;

                },
                preklici: function() {
                    this.trigger.trigger('priponka:refresh');
                    return false;
                },
                shraniPriponko: function(e) {

                    var ime = this.ui.naziv.val();
                    var tip = this.ui.tip.val();
                    var tdok = this.tdok.getValue();
                    e.preventDefault();
                    if (tdok === '') {
                        tdok = null;
                    }
                    if (!this.priponka) {
                        this.priponka = new Priponka();
                    }
                    var self = this;
                    this.priponka.bind('invalid', App.FlashManager.invalid, this);
                    this.priponka.save({
                        naziv: ime,
                        jeMapa: tip === 'file' ? false : true,
                        tdok: tdok,
                        lastnik: this.owner,
                        zaklenjena: false,
                        classLastnika: this.ownerClass
                    }, {
                        success: function(model, response) {
                            self.kolekcija.add(model);
                            self.trigger('priponka:refresh', model);
                        },
                        error: App.FlashManager.fromXhr
                    });
                    return false;

                },
            });
        });