<form>
    <div class="row">
        <div class="col-sm-6 col-md-4" data-fields="sifra,funkcija,oseba"></div>
        <div class="col-sm-6 col-md-4" style="display: table;">
            <div style="display: table-row">
                <div class="col-sm-9" data-fields="pogodba"></div>
                <a class="col-sm-3 btn btn-default pogodba-dodaj">{{t "entiteta.dodaj"}}</a>
            </div>
            <div data-fields="zacetek,konec,privzeti"></div>
        </div>
        <div class="col-sm-6 col-md-4" data-fields="aktivna,zaposlen,zaposlitev,sort"></div>
    </div>

    <div class="row">
        <div class="col-sm-6 col-md-offset-3" data-fields="opomba"></div>
    </div>
</form>