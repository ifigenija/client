<button class="btn btn-default izberi-check">{{t "std.obkljukaj"}}</button>
<table class="table table-striped table-condensed">
    <thead>
        <tr>
            <th class="col-sm-1">{{t "prenesi.oznaci"}}</th>
            <th class="col-sm-3">{{t "prenesi.atributi"}}</th>
            <th class="col-sm-2 col-numbers">{{t "prenesi.vrednostStara"}}</th>
            <th class="col-sm-2 col-numbers">{{t "prenesi.vrednostNa"}}</th>
            <th class="col-sm-2 col-numbers">{{t "prenesi.steviloPonovitev"}}</th>
            <th class="col-sm-2 col-numbers">{{t "prenesi.vrednostNova"}}</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <input class="avtorskiHonorarji" type="checkbox">
            </td>
            <td>{{t "ep.avtorskiHonorarji"}}</td>
            <td class="col-numbers">{{u "formatNumber" avtorskiHonorarji}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.Na.avtorskiHonorarji}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.steviloPonovitev}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.avtorskiHonorarji}}</td>
        </tr>
        <tr>
            <td>
                <input class="tantieme" type="checkbox">
            </td>
            <td>{{t "ep.tantieme"}}</td>
            <td class="col-numbers">{{u "formatNumber" tantieme}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.Na.avtorskePravice}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.steviloPonovitev}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.tantieme}}</td>
        </tr>
        <tr>
            <td>
                <input class="materialni" type="checkbox">
            </td>
            <td>{{t "ep.materialni"}}</td>
            <td class="col-numbers">{{u "formatNumber" materialni}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.Na.materialni}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.steviloPonovitev}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.materialni}}</td>
        </tr>
    </tbody>
</table>
