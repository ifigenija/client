/* 
 * Skupek filtrov za standardno listanje koledarja
 * Licenca GPLv3
 */
define(['marionette',
    'template!../tpl/basic-filter.tpl'
], function (Marionette, tpl) {

    var BasicFilter = Marionette.LayoutView.extend({
        triggers: {
            'submit form' : 'form:submit'
        },
        template: tpl,
        onFormSubmit: function () {
            this.trigger('filter', {
                q: this.$('input').val()
            });
        }
    });
    
    
    return BasicFilter;
});

