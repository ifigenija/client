/* 
 * Licenca GPL V3 or later
 *  
 */


define([
    'jquery',
    'underscore',
    'marionette',
    './Button/Button',
    './Button/SelectTableButton',
    './Button/PrintDokumentButton',
    'text!../tpl/button.tpl',
    '../Model/Kontekst',
    './Button/DropDownButton',
    './Button/KontekstButton',
    './Button/RpcButton',
    './Button/PriponkeButton'

], function ($,
        _,
        Marionette,
        Button,
        SelectTableButton,
        PrintDokumentButton,
        tplButton,
        KontekstModel,
        DropDownButton,
        KontekstButton,
        RpcButton,
        PriponkeButton
        ) {



    var LinkButton = Button.extend({
        tagName: 'a',
        initialize: function (options) {
            _.extend(this, _.pick(options, 'size', 'listener', 'form'));
            this.$el.attr('href', this.model.get('uri'));
        }
    });
    var HelpButton = Button.extend({
        events: {'click': 'click'},
        click: function () {
            this.$el.toggleClass('active');
            var form = this.model.get('form');
            if (form) {
                form.$('.help-block').toggleClass('hidden');
                form.$('p.cb-help-block').toggleClass('hidden');
            } else {
                $('.help-block').toggleClass('hidden');
                $('p.cb-help-block').toggleClass('hidden');
            }
        }
    });
    var SaveButton = Button.extend({
        events: {'click': 'click'},
        click: function () {
            var andNew = false;
            if (this.model.get('form')) {
                if (this.model.get('andNew') === true) {
                    andNew = true;
                }
                if (this.listener) {
                    Marionette.triggerMethod.call(this.listener, 'save:form', this.model.get('form'), andNew);
                } else {
                    if (this.model.get('listener')) {
                        Marionette.triggerMethod.call(this.model.get('listener'), 'save:form', this.model.get('form'), andNew);
                    }
                }
            }
        }
    });

    var TriggerButton = Button.extend({
        events: {'click': 'click'},
        click: function () {
            if (this.model.get('trigger')) {
                if (this.listener) {
                    Marionette.triggerMethod.call(this.listener, this.model.get('trigger'), this.model.get('data'));
                } else {
                    if (this.model.get('listener')) {
                        Marionette.triggerMethod.call(this.model.get('listener'), this.model.get('trigger'), this.model.get('data'));
                    }
                }
                
            }
        }
    });
    var DeleteButton = Button.extend({
        events: {'click': 'click'},
        click: function () {
            var f;
            f = $('input[name="btnDelete"]')[0];
            if (typeof f !== 'undefined') {
                f.click();
            }
        }
    });
    var PocistiButton = Button.extend({
        events: {'click': 'click'},
        click: function () {
            $('#izborakcija').val('prazni');
            $("form[name=izbor]").submit();
        }
    });
    var RefreshButton = Button.extend({
        events: {'click': 'click'},
        click: function () {
            window.App.TabLayout.refreshFragment();
        }
    });

    return  {
        'button-link': LinkButton,
        'button-help': HelpButton,
        'button-form-help': HelpButton,
        'button-save': SaveButton,
        'button-trigger': TriggerButton,
        'button-delete': DeleteButton,
        'button-pocisti': PocistiButton,
        'button-printdokument': PrintDokumentButton,
        'button-refresh': RefreshButton,
        'button-selectTab': SelectTableButton,
        'button-priponke': PriponkeButton,
        'button-dropdown': DropDownButton,
        'button-kontekst': KontekstButton,
        'button-rpc': RpcButton
    };
});