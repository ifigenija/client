<thead>
    <tr>
        <th class="col-sm-6">{{t "izracunaj.atributi"}}</th>
        <th class="col-sm-3 col-numbers">{{t "izracunaj.vrednost"}}</th>
        <th class="col-sm-3 col-numbers">{{t "izracunaj.faktor"}}</th>
        <th class="col-sm-3 col-numbers">{{t "izracunaj.izracun"}}</th>
    </tr>
</thead>
<tbody>
    {{#if nasDelezF}}
    <tr>
        <td>{{t "ep.nasDelez"}}</td>
        <td class="col-numbers">{{u "formatNumber" nasDelez}}</td>
        <td class="col-numbers">{{u "formatNumber" nasDelezF}}</td>
        <td class="col-numbers">{{u "formatNumber" nasDelezI}}</td>
    </tr>
    {{/if}}
    {{#if avtHonF}}
    <tr>
        <td>{{t "ep.avtorskiHonorarji"}}</td>
        <td class="col-numbers">{{u "formatNumber" avtorskiHonorarji}}</td>
        <td class="col-numbers">{{u "formatNumber" avtHonF}}</td>
        <td class="col-numbers">{{u "formatNumber" avtorskiHonorarjiI}}</td>
    </tr>
    {{/if}}
    {{#if tanF}}
    <tr>
        <td>{{t "ep.tantieme"}}</td>
        <td class="col-numbers">{{u "formatNumber" tantieme}}</td>
        <td class="col-numbers">{{u "formatNumber" tanF}}</td>
        <td class="col-numbers">{{u "formatNumber" tantiemeI}}</td>
    </tr>
    {{/if}}
    {{#if matF}}
    <tr>
        <td>{{t "ep.materialni"}}</td>
        <td class="col-numbers">{{u "formatNumber" materialni}}</td>
        <td class="col-numbers">{{u "formatNumber" matF}}</td>
        <td class="col-numbers">{{u "formatNumber" materialniI}}</td>
    </tr>
    {{/if}}
    {{#if odkupAPF}}
    <tr>
        <td>{{t "ep.avtorskePravice"}}</td>
        <td class="col-numbers">{{u "formatNumber" avtorskePravice}}</td>
        <td class="col-numbers">{{u "formatNumber" odkupAPF}}</td>
        <td class="col-numbers">{{u "formatNumber" avtorskePraviceI}}</td>
    </tr>
    {{/if}}
    {{#if transStrF}}
    <tr>
        <td>{{t "ep.odkupPredstave"}}</td>
        <td class="col-numbers">{{u "formatNumber" odkupPredstave}}</td>
        <td class="col-numbers">{{u "formatNumber" transStrF}}</td>
        <td class="col-numbers">{{u "formatNumber" odkupPredstaveI}}</td>
    </tr>
    {{/if}}
    {{#if dnevPZF}}
    <tr>
        <td>{{t "ep.dnevnicePZ"}}</td>
        <td class="col-numbers">{{u "formatNumber" dnevnicePZ}}</td>
        <td class="col-numbers">{{u "formatNumber" dnevPZF}}</td>
        <td class="col-numbers">{{u "formatNumber" dnevnicePZI}}</td>
    </tr>
    {{/if}}
    {{#if dnevF}}
    <tr>
        <td>{{t "ep.dnevnice"}}</td>
        <td class="col-numbers">{{u "formatNumber" dnevnice}}</td>
        <td class="col-numbers">{{u "formatNumber" dnevF}}</td>
        <td class="col-numbers">{{u "formatNumber" dnevnice}}</td>
    </tr>
    {{/if}}
    <tr>
        <td></td>
        <td class="col-numbers"></td>
        <td class="col-numbers">{{t "izracunaj.vsota"}}:</td>
        <td class="col-numbers">{{u "formatNumber" vsota}}</td>
    </tr>
</tbody>