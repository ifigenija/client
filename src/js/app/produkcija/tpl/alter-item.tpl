<div class="media-left">
    <a href="#">
        <span class="fa fa-user-secret fa-3x"></span>
    </a>
</div>
<div class="media-body">
    <div class="pull-right alter-toolbar"></div>
    <h4 class="media-heading">{{ oseba.label }}
    </h4>
    <h5><small>{{u "formatNumber" sort 0}}</small>
        {{#if  privzeti }}
        <small>|{{t "alternacija.privzeti"}}</small>
        {{/if}}
        {{#if  zacetek }}
        <small>|{{u "date" zacetek }}</small>
        {{#if  konec }}
        <small>|{{u "date" konec }}</small>
        {{/if}}
        {{/if}}
    </h5>
</div>
<div class="row">
    <div class="col-sm-12 alter-detail"></div>
</div>
