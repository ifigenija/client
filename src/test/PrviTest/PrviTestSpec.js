define(['jquery', 'app/seznami/View/PostaView'], function ($, View) {

    describe("Primer test View", function () {

        it("vrne pricakovan", function () {
            var view = new View();
            var spy = sinon.spy();
            
           //spy.should.be.ok;

            expect(view).not.to.be.null;
        });
    });
});