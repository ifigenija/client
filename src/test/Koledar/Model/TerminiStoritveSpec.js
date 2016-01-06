define([
    'jquery',
    'text!../../fixtures/terminiStoritve.json',
    'app/koledar/Model/TerminiStoritve',
    'app/koledar/Model/Alternacije',
    'app/koledar/Model/Osebe'
], function (
        $,
        TSFixture,
        TerminiStoritve,
        Alternacije,
        Osebe
        ) {

    describe("Termini storitve", function () {
        beforeEach(function () {
            var fixture = JSON.parse(TSFixture);
            this.models = fixture.data;
        });
        afterEach(function () {
        });
        it('Inicializiraj collection brez podatkov', function () {
            var coll = new TerminiStoritve();
            expect(coll.length).to.equal(0);
        });

        it('Inicializiraj collection s podatki', function () {
            var coll = new TerminiStoritve(this.models);
            expect(coll.length).to.equal(7);
        });

        it('Inicializiraj model brez podatkov', function () {
            var model = new TerminiStoritve.prototype.model();
            expect(model.get('id')).to.be.undefined;
        });

        it('Inicializiraj model s podatki', function () {
            var model = new TerminiStoritve.prototype.model(this.models[0]);
            expect(model.get('id')).to.not.be.null;
        });

        /**
         * pretvarjanje coll TS v coll Alternacije
         * @returns {undefined}
         */
        it('pretvori TS v alternacije', function () {
            
            var coll = new TerminiStoritve();
            coll.add(this.models);
            expect(coll.length).to.equal(7);

            var alterColl = coll.toAlternacije();
            expect(alterColl).to.be.an.instanceOf(Alternacije);
            expect(alterColl.length).to.be.equal(5);
        });
        
         /**
         * pretvarjanje coll TS v coll Alternacije
         * @returns {undefined}
         */
        it('pretvori TS v osebe', function () {
            
            var coll = new TerminiStoritve();
            coll.add(this.models);
            expect(coll.length).to.equal(7);

            var osebeColl = coll.toOsebe();
            expect(osebeColl).to.be.an.instanceOf(Osebe);
            expect(osebeColl.length).to.be.equal(2);
        });
    });
});