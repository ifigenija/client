<button class="btn btn-default izberi-check">Označi</button>
<table class="table table-striped table-condensed">
    <thead>
        <tr>
            <th class="col-sm-1">{{t "prenesi.oznaci"}}</th>
            <th class="col-sm-5">{{t "prenesi.atributi"}}</th>
            <th class="col-sm-3 col-numbers">{{t "prenesi.vrednostStara"}}</th>
            <th class="col-sm-3 col-numbers">{{t "prenesi.vrednostNova"}}</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <input class="avtorskiHonorarji" type="checkbox">
            </td>
            <td>{{t "ep.avtorskiHonorarji"}}</td>
            <td class="col-numbers">{{u "formatNumber" avtorskiHonorarji}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.avtorskiHonorarji}}</td>
        </tr>
        <tr>
            <td>
                <input class="tantieme" type="checkbox">
            </td>
            <td>{{t "ep.tantieme"}}</td>
            <td class="col-numbers">{{u "formatNumber" tantieme}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.tantieme}}</td>
        </tr>
        <tr>
            <td>
                <input class="avtorskePravice" type="checkbox">
            </td>
            <td>{{t "ep.avtorskePravice"}}</td>
            <td class="col-numbers">{{u "formatNumber" avtorskePravice}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.avtorskePravice}}</td>
        </tr>
        <tr>
            <td>
                <input class="materialni" type="checkbox">
            </td>
            <td>{{t "ep.materialni"}}</td>
            <td class="col-numbers">{{u "formatNumber" materialni}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.materialni}}</td>
        </tr>
        <tr>
            <td>
                <input class="stZaposUmet" type="checkbox">
            </td>
            <td>{{t "ep.stZaposUmet"}}</td>
            <td class="col-numbers">{{u "formatNumber" stZaposUmet 0}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.stZaposUmet 0}}</td>
        </tr>
        <tr>
            <td>
                <input class="stZaposDrug" type="checkbox">
            </td>
            <td>{{t "ep.stZaposDrug"}}</td>
            <td class="col-numbers">{{u "formatNumber" stZaposDrug 0}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.stZaposDrug 0}}</td>
        </tr>
        <tr>
            <td>
                <input class="stHonorarnih" type="checkbox">
            </td>
            <td>{{t "ep.stHonorarnih"}}</td>
            <td class="col-numbers">{{u "formatNumber" stHonorarnih 0}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.stHonorarnih 0}}</td>
        </tr>
        <tr>
            <td>
                <input class="stHonorarnihIgr" type="checkbox">
            </td>
            <td>{{t "ep.stHonorarnihIgr"}}</td>
            <td class="col-numbers">{{u "formatNumber" stHonorarnihIgr 0}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.stHonorarnihIgr 0}}</td>
        </tr>
        <tr>
            <td>
                <input class="stHonorarnihIgrTujJZ" type="checkbox">
            </td>
            <td>{{t "ep.stHonorarnihIgrTujJZ"}}</td>
            <td class="col-numbers">{{u "formatNumber" stHonorarnihIgrTujJZ 0}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.stHonorarnihIgrTujJZ 0}}</td>
        </tr>
        <tr>
            <td>
                <input class="stHonorarnihIgrSamoz" type="checkbox">
            </td>
            <td>{{t "ep.stHonorarnihIgrSamoz"}}</td>
            <td class="col-numbers">{{u "formatNumber" stHonorarnihIgrSamoz 0}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.stHonorarnihIgrSamoz 0}}</td>
        </tr>
    </tbody>
</table>
