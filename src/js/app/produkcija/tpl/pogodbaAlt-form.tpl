<form>
    <div class="row">
        <div class="col-sm-4">
            <fieldset data-fields="zacetek,konec,popa,trr,jeAvtorskePravice">
                <legend>
                    <span>{{t "std.glavniPodatki"}}</span>
                </legend>
            </fieldset>
        </div>
        <div class="col-sm-4">
            <fieldset data-fields="jeProcentOdInkasa,procentOdInkasa,vrednostPredstave,vrednostVaj,placiloNaVajo,vrednostVaje,planiranoSteviloVaj">
                <legend>
                    <span>{{t "pogodba.vrednost"}}</span>
                </legend>
            </fieldset>
        </div>
        <div class="col-sm-4">
            <fieldset data-fields="igralec,zaposlenVDrJz,samozaposlen,sifra">
                <legend>
                    <span>{{t "std.dodatniPodatki"}}</span>
                </legend>
            </fieldset>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6 col-md-offset-3" data-fields="opis"></div>
    </div>
</form>