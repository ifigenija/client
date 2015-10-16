<div id="sidebar" class="col-sm-4">
    <div class="panel panel-default">
        <div class="panel-heading clearfix">
            <div class="pull-right btn-group" id="tree-tools">
                <button class="orgEnota-dodaj btn btn-xs" title="{{t "std.dodajOrgEnota"}}"><i class="fa fa-plus"></i></button>
            </div>
            <button class="orgEnota-odstrani btn btn-xs" title="{{t "std.odstraniOrgEnota"}}"><i class="fa fa-minus"></i></button>
            <strong id="tree-title">{{t "orgEnota.titles"}}</strong>
        </div>
        <div id="tree-container"></div>
    </div>
</div>
<div id="detail-container" class="col-sm-8">
    <div id="tabs"></div>
    <div class="row">
        <div class="col-sm-8 page-header">
            <h4 id="tab-title"></h4>
        </div>
        <div class="col-sm-4">
            <div class="pull-right" id="tab-toolbar"></div>
        </div>
    </div>
    <div id="detail-panel" class="clearfix row"></div>
</div>
