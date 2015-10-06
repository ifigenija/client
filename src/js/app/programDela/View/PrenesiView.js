/* 
 * Enota programa razširi funkcionalnost postavke view,
 * s funkcijami za izris postavk enote programa,
 * da jih ne bomo pisali pri pri vsaki enoti.
 * Licenca GPLv3
 */
define([
    'marionette',
    'underscore',
    'i18next'
], function (
        Marionette,
        _,
        i18next
        ) {


    /**
     * pridobimo view ki se uporabi pri prenosu podatkov iz uprizoritve v enotoprograma
     */
    var PrenesiView = Marionette.ItemView.extend({
        tagName: 'div',
        className: 'prenesi-table',
        template: null,
        podatkiUprizoritve: null,
        jeNa: false,
        jeOznaceno: false,
        /**
         * v posameznih enotah entitete bo potrebno overridat
         * @returns {unresolved}
         */
        serializeData: function () {

            if (!this.jeNa) {
                //tantieme so avtorske pravice na predstavo
                var uDo = this.podatkiUprizoritve.Do;
                var uNa = this.podatkiUprizoritve.Na;
                uDo = _.extend({'tantieme': uNa.avtorskePravice}, uDo);

                uDo.avtorskePravice += uNa.avtorskePravice;
                uDo.avtorskiHonorarji += uNa.avtorskiHonorarji;
                uDo.avtorskiHonorarjiSamoz += uNa.avtorskiHonorarjiSamoz;
                uDo.materialni += uNa.materialni;

                this.podatkiUprizoritve.NaDo = uDo;

            } else {
                var vsotaPon = this.vsotaPonovitev(this.model);
                var na = _.clone(this.podatkiUprizoritve.Na);

                //avtorskih pravic ni pri ponovitvah
                var naDo = {
                    avtorskiHonorarji: na.avtorskiHonorarji * vsotaPon,
                    avtorskiHonorarjiSamoz: na.avtorskiHonorarjiSamoz * vsotaPon,
                    tantieme: na.avtorskePravice * vsotaPon,
                    materialni: na.materialni * vsotaPon
                };

                naDo.nasDelez = naDo.avtorskiHonorarji + naDo.tantieme + naDo.avtorskePravice + naDo.materialni;
                naDo.steviloPonovitev = vsotaPon;

                this.podatkiUprizoritve.NaDo = _.extend(na, naDo);
            }

            var podatki = _.extend(this.model.toJSON(), {
                uprizoritevData: this.podatkiUprizoritve
            });

            return podatki;
        },
        triggers: {
            'click .izberi-check': 'izberi:vse'
        },
        onIzberiVse: function () {
            if (this.jeOznaceno) {
                this.$('input').each(function () {
                    this.checked = false;
                });
                this.jeOznaceno = false;
                this.$('.izberi-check').html(i18next.t("std.obkljukaj"));
            } else {
                this.$('input').each(function () {
                    this.checked = true;
                });
                this.jeOznaceno = true;
                this.$('.izberi-check').html(i18next.t("std.odkljukaj"));
            }
        },
        vsotaPonovitev: function (model) {
            var temp = model.get('ponoviDoma');
            var ponoviDoma = temp ? temp : 0;

            temp = model.get('ponoviZamejo');
            var ponoviZamejo = temp ? temp : 0;

            temp = model.get('ponoviGost');
            var ponoviGost = temp ? temp : 0;

            temp = model.get('ponoviInt');
            var ponoviInt = temp ? temp : 0;
            
            temp = model.get('ponoviKopr');
            var ponoviKopr = temp ? temp : 0;


            return ponoviDoma + ponoviZamejo + ponoviGost + ponoviInt + ponoviKopr;
        }
    });

    PrenesiView.prototype.oznaciCheckboxe = function () {
        //pri vrednostih, ki se razlikujejo, označi checkbox
    };

    return PrenesiView;
});