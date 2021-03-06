/* 
 * Licenca GPLv3
 */
define([
    'baseUrl',
    'radio',
    'i18next',
    'app/Dokument/View/DokumentView',
    'template!../tpl/program-dokument.tpl',
    'template!../tpl/program-form.tpl',
    'template!../tpl/kazalniki-table.tpl',
    'formSchema!programDela',
    'app/Max/View/TabControl',
    'app/Zapisi/View/ZapisiLayout',
    'marionette',
    'app/produkcija/Model/Sezona',
    'app/Max/View/Confirm',
    'print-dialog',
    'app/Max/Module/Form',
    'template!../tpl/program-izpis.tpl',
    'app/bars',
    '../Model/ProgramSeznam',
    './UvozProgramskeModal',
    'jquery',
    'jquery.jsonrpc'
], function (
        baseUrl,
        Radio,
        i18next,
        DokumentView,
        dokumentTpl,
        formTpl,
        kazalnikiTabelaTpl,
        formSchema,
        TabControl,
        ZapisiLayout,
        Marionette,
        SezonaModel,
        confirm,
        PrintDialog,
        Form,
        PrintOptsTpl,
        Handlebars,
        ProgramSeznamModel,
        UvozModal,
        $
        ) {

    var ch = Radio.channel('layout');

    /**
     * Različni pogledi na program dokument view
     * @type Array
     */
    var tabVse = [
        {
            title: i18next.t('ent.d.splosno'),
            name: i18next.t('ent.splosno'),
            event: 'splosni'
        },
        {
            title: i18next.t('programDela.d.sklopEna'),
            name: i18next.t('programDela.sklopEna'),
            event: 'sklopEna'
        },
        {
            title: i18next.t('programDela.d.sklopDva'),
            name: i18next.t('programDela.sklopDva'),
            event: 'sklopDva'
        },
        {
            title: i18next.t('kazalnik.d.kazalniki'),
            name: i18next.t('kazalnik.naslov'),
            event: 'kazalniki'
        },
        {
            title: i18next.t('programDela.d.cDva'),
            name: i18next.t('programDela.cDva'),
            event: 'cDva'
        }
    ];

    var tabNovi = [
        {name: i18next.t('ent.splosno'), event: 'splosni'}
    ];

    /**
     * tabi posameznih sklopov
     * @type Array
     */
    var tabSklopDva = [
        {name: i18next.t('gostovanje.title'), event: 'gostovanja'},
        {name: i18next.t('festival.title'), event: 'festivali'},
        {name: i18next.t('programRazno.title'), event: 'razni'},
        {name: i18next.t('izjemni.title'), event: 'izjemni'}
    ];

    var tabSklopEna = [
        {name: i18next.t('premiera.title'), event: 'premiere'},
        {name: i18next.t('ponovitevPremiere.title'), event: 'ponovitvePremier'},
        {name: i18next.t('ponovitevPrejsnjih.title'), event: 'ponovitvePrejsnjih'},
        {name: i18next.t('gostujoca.title'), event: 'gostujoci'}
    ];

    var ProgramDokView = DokumentView.extend({
        template: dokumentTpl,
        formTemplate: formTpl,
        schema: formSchema.toFormSchema().schema,
        regions: {
            premiereR: '.region-premiere',
            ponovitvePremierR: '.region-ponovitvePremier',
            ponovitvePrejsnjihR: '.region-ponovitvePrejsnjih',
            gostovanjaR: '.region-gostovanja',
            gostujociR: '.region-gostujoci',
            izjemniR: '.region-izjemni',
            festivaliR: '.region-festivali',
            razniR: '.region-razni',
            kazalnikiR: '.region-kazalniki',
            cDveR: '.region-cdve',
            tabsR: '.programDela-tabs',
            sklopEnaR: '.sklopEna-tabs',
            sklopDvaR: '.sklopDva-tabs',
            prilogeR: '.region-priloge',
            regionToolbar: '.region-doctoolbar'
        },
        buttons: {
            shrani: {
                id: 'doc-shrani',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'doc-preklici',
                label: i18next.t('std.zapri'),
                element: 'button-trigger',
                trigger: 'preklici'
            },
            print: {
                id: 'doc-print',
                icon: 'fa fa-print',
                label: i18next.t('std.tiskanje'),
                element: 'button-trigger',
                trigger: 'print',
            },
            nasvet: {
                id: 'doc-nasvet',
                icon: 'fa fa-info',
                title: i18next.t('std.pomoc'),
                element: 'button-trigger',
                trigger: 'nasvet'
            },
            kloniraj: {
                id: 'doc-kloniraj',
                icon: 'fa fa-clone',
                title: i18next.t('std.kloniraj'),
                element: 'button-trigger',
                trigger: 'kloniraj'
            },
            uvozi: {
                id: 'doc-uvozi',
                icon: 'fa fa-arrow-circle-o-down',
                title: i18next.t('std.uvozi'),
                element: 'button-trigger',
                trigger: 'uvozi'
            },
            brisi: {
                id: 'doc-brisi',
                icon: 'fa fa-trash',
                title: 'Briši program dela',
                element: 'button-trigger',
                trigger: 'brisi'
            },
            zakleni: {
                id: 'doc-zakleni',
                label: i18next.t('std.zakleni'),
                element: 'button-trigger',
                trigger: 'zakleni'
            }
        },
        onPrint: function () {
            var itemtpl = Handlebars.compile('\
      <div class="form-group field-{{ key }}">\
      <label for="{{ editorId }}">{{ title }}</label>\
      <div class="input-group" data-editor></div></div>');
            var params = new Form({
                schema: {
                    jePs1: {
                        name: "ps1",
                        type: "Checkbox",
                        title: "Prog. sklop 1",
                        help: "",
                        editorAttrs: {},
                        template: itemtpl
                    },
                    jePs2: {
                        name: "ps2",
                        type: "Checkbox",
                        title: "Prog. sklop 2",
                        help: "",
                        editorAttrs: {},
                        template: itemtpl
                    },
                    jeKaz: {
                        name: "kaz",
                        type: "Checkbox",
                        title: "Kazalniki",
                        help: "",
                        editorAttrs: {},
                        template: itemtpl
                    },
                    jeC2: {
                        name: "c2",
                        type: "Checkbox",
                        title: "Priloga C2",
                        help: "",
                        editorAttrs: {},
                        template: itemtpl
                    },
                    jeZapis: {
                        name: "zapis",
                        type: "Checkbox",
                        title: "Brez prilog",
                        help: "",
                        editorAttrs: {},
                        template: itemtpl
                    }
                },
                template: PrintOptsTpl,
                data: {
                    jePs1: true,
                    jePs2: true,
                    jeKaz: true,
                    jeC2: true,
                    jeZapis: false
                }
            });

            this.dialog = new PrintDialog({
                params: params,
                pdf: true,
                html: true,
                sync: true
            });
            this.dialog.on('akcija', this.izvediPrint, this);
            this.dialog.modal();
        },
        izvediPrint: function () {
            var self = this;
            var rpc = new $.JsonRpcClient({
                ajaxUrl: baseUrl + '/rpc/programdela/programdela'
            });

            this.dialog.triggerMethod('loading');
            var params = this.dialog.params.getValue();
            var prtopt = this.dialog.model.toJSON();
            rpc.call(
                    'tiskajDokument', {
                        dokument: this.model.get('id'),
                        options: {
                            jePs1: params.jePs1,
                            jePs2: params.jePs2,
                            jeKaz: params.jeKaz,
                            jeC2: params.jeC2,
                            jeZapis: params.jeZapis,
                            html: prtopt.html,
                            pdf: prtopt.pdf,
                            sync: prtopt.sync
                        },
                    },
                    this.dialog.success,
                    this.dialog.error
                    );
        }
    });

    var chPermission = Radio.channel('global');

    ProgramDokView.prototype.onFormChange = function () {
        var tb = this.getToolbarModel();
        var butS = tb.getButton('doc-shrani');
        var butP = tb.getButton('doc-preklici');

        if (butS && butS.get('disabled')) {
            butS.set({
                disabled: false
            });
        }

        if (butS && !butS.get('disabled')) {
            butP.set({
                label: i18next.t('std.preklici')
            });
        }
    };

    ProgramDokView.prototype.render = function () {
        var self = this;

        if (this.model.get('zakljuceno')) {
            self.buttons.zakleni = {
                id: 'doc-zakleni',
                label: i18next.t('std.odkleni'),
                element: 'button-trigger',
                trigger: 'odkleni'
            };
        } else {
            self.buttons.zakleni = {
                id: 'doc-zakleni',
                label: i18next.t('std.zakleni'),
                element: 'button-trigger',
                trigger: 'zakleni'
            };
        }
        DokumentView.prototype.render.apply(this, arguments);
    };

    /**
     * Ko kliknemo na gumb kloniraj v toolbaru programadela
     * @returns {undefined}
     */
    ProgramDokView.prototype.onKloniraj = function () {

        var success = function () {
            Radio.channel('error').command('flash', {
                message: i18next.t("std.uspeh.kloniranje"),
                code: '9000702',
                severity: 'success'
            });
        };

        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/programDela/programDela'});
        rpc.call('kloniraj', {
            'programDelaId': this.model.get('id')
        },
        success,
                Radio.channel('error').request('handler', 'xhr'));
    };

    /**
     * Ko kliknemo na gumb zakleni v toolbaru programadela
     * @returns {undefined}
     */
    ProgramDokView.prototype.onZakleni = function () {
        var dovoljeno = chPermission.request('isGranted', "ProgramDela-lock");

        if (dovoljeno) {
            var self = this;

            var success = function () {
                var tb = self.getToolbarModel();
                var but = tb.getButton('doc-zakleni');
                but.set({
                    disabled: false,
                    label: i18next.t('std.odkleni'),
                    trigger: 'odkleni'
                });

                Radio.channel('error').command('flash', {
                    message: i18next.t("std.uspeh.zakleni"),
                    code: '9000703',
                    severity: 'success'
                });
            };

            var error = function (error) {
                Radio.channel('error').command('flash', {
                    message: error.message,
                    code: error.code,
                    severity: error.severity
                });
            };

            var zakleni = function () {
                var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/programDela/programDela'});
                rpc.call('zakleni', {
                    'programDelaId': self.model.get('id')
                },
                success, error);
            };

            confirm({
                text: i18next.t('std.potrdiZaklep'),
                modalOptions: {
                    title: i18next.t("std.zaklepPD"),
                    okText: i18next.t("std.zakleni")
                },
                ok: zakleni
            });
        } else {
            Radio.channel('error').command('flash', {
                message: i18next.t('nakapa.dovoljenje'),
                code: 9001000,
                severity: 'info'
            });
        }
    };
    /**
     * Ko kliknemo na gumb zakleni v toolbaru programadela
     * @returns {undefined}
     */
    ProgramDokView.prototype.onOdkleni = function () {
        var dovoljeno = chPermission.request('isGranted', "ProgramDela-unlock");

        if (dovoljeno) {
            var self = this;

            var success = function () {
                var tb = self.getToolbarModel();
                var but = tb.getButton('doc-zakleni');
                but.set({
                    disabled: false,
                    label: i18next.t('std.zakleni'),
                    trigger: 'zakleni'
                });

                Radio.channel('error').command('flash', {
                    message: i18next.t("std.uspeh.odkleni"),
                    code: '9000703',
                    severity: 'success'
                });
            };

            var error = function (error) {
                Radio.channel('error').command('flash', {
                    message: error.message,
                    code: error.code,
                    severity: error.severity
                });
            };

            var odkleni = function () {
                var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/programDela/programDela'});
                rpc.call('odkleni', {
                    'programDelaId': self.model.get('id')
                },
                success, error);
            };

            confirm({
                text: i18next.t('std.potrdiOdklep'),
                modalOptions: {
                    title: i18next.t("std.odklepPD"),
                    okText: i18next.t("std.odkleni")
                },
                ok: odkleni
            });
        } else {
            Radio.channel('error').command('flash', {
                message: i18next.t('nakapa.dovoljenje'),
                code: 9001000,
                severity: 'info'
            });
        }
    };

    /**
     * Ko kliknemo na gumb preklici
     * @returns {undefined}
     */
    ProgramDokView.prototype.onPreklici = function () {
        var ch = Radio.channel('layout');
        require(['app/programDela/View/ProgramView'], function (View) {
            var view = new View();
            ch.command('open', view, i18next.t('programDela.title'));
        });
    };

    ProgramDokView.prototype.prepareToolbar = function () {
        var buttons = [this.buttons.shrani, this.buttons.preklici, this.buttons.uvozi];
        var id = this.model.get('id');
        if (id) {
            buttons.push(this.buttons.kloniraj);
            var zaklepD = chPermission.request('isGranted', "ProgramDela-lock");
            var odklepD = chPermission.request('isGranted', "ProgramDela-unlock");

            if (zaklepD || odklepD) {
                buttons.push(this.buttons.zakleni);
            }

            buttons.push(_.extend({
                params: {
                    dokument: id
                }
            }, this.buttons.print));

            var dovoljeno = chPermission.request('isGranted', "ProgramDela-write");
            if (!this.model.get('potrjenProgram') && dovoljeno) {
                buttons.push(this.buttons.brisi);
            }
        }
        buttons.push(this.buttons.nasvet);
        return [buttons];
    };

    /**
     * Izris tabov
     * @returns {OsebaEditView_L11.TabControl}
     */
    ProgramDokView.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({justified: false, tabs: tabs, listener: this});
        this.tabsR.show(this.tabControl);
        return this.tabControl;
    };

    ProgramDokView.prototype.onRender = function () {

        var tabs = tabVse;

        if (this.isNew()) {
            tabs = tabNovi;
        }

        this.renderTabs(tabs);
    };

    ProgramDokView.prototype.onRenderForm = function () {
        var self = this;

        var prenosDatumov = function (form, editor) {
            var model = new SezonaModel.Model({id: editor.getValue().id});

            var prenesiDatum = function () {
                var polja = self.form.fields;

                polja.zacetek.setValue(model.get('zacetek'));
                polja.konec.setValue(model.get('konec'));
            };

            model.fetch({
                success: prenesiDatum,
                error: Radio.channel('error').request('handler', 'xhr')
            });
        };

        this.form.off('sezona:change', prenosDatumov, this);
        this.form.on('sezona:change', prenosDatumov, this);
    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    ProgramDokView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'ProgramDela'
        });
        this.prilogeR.show(view);
    };

    ProgramDokView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('programDela.nova') : this.model.get('naziv');
    };

    /**
     * Klik na drug tab se izvede deselect
     * @returns {undefined}
     */
    ProgramDokView.prototype.deselectTab = function () {
        this.$('.programDela-panels .tab-pane').removeClass('active');
        this.$('.region-doctoolbar').addClass('hidden');
    };
    /**
     * Klik deselect v tabcontrol sklopa ena
     * @returns {undefined}
     */
    ProgramDokView.prototype.deselectTabEna = function () {
        this.$('.sklopEna-panels .tab-pane').removeClass('active');
    };
    /**
     * Klik deselect v tabcontrol sklopa dva
     * @returns {undefined}
     */
    ProgramDokView.prototype.deselectTabDva = function () {
        this.$('.sklopDva-panels .tab-pane').removeClass('active');
    };

    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    ProgramDokView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        if (this.model.get('id')) {
            this.renderPriloge();
        }
        this.$('.region-doctoolbar').removeClass('hidden');
    };

    /**
     * Izris tabov sklopa ena
     * @returns {undefined}
     */
    ProgramDokView.prototype.onSklopEna = function () {
        this.deselectTab();
        this.$('.pnl-sklopEna').addClass('active');

        this.tabControlSklopEna = new TabControl({justified: false, tabs: tabSklopEna, listener: this});
        this.sklopEnaR.show(this.tabControlSklopEna);
    };
    /**
     * Izris tabov sklopa ena
     * @returns {undefined}
     */
    ProgramDokView.prototype.onSklopDva = function () {
        this.deselectTab();
        this.$('.pnl-sklopDva').addClass('active');

        this.tabControlSklopDva = new TabControl({justified: false, tabs: tabSklopDva, listener: this});
        this.sklopDvaR.show(this.tabControlSklopDva);
    };

    /**
     * Izris premier
     * @returns {undefined}
     */
    ProgramDokView.prototype.onPremiere = function () {
        this.deselectTabEna();
        this.$('.pnl-premiere').addClass('active');

        var self = this;
        require(['app/programDela/View/PremieraView'], function (View) {
            var view = new View({
                collection: self.model.premiereCollection,
                dokument: self.model,
                zapirajFormo: false,
                skrivajTabelo: true,
                potrdiBrisanje: true
            });
            self.premiereR.show(view);
            return view;
        });
    };
    /**
     * Izris ponovitev premiere
     * @returns {undefined}
     */
    ProgramDokView.prototype.onPonovitvePremier = function () {
        this.deselectTabEna();
        this.$('.pnl-ponovitvePremier').addClass('active');

        var self = this;
        require(['app/programDela/View/PonovitevPremiereView'], function (View) {
            var view = new View({
                collection: self.model.ponovitvePremiereCollection,
                dokument: self.model,
                zapirajFormo: false,
                skrivajTabelo: true,
                potrdiBrisanje: true
            });
            self.ponovitvePremierR.show(view);
            return view;
        });
    };
    /**
     * Izris ponovitev prejsnjih
     * @returns {undefined}
     */
    ProgramDokView.prototype.onPonovitvePrejsnjih = function () {
        this.deselectTabEna();
        this.$('.pnl-ponovitvePrejsnjih').addClass('active');

        var self = this;
        require(['app/programDela/View/PonovitevPrejsnjeView'], function (View) {
            var view = new View({
                collection: self.model.ponovitvePrejsnjihCollection,
                dokument: self.model,
                zapirajFormo: false,
                skrivajTabelo: true,
                potrdiBrisanje: true
            });
            self.ponovitvePrejsnjihR.show(view);
            return view;
        });
    };
    /**
     * Izris gostujoci
     * @returns {undefined}
     */
    ProgramDokView.prototype.onGostujoci = function () {
        this.deselectTabEna();
        this.$('.pnl-gostujoci').addClass('active');

        var self = this;
        require(['app/programDela/View/GostujocaView'], function (View) {
            var view = new View({
                collection: self.model.gostujociCollection,
                dokument: self.model,
                zapirajFormo: false,
                skrivajTabelo: true,
                potrdiBrisanje: true
            });
            self.gostujociR.show(view);
            return view;
        });
    };
    /**
     * Izris gostovanj
     * @returns {undefined}
     */
    ProgramDokView.prototype.onGostovanja = function () {
        this.deselectTabDva();
        this.$('.pnl-gostovanja').addClass('active');

        var self = this;
        require(['app/programDela/View/GostovanjeView'], function (View) {
            var view = new View({
                collection: self.model.gostovanjaCollection,
                dokument: self.model,
                zapirajFormo: false,
                skrivajTabelo: true,
                potrdiBrisanje: true
            });
            self.gostovanjaR.show(view);
            return view;
        });
    };
    /**
     * Izris izjemnih uprizoritev
     * @returns {undefined}
     */
    ProgramDokView.prototype.onIzjemni = function () {
        this.deselectTabDva();
        this.$('.pnl-izjemni').addClass('active');

        var self = this;
        require(['app/programDela/View/IzjemniView'], function (View) {
            var view = new View({
                collection: self.model.izjemniCollection,
                dokument: self.model,
                zapirajFormo: false,
                skrivajTabelo: true,
                potrdiBrisanje: true
            });
            self.izjemniR.show(view);
            return view;
        });
    };
    /**
     * Izris izjemnih uprizoritev
     * @returns {undefined}
     */
    ProgramDokView.prototype.onFestivali = function () {
        this.deselectTabDva();
        this.$('.pnl-festivali').addClass('active');

        var coll = this.model.programiFestivalCollection;
        if (coll.length === 0) {
            coll.fetch({
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }

        var self = this;
        require(['app/programDela/View/FestivalView'], function (View) {
            var view = new View({
                collection: coll,
                dokument: self.model,
                zapirajFormo: false,
                skrivajTabelo: true,
                potrdiBrisanje: true
            });
            self.festivaliR.show(view);
            return view;
        });
    };
    /**
     * Izris razno
     * @returns {undefined}
     */
    ProgramDokView.prototype.onRazni = function () {
        this.deselectTabDva();
        this.$('.pnl-razni').addClass('active');

        var self = this;
        require(['app/programDela/View/RaznoView'], function (View) {
            var view = new View({
                collection: self.model.programiRaznoCollection,
                dokument: self.model,
                zapirajFormo: false,
                skrivajTabelo: true,
                potrdiBrisanje: true
            });
            self.razniR.show(view);
            return view;
        });
    };
    /**
     * Izris kazalnikov
     * @returns {undefined}
     */
    ProgramDokView.prototype.onKazalniki = function () {
        this.deselectTab();
        this.$('.pnl-kazalniki').addClass('active');

        var View = Marionette.ItemView.extend({
            template: kazalnikiTabelaTpl
        });
        var self = this;
        var prikaziKazalnike = function () {

            self.model.preracunajKazalnike();

            var view = new View({
                model: self.model
            });

            self.kazalnikiR.show(view);
        };

        this.model.fetch({
            error: Radio.channel('error').request('handler', 'xhr'),
            success: prikaziKazalnike
        });
    };
    /**
     * Izris kazalnikov
     * @returns {undefined}
     */
    ProgramDokView.prototype.onCDva = function () {
        this.deselectTab();
        this.$('.pnl-cdve').addClass('active');

        var self = this;
        var prikaziPostavkeCDva = function () {
            require(['app/programDela/View/PostavkaCDveView'], function (View) {
                var view = new View({
                    collection: coll,
                    dokument: self.model,
                    zapirajFormo: true,
                    skrivajTabelo: true,
                    potrdiBrisanje: true
                });
                self.cDveR.show(view);
                return view;
            });
        };

        var coll = this.model.postavkeCDveCollection;

        if (coll.length === 0) {
            coll.fetch({
                success: prikaziPostavkeCDva,
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
    };

    /**
     * Brisanje programa dela
     * @returns {undefined}
     */
    ProgramDokView.prototype.onBrisi = function () {
        var model = this.model;
        var self = this;

        var brisi = function () {
            model.destroy({
                wait: true,
                success: function () {
                    Radio.channel('error').command('flash', {
                        message: i18next.t('std.messages.success'),
                        severity: 'success'
                    });

                    self.onPreklici();
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        };

        confirm({
            text: i18next.t('std.potrdiIzbris'),
            modalOptions: {
                title: i18next.t("std.brisi"),
                okText: i18next.t("std.brisi")
            },
            ok: brisi
        });
    };

    ProgramDokView.prototype.onSaveSuccess = function () {
        this.renderToolbar();
    };

    ProgramDokView.prototype.onUvozi = function () {
        //render Uvozi programske enote programov dela
        var collection = new ProgramSeznamModel.Collection();
        var self = this;
        var columns = [
            {
                cell: 'select-row',
                headerCell: 'select-all',
                name: ""
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('Naziv'),
                name: 'naziv',
                sortable: true
            }
        ];
        
        collection.fetch({
            success: function () {
                var modal = UvozModal({
                    collection: collection,
                    columns: columns,
                    programDelaId: self.model.get('id'),
                });
            }
        });
    };

    return ProgramDokView;
});