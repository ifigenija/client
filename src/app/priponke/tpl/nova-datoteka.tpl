

<div class="clearfix" style="margin-bottom: 5px">
<button id="ustvari-datoteko" class=" btn btn-default btn-success pull-right"><i class="fa fa-file"></i> Nova datoteka</button>
<p>Ustvari novo datoteko. V naslednjm koraku jo prenesete na sistem.</p>
</div>
<form class="form-horizontal">
    <div class="form-group">
        <label class="col-sm-3" for="naziv">Opis datoteke: </label>
        <div class="col-sm-9">
            <input id="naziv" class="form-control" type="text" required="true" value="<%= naziv %>"></input>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-3" for="stevilka">Številko generiraj samodejno: </label>
        <div class="col-sm-9">
            <input id="samodejnaStevilka" checked="true" type="checkbox"></input>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-3" for="stevilka">Številka: </label>
        <div class="col-sm-9">
            <input class="form-control" id="stevilka" disabled="disabled" type="text"  value="<%= stevilka %>"></input>
        </div>
    </div>
</form>



