/* 
 * Licenca GPLv3
 */

define([
    'backbone',
    'app/koledar/Model/Dogodki',
    'jquery',
    'text!./fixtures/terminiStoritve.json',
    'app/koledar/View/PlaniranjeView'
], function (
        Backbone,
        Dogodki,
        $,
        collFixture,
        PlaniranjeView
        ) {

    describe("Planiranje View", function () {
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
            var view = this.view = new PlaniranjeView();
            view.render();
        });

        afterEach(function () {
        });

        it('renderira koledar', function () {
            var $region = this.view.$('.planiranje-region-koledar');
            expect($region).to.not.be.null;
        });

        it('renderira toolbar', function () {
            var $region = this.view.$('.planiranje-region-toolbar');
            expect($region).to.not.be.null;
        });

        it('renderira dogodek', function () {
            var $region = this.view.$('.planiranje-region-dogodek');
            expect($region).to.not.be.null;
        });

        it('proži dodaj', function () {
            //obstaja gumb dodaj
            var $dodaj = this.view.$('button:contains(Dodaj)');
            expect($dodaj.length).to.not.equal(0);
            //proženje eventa
            var dodajSpy = sinon.spy();
            this.view.on('dodaj', dodajSpy);
            //klik na gumb
            $dodaj.click();

            expect(dodajSpy).to.have.been.called;

        });

        it('posluša prikazi:dogodek', function () {
            var spy = sinon.spy();
            this.view.koledarView.on('prikazi:dogodek', spy);
            
            var model = new Dogodki.prototype.model({
                view: 'vaja'
            });
            this.view.koledarView.trigger('prikazi:dogodek', model);

            expect(spy).called;
        });
    });
});