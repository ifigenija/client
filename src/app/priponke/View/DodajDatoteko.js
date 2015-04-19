define([
    'application',
    'backbone',
    'marionette',
    'underscore',
    'text!../tpl/nova-datoteka.tpl',
    'text!../tpl/uredi-datoteka.tpl',
    '../Model/Datoteka'
], function(App, Backbone, Marionette, _, tpl, tplUredi, Datoteka) {

    var DodajDatoteko = Marionette.ItemView.extend({
        template: _.template(tpl),
        initialize: function(options) {
            this.model = options.model || new Datoteka();
            this.priponka = options.priponka || null;
            if (this.priponka) {
                if (this.model.isNew()) {
                    this.model.set('naziv', this.priponka.get('naziv'));
                }
            }
            this.edit = options.edit || false;
            if (this.edit) {
                this.template = _.template(tplUredi);
            }
            this.mapa = options.mapa || null;

        },
        ui: {
            'btnIzberi': '.izberi',
            'inpStevilka': '#stevilka',
            'inpNaziv': '#naziv'
        },
        events: {
            'click #ustvari-datoteko': 'ustvariDatoteko',
            'click #izberi-datoteko': 'datotekaIzbrana',
            'click #uredi-datoteko': 'ustvariDatoteko',
            'click .izberi': 'datotekaIzbrana',
            'change #samodejnaStevilka': 'toggleStevilkaInput'
        },
        vklopiGumb: function(model) {
            if (model) {
                this.izbranaDatoteka = model;
                this.ui.btnIzberi.prop('disabled', false);
            } else {
                this.izbranaDatoteka = null;
                this.ui.btnIzberi.prop('disabled', true);
            }
        },
        ustvariDatoteko: function() {
            var self = this;
            var stvCheck = this.$('#samodejnaStevilka')[0];
            var generiraj = false;
            if (typeof stvCheck !== 'undefined') {
                if (stvCheck.checked) {
                    generiraj = stvCheck.checked;
                }
            }
            this.model.save({
                naziv: this.ui.inpNaziv.val(),
                stevilka: this.ui.inpStevilka.val(),
                generiraj: generiraj,
                priponka: self.priponka ? self.priponka.id : '',
                mapa: self.mapa ? self.mapa.id : ''
            }, {
                success: function(model, response, options) {
                    if (self.mapa) {
                        var dat = self.mapa.get('datoteke');
                        dat.push(model.id);
                        self.mapa.save({datoteke: dat}, {
                            success: function(mapa, response) {
                                self.trigger('datoteka:izbrana', model);
                            },
                            error: App.FlashManager.fromXhr
                        });
                    }
                    if (self.priponka) {
                        self.priponka.fetch({
                            success: function(priponka, response) {
                                self.trigger('datoteka:izbrana', priponka);
                            },
                            error: App.FlashManager.fromXhr
                        });
                    }
                },
                error: App.FlashManager.fromXhr
            });
        },
        datotekaIzbrana: function(e) {
            var self = this;
            if (this.mapa) {
                var dat = this.mapa.get('datoteke');

                dat.push(this.izbranaDatoteka.id);
                this.mapa.save({datoteke: dat}, {
                    success: function(mapa, response) {
                        self.trigger('datoteka:izbrana', self.izbranaDatoteka);
                    },
                    error: App.FlashManager.fromXhr
                });
            }
            if (this.priponka) {
                this.priponka.save({datoteka: this.izbranaDatoteka.id}, {
                    success: function(datoteka, response) {
                        self.trigger('datoteka:izbrana', self.izbranaDatoteka);
                    },
                    error: App.FlashManager.fromXhr
                });
            }

        },
        toggleStevilkaInput: function(e) {
            if (e.target.checked) {
                this.ui.inpStevilka.val('');
            }
            this.ui.inpStevilka.prop('disabled', e.target.checked);
        }


    });
    return DodajDatoteko;
});