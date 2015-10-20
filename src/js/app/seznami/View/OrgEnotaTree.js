define(['app/Max/View/TreeList'], function(TreeList) {
    
    var OrgEnotaTreeNode = TreeList.TreeNode.extend({
    });

    var OrgEnotaTree = TreeList.TreeList.extend({
        childView: OrgEnotaTreeNode
    });

    return OrgEnotaTree;
});