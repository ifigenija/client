define([
    'jquery',
    'backbone',
    'app/produkcija/View/VzpUprView',
    'text!../fixtures/funkcije.json'
], function (
        $,
        Backbone,
        VzpUprView,
        funkcijeFixture
        ) {

    describe("VzpUprView", function () {
        beforeEach(function () {
            var data = JSON.parse(funkcijeFixture);
            var modeli = data.data;

            var collection = new Backbone.Collection(modeli);

            this.view = new VzpUprView({
                collection: collection
            });

            this.view.render();
        });
        afterEach(function () {
        });
        
        it('dodaj model', function () {
            var coll = this.view.collection;
            expect(coll.length).to.equal(3);
            coll.add({
                id: 1,
                title: "test fixture"
            });

            expect(coll.length).to.equal(4);
        });
        
        it('odstrani model', function () {
            var coll = this.view.collection;
            expect(coll.length).to.equal(3);
            this.view.triggerMethod('childviewOdstrani', {model: coll.first()});
            expect(coll.length).to.equal(2);
        });

        it('odstrani vse modele', function () {
            var coll = this.view.collection;
            expect(coll.length).to.equal(3);
            this.view.trigger('odstrani:vse');
            setTimeout(function(){
                expect(coll.length).to.equal(0);                
            }, 1000);

        });
        
        it('izpisani vsi modeli', function () {
            var $times = this.view.$('.fa-times');
            //trije od izpisanih modelov in en od odstrani vse zato je eden več
            expect($times).to.have.length(4);
        });
        
        it('izris po odstranitvi modela', function () {
            //šteje se eden več zaradi križca v compositeviw
            var $times = this.view.$('.fa-times');
            expect($times).to.have.length(4);
            
            
            var coll = this.view.collection;
            this.view.triggerMethod('childviewOdstrani', {model: coll.first()});
            
            //šteje se eden več zaradi križca v compositeviw
            $times = this.view.$('.fa-times');
            expect($times).to.have.length(3);
        });
        it('izris po dodanem novem modelu', function () {
            //šteje se eden več zaradi križca v compositeviw
            var $times = this.view.$('.fa-times');
            expect($times).to.have.length(4);
            
            
            var coll = this.view.collection;
            coll.add({
                id: 1,
                title: "test fixture"
            });
            
            //šteje se eden več zaradi križca v compositeviw
            $times = this.view.$('.fa-times');
            expect($times).to.have.length(5);
        });
    });
});