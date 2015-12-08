/* 
 * Licenca GPLv3
 */

define([
    'backbone',
    'jquery',
    'text!./fixtures/vaje.json',
    'app/koledar/View/VajaView',
    'formSchema!vaja'
], function (
        Backbone,
        $,
        vajeFix,
        VajaView,
        schemaVaja
        ) {

    describe("Vaja view", function () {
        before(function () {
            var ajax = $.ajax({
                dataType: 'html',
                url: 'http://localhost:8889/',
                headers: {
                    'Authorization': "Basic " + btoa('admin@ifigenija.si' + ":" + 'Admin1234')
                }
            });
        });

        beforeEach(function () {
            this.view = new VajaView({
                model: new Backbone.Model(),
                schema: schemaVaja.toFormSchema().schema
            });
            this.view.render();
        });
        afterEach(function () {
        });

        it('je forma renderirana', function () {
            var $title = $('.field-title');
            var $tipVaje = $('.field-tipvaje');
            var $prostor = $('[name~="prostor"]');
            var $zacetek = $('.field-zacetek');
            var $konec = $('.dbsadksajh');

            expect($title).to.not.be.null;
            expect($tipVaje).to.not.be.null;
            expect($prostor).to.not.be.null;
            expect($zacetek).to.not.be.null;
            expect($konec).to.not.be.null;
        });

        it('prikaži koledar', function () {
            var $gumb = this.view.$('.prikazi-koledar');
            expect($gumb).to.not.be.null;

            var koledarSpy = sinon.spy();

            this.view.on('koledar:prostor', koledarSpy);

            $gumb.click();

            expect(koledarSpy).to.have.been.called;
        });
    });
});