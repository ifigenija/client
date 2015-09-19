define(['marionette', './Job'], function(Marionette, Job) {
    return Marionette.CollectionView.extend({
        childView: Job,
        initialize: function(options) {
            this.on('childview:clickjob', function(arg) {
                this.trigger('clickjob', arg.model);
            }, this);
            this.on('childview:hideJob', this.hideJob, this);

            // Če se collection spremeni, osvežim view
            this.collection.on('change', this.render, this);
        },
        hideJob: function(view) {
            view.model.set("hidden", true);
            view.model.save();
            this.collection.remove(view.model);
        }
    
    });
});
