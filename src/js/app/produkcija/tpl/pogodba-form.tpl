<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6">
                    <div style="display: table;">
                        <div style="display: table-row">
                            {{t "pogodba.oseba"}}: {{ oseba.label }}
                        </div>
                    </div>
                    <div data-fields="jeAvtorskePravice,igralec,zaposlenVDrJz,samozaposlen,zacetek,konec"></div>
                </div>
                <div class="col-sm-12 col-lg-6" data-fields="popa,trr,vrednostPredstave"></div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-lg-6" data-fields="placiloNaVajo,vrednostVaj,vrednostVaje,planiranoSteviloVaj"></div>
                <div class="col-sm-12 col-lg-6" data-fields="aktivna,sifra"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6 col-md-offset-3" data-fields="opis"></div>
        </div>
    </div>
</form>