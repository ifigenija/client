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
    'app/Max/View/Buttons',
    'app/seznami/View/SeznamView'
], function (
        $,
        baseUrl,
        Backbone,
        Radio,
        buttons,
        View
        ) {

    /**
     * Inicializacija SeznamView:
     * brez option
     * z options
     */
    describe("SeznamView inicializacija", function () {
        it("brez options", function () {
            //var spy = sinon.spy(View);
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
        
        before(function () {
            Radio.channel('global').reply('buttons', function () {
                return buttons;
            });
        });

        it("ga lahko izrišemo", function () {
            var view = new View({url: 'rest/posta'});
            var obstaja = $('body');
            expect(obstaja).to.have.length.above(0);
            $('body').append('<div class="seznamiView"></div>');            
            $('.seznamiView').append(view.render().el);
            
            obstaja = $('.seznam-forma');            
            expect(obstaja).to.have.property('length', 1);
        });
    });

    /**
     * Preverjanje SeznamView regij
     * če obstajajo
     * če lahko izrišemo view-e v regijah
     * 
     */
    describe("SeznamView regije", function () {
        it("obstajajo vse regije v DOM", function () {
            throw new Error();
        });
        it("izris v toolBar region", function () {
            throw new Error();
        });

        it("izris v grid region", function () {
            throw new Error();
        });

        it("izris v naslov region", function () {
            throw new Error();
        });

        it("izris v lookup region", function () {
            throw new Error();
        });

        it("izris v form region", function () {
            throw new Error();
        });
    });

    /**
     * Testiranje triggerjev forme
     */
    describe("SeznamView form triggerji", function () {
        it("ali pravilno shrani", function () {
            throw new Error();
        });
        it("ali pravilno prekliče", function () {
            throw new Error();
        });

        it("ali prikaže in skrije nasvete", function () {
            throw new Error();
        });
    });
    /**
     * Testiranje triggerjev collectiona
     */
    describe("SeznamView collection triggerji", function () {
        it("ali odpre pravi model", function () {
            throw new Error();
        });
        it("ali izbriše podatek", function () {
            throw new Error();
        });
    });
    /**
     * Testiranje triggerjev view-a
     */
    describe("SeznamView triggerji", function () {

        it("ali odpre prazno formo", function () {
            throw new Error();
        });
    });

});

