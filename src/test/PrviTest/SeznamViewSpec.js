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
    'app/seznami/View/SeznamView',
    'formSchema!posta',
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
        textColl
        ) {

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
            Radio.channel('global').reply('buttons', function () {
                return buttons;
            });

            Radio.channel('error').comply('flash', function () {
                console.log("Success");
            });
            Radio.channel('error').reply('handler', function (xhr) {
                console.log('error', xhr.responseJSON);
            });

            this.obstaja = $('body');
            expect(this.obstaja).to.have.length.above(0);
            $('body').append('<div class="seznamView"></div>');
        });
        /**
         * se izvede pred vsakim testom(it)
         * @returns {undefined}
         */
        beforeEach(function () {
            $('.seznamView').empty();
        });

        /**
         * izvede se za vsakim testom(
         * @returns {undefined}
         */
        after(function () {
            $('.seznamView').remove();
        });

        describe("Inicializacija objekta", function () {

            it("brez options", function () {
                var view = new View();

                expect(view).to.have.property('formTemplate', null);
                expect(view).to.have.property('schema', null);
                expect(view).to.have.property('url', null);
                expect(view).to.have.property('columns', null);
                expect(view).to.have.property('title', null);
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
                var view = new View({url: '/rest/posta'});
                $('.seznamView').append(view.render().el);

                this.obstaja = $('.seznam-forma');
                expect(this.obstaja).to.have.property('length', 1);
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
                    url: '/rest/posta',
                    schema: schema
                });
                $('.seznamView').append(this.view.render().el);
            });

            it("obstajajo vse regije v DOM", function () {
                this.obstaja = $('.seznam-forma');
                expect(this.obstaja).to.have.property('length', 1);

                this.obstaja = $('.seznam-tabela');
                expect(this.obstaja).to.have.property('length', 1);

                this.obstaja = $('.seznam-toolbar');
                expect(this.obstaja).to.have.property('length', 1);

                this.obstaja = $('.seznam-naslov');
                expect(this.obstaja).to.have.property('length', 1);
            });
            it("izris toolbara", function () {
                this.obstaja = $('.seznam-toolbar .btn-default:contains("Dodaj")');
                expect(this.obstaja).to.have.property('length', 1);
            });

            it("izris seznama/tabela", function () {
                this.obstaja = $('.seznam-tabela .paginated-grid');
                expect(this.obstaja).to.have.property('length', 1);
            });

            it("izris forme", function () {
                var selectSpy = sinon.spy();
                var Model = Backbone.Model.extend({
                    urlRoot: baseUrl + '/rest/posta'
                });
                var model = new Model();

                //klic in preverjanje ali se je klic izvedo
                this.view.listenTo(this.view.collection, 'selectValue', selectSpy);
                this.view.collection.trigger('selectValue', model);
                expect(selectSpy).to.have.been.calledOnce;

                //preverimo ali se je narisal formView
                this.obstaja = $('.seznam-forma .glava-panel');
                expect(this.obstaja).to.have.property('length', 1);

                this.obstaja = $('.panel-body.region-form form');
                expect(this.obstaja).to.have.property('length', 1);

            });
        });

        /**
         * Testiranje triggerjev forme
         */
        describe("SeznamView form triggerji", function () {
            it("saveSuccess");
            it("onPreklici");

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
                this.server = sinon.fakeServer.create();
                this.server.autoRespond = true;
                this.server.respondWith("GET", baseUrl + "/rest/posta", [
                200,
                {"Content-Type": "application/json"},
                textColl
            ]);
                this.view = new View({
                    url: '/rest/posta',
                    schema: schema
                });
                this.server.respond();
                $('.seznamView').append(this.view.render().el);

                this.Model = Backbone.Model.extend({
                    urlRoot: baseUrl + '/rest/posta'
                });
                this.model = new this.Model();
            });

            it("onUredi", function () {
                var urediSpy = sinon.spy(this.view, 'onUredi');
                var self = this;

                //klic in preverjanje ali se je klic izvedo
                this.view.collection.trigger(
                        'backgrid:action',
                        self.model,
                        'uredi'
                        );
                expect(urediSpy).to.be.calledOnce;

                //preverimo ali se je narisal formView
                this.obstaja = $('.seznam-forma .glava-panel');
                expect(this.obstaja).to.have.property('length', 1);

                this.obstaja = $('.panel-body.region-form form');
                expect(this.obstaja).to.have.property('length', 1);
            });
            it("onBrisi", function () {
                //potrebno je model iz collectiona in ne tako kot zdaj, vsi klici se izvajajo
                var conStub = sinon.stub(window, 'confirm').returns(true);

                expect(this.view.collection).to.be.ok;
                expect(this.view.collection).to.have.length(0);
                var brisiSpy = sinon.spy(this.view, 'onBrisi');
                var self = this;
                //klic in preverjanje ali se je klic izvedo
                this.view.collection.trigger(
                        'backgrid:action',
                        self.model,
                        'brisi'
                        );
                expect(brisiSpy).to.be.calledOnce;
                expect(window.confirm).to.have.been.calledOnce;
            });
        });
    });
    /**
     * Testiranje triggerjev view-a po vsej verjetnosti pri vsakem viewju posebaj
     */
    describe("SeznamView triggerji", function () {

        it("onDodaj");
    });
});

