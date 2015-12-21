define([
    'jquery',
    'backbone',
    'app/koledar/View/IzbiraRazredDogodkaView'
], function (
        $,
        Backbone,
        IzbiraView
        ) {

    describe("IzbiraView", function () {
        beforeEach(function () {
            this.vajaSpy = sinon.spy(IzbiraView.prototype, 'onVaja');
            this.predstavaSpy = sinon.spy(IzbiraView.prototype, 'onPredstava');
            this.splosniSpy = sinon.spy(IzbiraView.prototype, 'onSplosni');
            this.zasedenostSpy = sinon.spy(IzbiraView.prototype, 'onZasedenost');
            this.gostovanjeSpy = sinon.spy(IzbiraView.prototype, 'onGostovanje');
            this.tehnicniSpy = sinon.spy(IzbiraView.prototype, 'onTehnicni');

            var model = new Backbone.Model();
            this.view = new IzbiraView({
                model: model
            });
            this.view.render();
        });
        afterEach(function () {
            this.vajaSpy.restore();
            this.predstavaSpy.restore();
            this.splosniSpy.restore();
            this.zasedenostSpy.restore();
            this.gostovanjeSpy.restore();
            this.tehnicniSpy.restore();
        });

        it('renderira gumbe', function () {
            var $gumbi = this.view.$('.btn.btn-default');
            expect($gumbi.length).to.equal(6);
        });
        it('proži onVaja', function () {
            var $gumb = this.view.$('.dogodek-vaja');
            expect($gumb.length).to.equal(1);

            var spy = sinon.spy();
            this.view.on('ready:naprej', spy);
            $gumb.click();

            expect(this.vajaSpy).to.have.been.called;
            expect(spy).to.have.been.called;
        });
        it('proži onPredstava', function () {
            var $gumb = this.view.$('.dogodek-predstava');
            expect($gumb.length).to.equal(1);

            var spy = sinon.spy();
            this.view.on('ready:naprej', spy);
            $gumb.click();

            expect(this.predstavaSpy).to.have.been.called;
            expect(spy).to.have.been.called;
        });
        it('proži onSplosni', function () {
            var $gumb = this.view.$('.dogodek-splosni');
            expect($gumb.length).to.equal(1);

            var spy = sinon.spy();
            this.view.on('ready:naprej', spy);
            $gumb.click();

            expect(this.splosniSpy).to.have.been.called;
            expect(spy).to.have.been.called;
        });
        it('proži onZasedenost', function () {
            var $gumb = this.view.$('.dogodek-zasedenost');
            expect($gumb.length).to.equal(1);

            var spy = sinon.spy();
            this.view.on('ready:naprej', spy);
            $gumb.click();

            expect(this.zasedenostSpy).to.have.been.called;
            expect(spy).to.have.been.called;
        });
        it('proži onGostovanje', function () {
            var $gumb = this.view.$('.dogodek-gostovanje');
            expect($gumb.length).to.equal(1);

            var spy = sinon.spy();
            this.view.on('ready:naprej', spy);
            $gumb.click();

            expect(this.gostovanjeSpy).to.have.been.called;
            expect(spy).to.have.been.called;
        });
        it('proži onTehnicni', function () {
            var $gumb = this.view.$('.dogodek-tehnicni');
            expect($gumb.length).to.equal(1);

            var spy = sinon.spy();
            this.view.on('ready:naprej', spy);
            $gumb.click();

            expect(this.tehnicniSpy).to.have.been.called;
            expect(spy).to.have.been.called;
        });
    });
});