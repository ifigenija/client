/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'backbone',
    'radio',
    'template!../tpl/stroskovnik.tpl',
    './StroskiUprizoritveView',
    '../Model/Stroskovnik',
    'i18next',
    'baseUrl',
    'app/bars',
    'app/Max/Module/Form'
], function (
        Marionette,
        Backbone,
        Radio,
        tpl,
        StrosekUprizoritveView,
        Stroskovnik,
        i18next,
        baseUrl,
        Handlebars,
        Form
        ) {

    var StroskovnikView = Marionette.LayoutView.extend({
        template: tpl,
        title: i18next.t('strupr.title'),
        regions: {
            regionLookup: '.region-lookup',
            regionToolbar: '.region-toolbar',
            regionEditor: '.region-editor'
        }
    });

    StroskovnikView.prototype.onRender = function () {
        this.$('.naslov-uprizoritve').text(this.title);

        var sch = {type: 'Toone', targetEntity: 'uprizoritev', editorAttrs: {class: 'form-control'}};
        this.formIzberi = new Form({
            template: Handlebars.compile('<form><div data-editors="id"></div></form>'),
            className: 'form-inline',
            schema: {
                id: sch
            }
        });
        this.formIzberi.fields.id.editor.on('changed', this.renderEditor, this);
        this.regionLookup.show(this.formIzberi);
    };

    StroskovnikView.prototype.zamenjajUrl = function (model) {
        var fragment = Backbone.history.getFragment();

        fragment = fragment.replace(/\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/, '');

        var newUrl = fragment;
        if (model) {
            newUrl = fragment + '/' + model.get('id');
        }

        Radio.channel('layout').command('replaceUrl', newUrl);
    };

    StroskovnikView.prototype.renderEditor = function (upziroritevId) {
        var editModel = new Stroskovnik.Model({id: upziroritevId});
        editModel.fetch({
                error: function () {
                    Radio.channel('error').command('flash', {
                        message: i18next.t("napaka.fetch") + ' ' + '(Stroskovnik)',
                        code:'9000007',
                        severity: 'error'
                    });
                }
            });
        
        this.zamenjajUrl(editModel);
        this.regionEditor.show(new StrosekUprizoritveView({
            model: editModel
        }));
    };
    return StroskovnikView;
});