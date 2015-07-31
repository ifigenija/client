<div class="panel panel-default">
    <div class="panel-heading">{{t "izracunaj.title"}}</div>
    <div class="panel-body">

        <table class="table table-striped table-condensed">
            <thead>
                <tr>
                    <th class="col-sm-6">{{t "izracunaj.atributi"}}</th>
                    <th class="col-sm-3 col-numbers">{{t "izracunaj.vrednost"}}</th>
                    <th class="col-sm-3 col-numbers">{{t "izracunaj.faktor"}}</th>
                    <th class="col-sm-3 col-numbers">{{t "izracunaj.vrednostI"}}</th>
                </tr>
            </thead>
            <tbody>
                {{#if tantieme}}
                <tr>
                    <td>{{t "ep.tantieme"}}</td>
                    <td class="col-numbers">{{tantieme}}</td>
                    <td class="col-numbers">{{tanF}}</td>
                    <td class="col-numbers">{{tantiemeI}}</td>
                </tr>
                {{/if}}
                {{#if avtorskiHonorarji}}
                <tr>
                    <td>{{t "ep.avtorskiHonorarji"}}</td>
                    <td class="col-numbers">{{avtorskiHonorarji}}</td>
                    <td class="col-numbers">{{avtHonF}}</td>
                    <td class="col-numbers">{{avtorskiHonorarjiI}}</td>
                </tr>
                {{/if}}
                <tr>
                    <td></td>
                    <td class="col-numbers"></td>
                    <td class="col-numbers"></td>
                    <td class="col-numbers">Vsota: {{vsota}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>