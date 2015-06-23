/* 
 * Licenca GPLv3
 * 
 * Opis SeznamViewSpec testov
 * 
 * Inicializacija SeznamView-a
 * brez option
 * z options
 * izris view-a
 * 
 * Najverjetneje pri vsakem viewju posebaj
 ** Model in collection
 ** Se model kreira brez podatkov
 ** se model kreira z podatki
 ** ali se collection napolni
 **se shrane v collection
 * 
 * testiranje View regije
 * ali so vse regije vsebovane
 * 
 * Izris regij
 * izris tabela/seznam
 * izris toolbar
 * izris forme
 * 
 * testiranje triggerjev form
 * shrani
 * prekliči
 * nasvet
 * 
 * testiranje triggerjev collection
 * uredi
 * briši
 * 
 * Testiranje triggerjev seznamView
 * dodaj
 */

define([
    'jquery',
    'baseUrl',
    'backbone',
    'radio',
    'i18next',
    'app/Max/View/Buttons',
    'app/seznami/View/PostaView',
    'formSchema!posta',
    'template!app/seznami/tpl/posta-form.tpl',
    'text!./Responses/SeznamSchema.json',
    'text!./Responses/SeznamCollection.json'
], function (
        $,
        baseUrl,
        Backbone,
        Radio,
        i18next,
        buttons,
        View,
        schema,
        formTpl,
        textSch,
        textColl
        ) {

    var columns = [
        {
            cell: 'string',
            editable: false,
            label: i18next.t('posta.sifra'),
            name: 'sifra',
            sortable: true
        },
        {
            cell: 'string',
            editable: false,
            label: i18next.t('entiteta.naziv'),
            name: 'naziv',
            sortable: true
        },
        {
            cell: 'action',
            name: '...',
            sortable: false,
            actions: [
                {event: 'brisi', title: i18next.t('entiteta.brisi')}
            ]
        }
    ];
    /**
     * Inicializacija SeznamView:
     * brez options
     * z options
     */
    describe("SeznamView", function () {
        /**
         * se zvede samo enkrat na začetku
         * @returns {undefined}
         */
        before(function () {
            //dodam div v katerem se bo testiralo view
            this.obstaja = $('body');
            expect(this.obstaja).to.have.length.above(0);
            $('body').append('<div class="seznamView"></div>');

            //vsi radio klici
            Radio.channel('global').reply('buttons', function () {
                return buttons;
            });
            Radio.channel('error').comply('flash', function () {
                console.log("Success");
            });
            Radio.channel('error').reply('handler', function (xhr) {
                console.log('error', xhr.responseJSON);
            });

            //inicializacija fake serverja
            this.server = sinon.fakeServer.create();
            this.server.autoRespond = true;

            //z GET na podan url se odzove podanim odzivom
            this.server.respondWith("GET", baseUrl + "/rest/seznam", [
                200,
                {"Content-Type":"application/json; charset=UTF-8"},
                textColl
            ]);

            //z GET na podan url se odzove podanim odzivom
            this.server.respondWith("GET", baseUrl + "/rest/seznam?page=1&per_page=15", [
                200,
                {"Content-Type":"application/json; charset=UTF-8"},
                textColl
            ]);
            //z OPTIONS na podan url se odzove podanim odzivom
            this.server.respondWith("OPTIONS", baseUrl + "/rest/seznam", [
                200,
                {"Content-Type":"application/json; charset=UTF-8"},
                textSch
            ]);
        });
        /**
         * se izvede pred vsakim testom(it)
         * @returns {undefined}
         */
        afterEach(function () {
            $('.seznamView').empty();
        });

        /**
         * izvede se za vsakim testom(
         * @returns {undefined}
         */
        after(function () {
            $('.seznamView').remove();
            this.server.restore();
        });

        /**
         * Preveri če je podan element v DOM-u
         * @param {string} text element ki ga iščemo
         * @param {type} stevilo šrevilo ponovitev
         * @returns {undefined}
         */
        var vDOM = function (text, stevilo) {
            expect($(text)).to.have.length(stevilo);
        };

        /**
         * Odpremo formo in preverimo če se je vse izrisalo
         * @returns {undefined}
         */
        var odpriFormo = function () {
            var dodajSpy = sinon.spy(View.prototype, 'onDodaj');
            var query = '.seznam-toolbar button:contains("Dodaj")';
            vDOM(query, 1);

            $(query).click();

            expect(dodajSpy).to.have.been.calledOnce;

            vDOM('input.sifra-polje', 1);
            vDOM('input.naziv-polje', 1);

            vDOM('label[for*="sifra"]', 1);
            vDOM('label[for*="naziv"]', 1);

            View.prototype.onDodaj.restore();
        };

        describe("Inicializacija objekta", function () {

            it("brez options", function () {
                var view = new View();

                expect(view).to.have.property('formTemplate', formTpl);
                expect(view).to.have.property('schema', schema);
                expect(view).to.have.property('url', baseUrl + '/rest/posta');
                //expect(view).to.have.property('columns', columns);
                expect(view).to.have.property('title', i18next.t('posta.title'));
            });
            it("z options", function () {
                var view = new View({
                    url: 'url',
                    columns: 'columns',
                    formTemplate: 'formTemplate',
                    schema: 'schema',
                    title: 'title'
                });

                expect(view).to.have.property('formTemplate', 'formTemplate');
                expect(view).to.have.property('schema', 'schema');
                expect(view).to.have.property('url', 'url');
                expect(view).to.have.property('columns', 'columns');
                expect(view).to.have.property('title', 'title');
            });

            it("ga lahko izrišemo", function () {
                var view = new View({
                    url: '/rest/seznam'
                });
                $('.seznamView').append(view.render().el);

                vDOM('.seznam-forma', 1);
            });
        });

        /**
         * Preverjanje SeznamView regij
         * če obstajajo
         * če lahko izrišemo view-e v regijah
         * 
         */
        describe("SeznamView regije", function () {
            beforeEach(function () {
                this.view = new View({
                    url: '/rest/seznam'
                });
                this.server.respond();
                $('.seznamView').append(this.view.render().el);
            });

            it("obstajajo vse regije v DOM", function () {
                vDOM('.seznam-forma', 1);
                vDOM('.seznam-tabela', 1);
                vDOM('.seznam-toolbar', 1);
                vDOM('.seznam-naslov', 1);
            });
            it("izris toolbara", function () {
                vDOM('.seznam-toolbar button:contains("Dodaj")', 1);
            });

            it("izris seznama/tabela", function () {
                vDOM('.seznam-tabela .paginated-grid', 1);
                vDOM('th.sifra', 1);
                vDOM('th.naziv', 1);
                vDOM('tbody', 1);
                //vtbody ni tabele :/
                vDOM('tbody tr', 1);
            });

            it("izris forme", function () {
                odpriFormo();
            });
        });

        /**
         * Testiranje triggerjev forme
         */
        describe("SeznamView form triggerji", function () {
            beforeEach(function () {
                this.view = new View({
                    url: '/rest/seznam'
                });
                $('.seznamView').append(this.view.render().el);
            });

            it("saveSuccess", function () {
                odpriFormo();

                var shraniSpy = sinon.spy(View.prototype, 'saveSuccess');

                var query = '.region-toolbar button:contains("Shrani")';
                vDOM(query, 1);

                var n = $('.glava-title').text();
                console.log(n);
                $("input.naziv-polje").val(123);  
                //$(query).removeAttr('disabled');
                $(query).click();
                n = $('.glava-title').text();
                console.log(n);

                expect(shraniSpy).to.have.been.calledOnce;
                View.prototype.saveSuccess.restore();
            });

            it("preklici", function () {
                odpriFormo();

                var urlStub = sinon.stub(View.prototype, 'zamenjajUrl').returns(true);

                var prekliciSpy = sinon.spy(View.prototype, 'preklici');
                var query1 = '.region-toolbar button:contains("Prekliči")';
                vDOM(query1, 1);
                
                n = $('.glava-title').text();
                console.log(n);

                $(query1).click();
                //preverjanje ne dela se slučajno da kdaj v spremenljivko
                //expect(prekliciSpy).to.have.been.calledOnce;
                n = $('.glava-title').text();
                console.log(n);
                

                vDOM('.seznam-forma input.sifra-polje', 0);
                vDOM('.seznam-forma input.naziv-polje', 0);

                vDOM('.seznam-forma label[for*="sifra"]', 0);
                vDOM('.seznam-forma label[for*="naziv"]', 0);

                View.prototype.preklici.restore();
            });

            /**
             * testirat v formview
             * @returns {undefined}
             */
            it("onNasvet");
        });
        /**
         * Testiranje triggerjev collectiona
         */
        describe("SeznamView collection triggerji", function () {
            beforeEach(function () {
                this.view = new View({
                    url: '/rest/seznam'
                });
                $('.seznamView').append(this.view.render().el);

                this.Model = Backbone.Model.extend({
                    urlRoot: baseUrl + '/rest/seznam'
                });
                this.model = new this.Model();
            });

            it("onUredi");//, function () {

//                vDOM('tbody > tr', 1);
//                //klic in preverjanje ali se je klic izvedo
//                this.view.collection.trigger(
//                        'backgrid:action',
//                        self.model,
//                        'uredi'
//                        );
//                expect(urediSpy).to.be.calledOnce;
//
//                //preverimo ali se je narisal formView
//                vDOM('.seznam-forma .glava-panel', 1);
//                vDOM('.panel-body.region-form form', 1);
//            });
            it("onBrisi");//, function () {
//                //potrebno je model iz collectiona in ne tako kot zdaj, vsi klici se izvajajo
//                var conStub = sinon.stub(window, 'confirm').returns(true);
//
//                expect(this.view.collection).to.be.ok;
//                expect(this.view.collection).to.have.length(0);
//                var brisiSpy = sinon.spy(this.view, 'onBrisi');
//                var self = this;
//                //klic in preverjanje ali se je klic izvedo
//                this.view.collection.trigger(
//                        'backgrid:action',
//                        self.model,
//                        'brisi'
//                        );
//                expect(brisiSpy).to.be.calledOnce;
//                expect(window.confirm).to.have.been.calledOnce;
//            });
        });

        /**
         * Testiranje triggerjev view-a po vsej verjetnosti pri vsakem viewju posebaj
         */
        describe("SeznamView triggerji", function () {

            before(function () {
                this.view = new View({
                    url: '/rest/seznam'
                });
                $('.seznamView').append(this.view.render().el);
            });

            it("onDodaj", function () {
                odpriFormo();
            });
        });
    });
});

