/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/Oseba/OsebaEditView',
    'i18next'
], function (
        OsebaEditView,
        i18next
        ) {

    var OsebaKontaktnaEditView = OsebaEditView.extend({

        tabs: [{
                name: i18next.t('seznami.view.splosno'),
                event: 'splosni'
            },
            {
                name: i18next.t('seznami.view.oseba.kontakti'),
                event: 'kontakti'
            }]
    });
    
    return OsebaKontaktnaEditView;
});
