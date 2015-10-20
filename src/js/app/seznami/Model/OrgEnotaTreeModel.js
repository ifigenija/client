define(['baseUrl','app/Max/Model/TreeModel'], function(baseUrl, TreeModel) {

    var OrgEnotaTreeModel = {};

    OrgEnotaTreeModel.model = TreeModel.model.extend({
        urlRoot: baseUrl + '/rest/organizacijskaEnota',
        getLabel: function() {
            return this.get('sifra') + ' ' + this.get('naziv');
        }
    });

    OrgEnotaTreeModel.collection = TreeModel.collection.extend({
        treeUrl: baseUrl + '/rest/organizacijskaEnota',
        model: OrgEnotaTreeModel.model
    });
    
    OrgEnotaTreeModel.model.prototype.collectionType = OrgEnotaTreeModel.collection;
    return OrgEnotaTreeModel;
});