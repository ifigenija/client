<div class="panel panel-default">
    <div class="panel-heading">{{t "prenesi.title"}}</div>
    <div class="panel-body">

        <table class="table table-striped table-condensed">
            <thead>
                <tr>
                    <th class="col-sm-1">{{t "prenesi.checkbox"}}</th>
                    <th class="col-sm-5">{{t "prenesi.atributi"}}</th>
                    <th class="col-sm-3 col-numbers">{{t "prenesi.vrednostStara"}}</th>
                    <th class="col-sm-3 col-numbers">{{t "prenesi.vrednostNova"}}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input class="stZaposDrug" type="checkbox">
                    </td>
                    <td>{{t "ep.stZaposDrug"}}</td>
                    <td class="col-numbers">{{stZaposDrug}}</td>
                    <td class="col-numbers">{{rpc.stZaposDrug}}</td>
                </tr>
                <tr>
                    <td>
                        <input class="stHonorarnih" type="checkbox">
                    </td>
                    <td>{{t "ep.stHonorarnih"}}</td>
                    <td class="col-numbers">{{stHonorarnih}}</td>
                    <td class="col-numbers">{{rpc.stHonorarnih}}</td>
                </tr>
                <tr>
                    <td>
                        <input class="stHonorarnihIgr" type="checkbox">
                    </td>
                    <td>{{t "ep.stHonorarnihIgr"}}</td>
                    <td class="col-numbers">{{stHonorarnihIgr}}</td>
                    <td class="col-numbers">{{rpc.stHonorarnihIgr}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>