<form>
    <fieldset>
        <legend>
            <span>{{t "alternacija.seznam"}}</span>
        </legend>
        <div class="vnosno-polje">
            <div class="naslov">
                <label>{{t "funkcija.alternacije"}}</label>
                <div class="help-block hidden">{{t "funkcija.d.alternacije"}}</div>
                <div class="error-block"></div>
            </div>
            <div style="width: 100%; display: table;">
                <div style="display: table-row">
                    <div class="izbor alter-izbor"></div>
                    <div class="dodaj"> 
                        <a class="btn btn-default gumb oseba-nova" title="{{t "std.title.dodajBesedilo"}}">
                            <i class="fa fa-user-plus"> </i>
                        </a> 
                    </div>
                </div>
            </div>
        </div>
    </fieldset>
    <div class="row">
        <div class="col-sm-12 alter-seznam"></div>
    </div>
</form>
