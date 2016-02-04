<div class="pull-right region-toolbar"></div>
<h3>{{t "koledar.nav.planer"}}</h3>
<div class="clearfix"></div>
<div class="row">
    <div class="col-sm-6 region-termin"></div>
    <div class="col-sm-6 region-konflikti"></div>
</div>
<div class="planer-legenda row">
    <div class="col-sm-1 planer-cell-datum"><div id="tedenVDnevu"></div></div>
    <div class="col-sm-3 planer-cell planer-first-cell">{{t "koledar.terminDopoldan"}}</div>
    <div class="col-sm-3 planer-cell">{{t "koledar.terminPopoldan"}}</div>
    <div class="col-sm-3 planer-cell">{{t "koledar.terminZvecer"}}</div>
</div>
<div class="region-teden"></div>

<style type="text/css">
    .label-predstava { background-color: {{barve.predstavaDoma.value}}; }
    .label-vaja { background-color: {{barve.vaja.value}}; }
    .label-gostovanje { background-color: {{barve.gostovanje.value}}; }
    .label-splosni { background-color: {{barve.splosni.value}}; }
    .label-tehnicni { background-color: {{barve.tehnicni.value}}; }
</style>