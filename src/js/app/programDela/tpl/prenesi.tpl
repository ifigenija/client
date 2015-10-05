<button class="btn btn-default izberi-check">{{t "std.obkljukaj"}}</button>
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
                <input class="nasDelez" type="checkbox">
            </td>
            <td>{{t "ep.nasDelez"}}</td>
            <td class="col-numbers">{{u "formatNumber" nasDelez}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.nasDelez}}</td>
        </tr>
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
                <input class="materialni" type="checkbox">
            </td>
            <td>{{t "ep.materialni"}}</td>
            <td class="col-numbers">{{u "formatNumber" materialni}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.materialni}}</td>
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
                <input class="stHonorarnihZun" type="checkbox">
            </td>
            <td>{{t "ep.stHonorarnihZun"}}</td>
            <td class="col-numbers">{{u "formatNumber" stHonorarnihZun 0}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.stHonorarnihZun 0}}</td>
        </tr>
        <tr>
            <td>
                <input class="stHonorarnihZunIgr" type="checkbox">
            </td>
            <td>{{t "ep.stHonorarnihZunIgr"}}</td>
            <td class="col-numbers">{{u "formatNumber" stHonorarnihZunIgr 0}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.stHonorarnihZunIgr 0}}</td>
        </tr>
        <tr>
            <td>
                <input class="stHonorarnihZunIgrTujJZ" type="checkbox">
            </td>
            <td>{{t "ep.stHonorarnihZunIgrTujJZ"}}</td>
            <td class="col-numbers">{{u "formatNumber" stHonorarnihZunIgrTujJZ 0}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.stHonorarnihZunIgrTujJZ 0}}</td>
        </tr>
        <tr>
            <td>
                <input class="stHonorarnihZunSamoz" type="checkbox">
            </td>
            <td>{{t "ep.stHonorarnihZunSamoz"}}</td>
            <td class="col-numbers">{{u "formatNumber" stHonorarnihZunSamoz 0}}</td>
            <td class="col-numbers">{{u "formatNumber" uprizoritevData.NaDo.stHonorarnihZunSamoz 0}}</td>
        </tr>
        <tr>
            <td>
                <input class="datumZacStudija" type="checkbox">
            </td>
            <td>{{t "ep.datumZacStudija"}}</td>
            <td class="col-numbers">{{u "date" datumZacStudija}}</td>
            <td class="col-numbers">{{u "date" uprizoritevData.datumZacStudija}}</td>
        </tr>
        <tr>
            <td>
                <input class="datumPremiere" type="checkbox">
            </td>
            <td>{{t "ep.datumPremiere"}}</td>
            <td class="col-numbers">{{u "date" datumPremiere}}</td>
            <td class="col-numbers">{{u "date" uprizoritevData.datumPremiere}}</td>
        </tr>
    </tbody>
</table>
