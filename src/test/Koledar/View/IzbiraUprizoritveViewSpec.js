define([
    'jquery',
    'app/koledar/View/IzbiraUprizoritveView'
], function (
        $,
        IzbiraUprizoritveView
        ) {

    describe("IzbiraUprizoritveView", function () {
        beforeEach(function () {
            this.selectedSpy = sinon.spy(IzbiraUprizoritveView.prototype, 'onSelected');
            this.changeSpy = sinon.spy(IzbiraUprizoritveView.prototype, 'onChange');
            
            this.view = new IzbiraUprizoritveView();
            this.view.render();
        });
        afterEach(function () {
            this.selectedSpy.restore();
            this.changeSpy.restore();
        });
        it('regije so v DOM', function () {
            var view = this.view;
            var $upr = view.$('.region-uprizoritev');
            var $vzp = view.$('.region-vzporednice');
            var $osebe = view.$('.region-osebe');
            
            expect($upr.length).to.equal(1);
            expect($vzp.length).to.equal(1);
            expect($osebe.length).to.equal(1);
        });
        
        /**
         * Selected proži vzporedniceView
         * @returns {undefined}
         */
        it('posluša selected', function () {
            this.view.vzporedniceView.trigger('selected');
            expect(this.selectedSpy).to.have.been.called;
        });
        
        /**
         * Change proži osebeView
         * @returns {undefined}
         */
        it('posluša change', function () {
            this.view.osebeView.trigger('change');
            expect(this.changeSpy).to.have.been.called;
        });
    });
});