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

    var OsebaNovaEditView = OsebaEditView.extend({

        tabs: [{
                name: i18next.t('seznami.view.splosno'),
                event: 'splosni'
            }]
    });
    
    return OsebaNovaEditView;
});
