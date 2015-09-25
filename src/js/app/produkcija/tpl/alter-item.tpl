
<div class="media-left">
    <a href="#">
        <span class="fa fa-user-secret fa-3x"></span>
    </a>
</div>
<div class="media-body">
    <div class="pull-right alter-toolbar"></div>
    <h4 class="media-heading">{{ oseba.label }}
        {{#if  privzeti }}
        - <small>{{t "alternacija.privzeti"}}</small>
        {{/if}}
    </h4>
    {{#if  zacetek }}
        <div>{{t "alternacija.zacetek"}}: <small>{{u "date" zacetek }}</small></div>
        {{#if  konec }}
        <div>{{t "alternacija.konec"}}: <small>{{u "date" konec }}</small></div>
        {{/if}}
    {{/if}}
    <div class="alter-detail"></div>
</div>
