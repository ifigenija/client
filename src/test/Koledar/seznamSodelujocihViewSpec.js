/* 
 * Licenca GPLv3
 */

define([
    'backbone',
    'jquery',
    'text!./fixtures/terminiStoritve.json',
    'app/koledar/View/SeznamSodelujocihView'
], function (
        Backbone,
        $,
        collFixture,
        SeznamSodelujocihView
        ) {

    describe("Seznam sodelujočih view", function () {
        beforeEach(function () {
            var fixture = JSON.parse(collFixture);
            var models = fixture.data;

            var coll = this.coll = new Backbone.Collection();
            coll.add(models);

            this.view = new SeznamSodelujocihView({
                collection: coll
            });

            this.view.render();
        });
        afterEach(function () {
        });

        it('je renderirano', function () {
            var $uredi = this.view.$('.sodelujoci-uredi');
            var $podrobno = this.view.$('.sodelujoci-podrobno');
            var $list = this.view.$('.sodelujoci-list');
            var $item = this.view.$('.sodelujoci-item');

            expect($uredi).to.not.be.null;
            expect($podrobno).to.not.be.null;
            expect($list).to.not.be.null;
            expect($item.length).to.equal(7);
        });

        /**
         * prikazati se mora dialog za izbiranje oseb
         * @returns {undefined}
         */
        it('onUredi', function () {
            var $uredi = this.view.$('.sodelujoci-uredi');
            expect($uredi).to.not.be.null;

            var urediSpy = sinon.spy(), urediViewSpy = sinon.spy();

            this.view.on('uredi', urediSpy);
            this.view.on('uredi:view', urediViewSpy);

            this.view.$('.sodelujoci-uredi').click();

            expect(urediSpy).to.have.been.called;
            expect(urediViewSpy).to.have.been.called;
        });

        /**
         * pridobimo podrobne podatke o izbranih osebah
         * @returns {undefined}
         */
        it('onPodrobno', function () {
            var $podrobno = this.view.$('.sodelujoci-podrobno');
            expect($podrobno).to.not.be.null;

            var podrobnoSpy = sinon.spy();

            this.view.on('podrobno', podrobnoSpy);

            this.view.$('.sodelujoci-podobno').click();
            expect(podrobnoSpy).to.not.have.been.called;
        });

        /**
         * v kolikor se iz collectiona odstrani model se posodobi izpis collectiona
         * @returns {undefined}
         */
        it('odstrani en vnos iz collection terminstoritev', function () {
            var collection = this.view.collection;
            var model = collection.first();

            //ui pred odstranitvijo
            expect(collection.length).to.equal(7);
            var $item = this.view.$('.sodelujoci-item');
            expect($item.length).to.equal(7);

            //ui po odstranitvi
            collection.remove(model);
            expect(collection.length).to.equal(6);
            var $item = this.view.$('.sodelujoci-item');
            expect($item.length).to.equal(6);
        });
    });
});