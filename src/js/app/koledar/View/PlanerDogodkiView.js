/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'jquery',
    'moment',
    'underscore',
    'marionette',
    '../Model/RazredDogodek',
    'template!../tpl/planer-dogodek.tpl',
    'template!../tpl/planer-dogodki-termin.tpl',
    'options!dogodek.barve',
    'options!dogodek.razred'
], function (
        Radio,
        $,
        moment,
        _,
        Marionette,
        RazredDogodek,
        dogodekTpl,
        terminDogodkiTpl,
        barve,
        razredi
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
        serializeData: function () {
            var isPlaniran, isPregledan, isPotrjen, isZakljucen, isOdpovedan, isObdelanI, isObdelanT, isObdelan;
            var razredIme = razredi[this.razred].type;
            
            var barvaIzNastavitev = barve['vaja'].value;
            
            switch (this.model.get('status')) {
                case '200s':
                    isPlaniran = true;
                    break;
                case '400s':
                    isPregledan = true;
                    break;
                case '500s':
                    isPotrjen = true;
                    break;
                case '600s':
                    isZakljucen = true;
                    break;
                case '610s':
                    isOdpovedan = true;
                    break;
                case '710s':
                    isObdelanI = true;
                    break;
                case '720s':
                    isObdelanT = true;
                    break;
                case '790s':
                    isObdelan = true;
                    break;
            }
            
            return _.extend(this.model.toJSON(), {
                isPlaniran: isPlaniran,
                isPregledan: isPregledan,
                isPotrjen: isPotrjen,
                isZakljucen: isZakljucen,
                isOdpovedan: isOdpovedan,
                isObdelanI: isObdelanI,
                isObdelanT: isObdelanT,
                isObdelan: isObdelan,
                razredIme: razredIme,
                barve: barve,
                barvaBesedila: this.textColor(
                        this.model.get('barva'), barvaIzNastavitev
                        //{lightTextColor: '#ff0000', darkTextColor: '#00ff00'} 
                        //,{ darkTextColor: '#000055'} 
                        )
            });
        },
        initialize: function (options) {
            this.razred = this.model.get('razred');
        },
        onPrikazi: function () {
            var dogodekModel = this.model;
            var razred = dogodekModel.get('razred');
            var modelT;

            switch (razred) {
                case '100s':
                    modelT = new RazredDogodek({
                        id: dogodekModel.get('predstava'),
                        view: 'predstava'
                    });
                    break;
                case '200s':
                    modelT = new RazredDogodek({
                        id: dogodekModel.get('vaja'),
                        view: 'vaja'
                    });
                    break;
                case '300s':
                    modelT = new RazredDogodek({
                        id: dogodekModel.get('gostovanje'),
                        view: 'gostovanje'
                    });
                    break;
                case '400s':
                    modelT = new RazredDogodek({
                        id: dogodekModel.get('splosni'),
                        view: 'dogodekSplosni'
                    });
                    break;
                case '600s':
                    modelT = new RazredDogodek({
                        id: dogodekModel.get('tehnicni'),
                        view: 'dogodekTehnicni'
                    });
                    break;
            }
            var self = this;
            modelT.fetch({
                success: function () {
                    self.trigger('prikazi:dogodek', modelT);
                }
            });

            //poslušamo spremembe v razred model v kolikor se je model spremenil se dogodek ponovno naloži
            // ko se model ponovno naloži bo collection v katerem je prožil ponoven preračun terminov v katerega spadajo dogodki
            //v planerview vidimo poslušalca na change od collectiona dogodkov
            modelT.on('change', function () {
                dogodekModel.fetch({
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            }, this);
        },
        
        textColor: function (color, colorFromOptions, textColors ) {
            
            //see: https://github.com/bgrins/TinyColor/blob/master/tinycolor.js
            
            //console.log('textColor: color', color);
            //console.log('textColor: colorFromOptions', colorFromOptions);
            //console.log('textColor: textColors', textColors);
            
            if( !(color) || (color=='') ) { color = colorFromOptions; }
            
            var trimLeft = /^\s+/;
            var trimRight = /\s+$/;
            var textColor, brightness;
            var hex3 = /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
            var hex6 = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
            var rgb = { r: 0, g: 0, b: 0 };
            var darkTextColor  = (textColors)? textColors.darkTextColor  : '#000000',
                lightTextColor = (textColors)? textColors.lightTextColor : '#ffffff';
            
            color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
            
            if (match = hex6.exec(color)) {

                rgb.r = parseInt(match[1], 16);
                rgb.g = parseInt(match[2], 16);
                rgb.b = parseInt(match[3], 16);
                
            } else if(match = hex3.exec(color)){
                
                rgb.r = parseInt(match[1] + '' + match[1], 16);
                rgb.g = parseInt(match[2] + '' + match[2], 16);
                rgb.b = parseInt(match[3] + '' + match[3], 16);
            } else {
                return lightTextColor;
            }
            
            brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
            //console.log('brightness',  brightness );
            
            if(brightness < 128) {
                textColor = lightTextColor;
            } else {
                textColor = darkTextColor;
            }           

            return textColor;
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
            'click .brisi-dogodke': 'brisi'
        },
        initialize: function (options) {
            this.zacetek = options.zacetek || null;
            this.konec = options.konec || null;
            
            //this.listenTo(this.collection, 'all', function(event){ console.log('## Listen ... ' + event); } );
            this.listenTo(this.collection, 'add', this.showCloseButton );
            this.listenTo(this.collection, 'remove', this.hideCloseButton );

        },
        onDodaj: function () {
            this.trigger('dodaj:dogodek', {
                zacetek: this.zacetek,
                konec: this.konec,
                collection: this.collection
            });
        },
        onBrisi: function () {
            var zaIzbris = [];
            this.collection.each(function (model) {
                var zacetek = moment(model.get('zacetek'));
                var konec = moment(model.get('konec'));
                if (zacetek.diff(konec, 'days') === 0) {
                    zaIzbris.push(model);
                }
            });

            for (var key in zaIzbris) {
                zaIzbris[key].destroy({
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            }
        },
        onChildviewPrikaziDogodek: function (dogodekM, razredDogodkaM) {
            this.trigger('prikazi:dogodek', razredDogodkaM);
        },
        
        showCloseButton: function () {
            this.$('.brisi-dogodke').removeClass('brisi-hide');
        },

        hideCloseButton: function () {
            this.$('.brisi-dogodke').addClass('brisi-hide');
        }
    });
    
    return PlanerDogodkiView;
});