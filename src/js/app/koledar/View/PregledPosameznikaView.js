/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    './TerminStoritveView',
    './KoledarPosameznikaView',
    './PregledView'
], function (
        i18next,
        TerminStoritveView,
        KoledarPosameznikaView,
        PregledView
        ) {

    var PregledPosameznikaView = PregledView.extend({
        title: i18next.t('koledar.posameznik'),
        KoledarView: KoledarPosameznikaView,
        buttons: {
            natisni: {
                id: 'planer-natisni',
                label: i18next.t('std.tiskanje'),
                element: 'button-trigger',
                trigger: 'natisni'
            }
        }
    });

    /**
     * Funkcija se kliče ko KoledarTerminStoritveView proži uredi:event
     * Funkcija je odgovorna da prikaže podatke terminStoritvei(terminaStoritve)
     * @param {type} model
     * @returns {undefined}
     */
    PregledPosameznikaView.prototype.urediEvent = function (model) {
        var terminStoritveView = new TerminStoritveView({
            model: model
        });

        //zapiranje forme
        terminStoritveView.on('skrij', function () {
            this.contentR.empty();
            this.renderToolbar();
        }, this);

        this.contentR.show(terminStoritveView);
        this.toolbarR.empty();
    };

    return PregledPosameznikaView;
});
