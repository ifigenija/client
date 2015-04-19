<div id="dialog-nova-priponka">
    <form class="form-horizontal">
        <div class="form-group">
            <label class="control-label col-sm-3" for="priponka-naziv">Ime priponke: </label>
            <div class="col-sm-9">
                <input id="priponka-naziv" class="form-control" type="text" required="true"></input>
            </div>
        </div>
        <div  class="form-group">
            <label class="control-label col-sm-3" for="priponka-tip">Tip priponke: </label>
            <div class="col-sm-9">
                <select class="form-control" id="priponka-tip">sm
                    <option value="file">Datoteka</option>
                    <option value="folder">Mapa</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label" for="priponka-tip">Vrsta dokumenta: </label>
            <div class="col-sm-9 lookup">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-3 col-sm-9">
                <button class="shrani  btn btn-default btn-primary">Shrani</button>
                <button class="preklici btn btn-default">Prekliči</button>
            </div>
        </div>
    </form>

</div>