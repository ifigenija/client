<div class="alert alert-warning alert-dismissible" role="alert">
    <button type="button" class="close podobne-osebe-preklici" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong>{{t "vzporednice.opozoriloPrekrivanja"}}</strong>
    <div class="opozorila">
        {{#each opozorila}}
        <div class="opozorilo">
            {{#each this}}
            {{@key}} nastopa v  
            {{#each this}}
            {{this}}
            {{#unless @last}}, {{/unless}}
            {{/each}}
            {{/each}}
        </div>
        {{/each}}
    </div>
</div>