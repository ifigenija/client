<div class="panel-heading" role="tab" id="heading-{{id}}">
    <h4 class="panel-title">
        <div class="pull-right uprizoritev-odstrani">
            {{#unless  neBrisi }}
            <i class="fa fa-times" title="{{t "std.odstrani"}}"></i>
            {{/unless}}
        </div>
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#{{id}}" aria-expanded="true" aria-controls="{{id}}">
            {{t "vzporednice.zasedba"}}: {{label}}
        </a>
    </h4>
</div>
<div id="{{id}}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="{{id}}">
    <div class="panel-body zasedba-body">
        <div class="zasedba-region-funkcije"></div>
    </div>
</div>