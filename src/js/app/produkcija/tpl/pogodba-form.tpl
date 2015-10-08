<form>
    <div class="row">
        <div class="col-sm-4">
            <fieldset>
                <legend>
                    <span>{{t "std.glavniPodatki"}}</span>
                </legend>
                <div class="prikazno-polje">
                    <div class="pull-right oseba vrednost">{{oseba.label}}</div>
                    <div class="attribut">{{t "pogodba.oseba"}}: </div>
                </div>
                <div class="prikazno-polje">
                    <div class="pull-right funkcija vrednost">{{funkcija}}</div>
                    <div class="attribut">{{t "pogodba.funkcija"}}: </div>
                </div>
                <div data-fields="zacetek,konec,popa,trr,jeAvtorskePravice"></div>
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
            <div class="row">
                <div class="col-sm-12">
                    <fieldset data-fields="igralec,zaposlenVDrJz,samozaposlen,sifra">
                        <legend>
                            <span>{{t "std.dodatniPodatki"}}</span>
                        </legend>
                    </fieldset>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6 col-md-offset-3" data-fields="opis"></div>
        </div>
    </div>
</form>