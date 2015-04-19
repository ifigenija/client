<form class="">
    <div class="form-group">
        <label class="control-label col-sm-4" for="naziv">Opis datoteke: </label>
        <div class="col-sm-8">
            <input id="naziv" type="text" class="form-control" required="true" value="<%= naziv %>"></input>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-sm-4" for="stevilka">Številka: </label>
        <div class="col-sm-8">
            <input id="stevilka" class="form-control" type="text"  value="<%= stevilka %>"></input>
        </div>
    </div>
</form>

<button id="uredi-datoteko" class="btn btn-primary pull-right"><i class="fa fa-file"></i> Shrani</button>