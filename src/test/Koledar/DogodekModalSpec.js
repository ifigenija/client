/* 
 * Licenca GPLv3
 */

define([
    'backbone',
    'jquery',
    'app/koledar/View/DogodekModal'
], function (
        Backbone,
        $,
        DogodekModal
        ) {

    describe("Dogodek modal", function () {
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
            var view = this.view = DogodekModal();
            this.content = this.view.options.content;
        });

        afterEach(function () {
        });

        it('renderira region izbira', function () {
            var $region = this.content.$('.dogodek-region-izbira');
            expect($region.length).to.equal(1);
        });

        it('renderira gumbe', function () {
            var $region = this.content.$('.btn.btn-default');
            expect($region.length).to.equal(6);
        });

        it('renderira region podrobno', function () {
            var $region = this.content.$('.dogodek-region-podrobno');
            expect($region.length).to.equal(1);
        });

        it('renderira podrobno na klik Vaja', function () {
            var $region = this.content.$('.dogodek-region-podrobno:empty');
            expect($region.length).to.equal(1);

            var $gumb = this.content.$('.dogodek-vaja');
            expect($gumb.length).to.equal(1);
            $gumb.click();

            $region = this.content.$('.dogodek-region-podrobno:empty');
            expect($region.length).to.equal(0);
        });

        it('renderira podrobno na klik predstavo', function () {
            var $region = this.content.$('.dogodek-region-podrobno:empty');
            expect($region.length).to.equal(1);

            var $gumb = this.content.$('.dogodek-predstava');
            expect($gumb.length).to.equal(1);
            $gumb.click();

            $region = this.content.$('.dogodek-region-podrobno:empty');
            expect($region.length).to.equal(0);
        });
    });
});