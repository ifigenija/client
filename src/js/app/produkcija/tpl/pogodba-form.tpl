<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-md-6">
                    <div style="display: table;">
                        <div style="display: table-row">
                            {{t "pogodba.alternacija"}}: {{ alternacija.label }}
                        </div>
                        <div style="display: table-row">
                            {{t "pogodba.oseba"}}: {{ oseba.label }}
                        </div>
                    </div>
                    <div data-fields="sifra,popa,trr"></div>
                </div>
                <div class="col-sm-12 col-md-6" data-fields="placiloNaVajo,vrednostVaj,vrednostVaje"></div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-md-6" data-fields="vrednostPredstave,planiranoSteviloVaj,aktivna"></div>
                <div class="col-sm-12 col-md-6" data-fields="zacetek,konec,zaposlenVDrJz,samozaposlen,igralec"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6 col-md-offset-3" data-fields="opis"></div>
        </div>
    </div>
</form>