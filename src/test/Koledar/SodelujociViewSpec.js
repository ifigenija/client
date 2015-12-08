/* 
 * Licenca GPLv3
 */

define([
    'backbone',
    'jquery',
    'text!./fixtures/terminiStoritve.json',
    'app/koledar/View/SodelujociView',
    'app/koledar/Model/TerminiStoritev',
    'app/koledar/Model/Alternacije',
    'app/koledar/Model/Osebe'
], function (
        Backbone,
        $,
        collFixture,
        SodelujociView,
        TerminiStoritev,
        Alternacije,
        Osebe
        ) {

    describe("Sodelujoči view", function () {
        beforeEach(function () {
            this.server = sinon.fakeServer.create();

        });
        afterEach(function () {
            this.server.restore();
        });

        /**
         * ali se vse regije zapolnijo
         * @returns {undefined}
         */
        it('je renderirano', function () {
        });

        it('renderUredi', function () {
        });

        /**
         * pretvorimo collection(coll) oseb v collection terminovstoritev(TS)
         * @returns {undefined}
         */
        it('pretvori osebe v TS', function () {
        });

        /**
         * pretvorimo coll alternacij v coll TS
         * @returns {undefined}
         */
        it('pretvori alternacije v TS', function () {
        });

        /**
         * pretvarjanje coll TS v coll Alternacije
         * @returns {undefined}
         */
        it('pretvori TS v alternacije in osebe', function () {

            this.server.respondWith("GET", "http://ifigenija.local:8888/rest/terminstoritve",
                    [200, {"Content-Type": "application/json"},
                        collFixture]);

            var fixture = JSON.parse(collFixture);
            var models = fixture.data;

            var coll = this.coll = new TerminiStoritev();
            coll.add(models);

            expect(coll.length).to.equal(7);

            var podatki = coll.razdeli();
            var alternacije = podatki.alternacije;
            var osebe = podatki.osebe;

            expect(alternacije).to.be.an.instanceOf(Alternacije);
            expect(alternacije.length).to.be.equal(5);

            expect(osebe).to.be.an.instanceOf(Osebe);
            expect(osebe.length).to.be.equal(2);

            var tsA = coll.first().get('alternacija.id');
            var A = alternacije.first().get('id');
            expect(tsA).to.equal(A);
        });

        /**
         * pretvarjanje coll TS v Coll oseb
         * @returns {undefined}
         */
        it('pretvori TS v osebe', function () {
        });
    });
});