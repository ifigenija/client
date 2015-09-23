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
                this.podatkiUprizoritve.Do = _.extend({'tantieme': this.podatkiUprizoritve.Na.avtorskePravice}, this.podatkiUprizoritve.Do);
                this.podatkiUprizoritve.NaDo = this.podatkiUprizoritve.Do;
            } else {
                var vsotaPon = this.vsotaPonovitev(this.model);
                var na = this.podatkiUprizoritve.Na;

                //avtorskih pravic ni pri ponovitvah
                this.podatkiUprizoritve.NaDo = {
                    avtorskiHonorarji: na.avtorskiHonorarji * vsotaPon,
                    avtorskiHonorarjiSamoz: na.avtorskiHonorarjiSamoz * vsotaPon,
                    tantieme: na.avtorskePravice * vsotaPon,
                    materialni: na.materialni * vsotaPon
                };

                var naDo = this.podatkiUprizoritve.NaDo;
                naDo.nasDelez = naDo.avtorskiHonorarji + naDo.tantieme + naDo.avtorskePravice + naDo.materialni;
                naDo.steviloPonovitev = vsotaPon;
            }

            return _.extend(this.model.toJSON(), {
                uprizoritevData: this.podatkiUprizoritve
            });
        },
        triggers: {
            'click .izberi-check': 'izberi:vse'
        },
        onIzberiVse: function () {
            if (this.jeOznaceno) {
                this.$('input').each(function(){
                    this.checked = false;
                });
                this.jeOznaceno = false;
                this.$('.izberi-check').html(i18next.t("std.obkljukaj"));
            }else{
                this.$('input').each(function(){
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


            return ponoviDoma + ponoviZamejo + ponoviGost + ponoviInt;
        }
    });

    PrenesiView.prototype.oznaciCheckboxe = function () {
        //pri vrednostih, ki se razlikujejo, označi checkbox
    };

    return PrenesiView;
});