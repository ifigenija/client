define([
    'jquery',
    'text!./fixtures/terminiStoritve.json',
    'app/koledar/Model/TerminiStoritev',
    'app/koledar/Model/Alternacije',
    'app/koledar/Model/Osebe'
], function (
        $,
        TSFixture,
        TerminiStoritev,
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
            var coll = new TerminiStoritev();
            expect(coll.length).to.equal(0);
        });

        it('Inicializiraj collection s podatki', function () {
            var coll = new TerminiStoritev(this.models);
            expect(coll.length).to.equal(7);
        });

        it('Inicializiraj model brez podatkov', function () {
            var model = new TerminiStoritev.prototype.model();
            expect(model.get('id')).to.be.undefined;
        });

        it('Inicializiraj model s podatki', function () {
            var model = new TerminiStoritev.prototype.model(this.models[0]);
            expect(model.get('id')).to.not.be.null;
        });

        /**
         * pretvarjanje coll TS v coll Alternacije
         * @returns {undefined}
         */
        it('pretvori TS v alternacije in osebe', function () {
            
            var coll = this.coll = new TerminiStoritev();
            coll.add(this.models);

            expect(coll.length).to.equal(7);

            var podatki = this.coll.razdeli();
            var alternacije = podatki.alternacije;
            var osebe = podatki.osebe;

            expect(alternacije).to.be.an.instanceOf(Alternacije);
            expect(alternacije.length).to.be.equal(5);

            expect(osebe).to.be.an.instanceOf(Osebe);
            expect(osebe.length).to.be.equal(2);

            var tsA = this.coll.first().get('alternacija.id');
            var A = alternacije.first().get('id');
            expect(tsA).to.equal(A);
        });
        
        it('dodaj odstrani alternacije v TS', function () {

            var podatki = this.coll.razdeli();
            var alternacije = podatki.alternacije;
            var osebe = podatki.osebe;

            expect(alternacije).to.be.an.instanceOf(Alternacije);
            expect(alternacije.length).to.be.equal(5);

            expect(osebe).to.be.an.instanceOf(Osebe);
            expect(osebe.length).to.be.equal(2);

            var tsA = this.coll.first().get('alternacija.id');
            var A = alternacije.first().get('id');
            expect(tsA).to.equal(A);
        });
    });
});