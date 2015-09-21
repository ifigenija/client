<form>
    <div class="row">
        <div class="col-sm-8">
            <div class="row">
                <div class="col-sm-12 col-lg-6">
                    <fieldset>
                        <legend>
                            <span>{{t "pogodba.osnovniPodatki"}}</span>
                        </legend>
                        <div style="display: table;">
                            <div style="display: table-row">
                                {{t "pogodba.oseba"}}: {{ oseba.label }}
                            </div>
                            <div style="display: table-row">
                                {{t "pogodba.funkcija"}}: {{ funkcija }}
                            </div>
                        </div>
                        <div data-fields="zacetek,konec,popa,trr,jeAvtorskePravice"></div>
                    </fieldset>
                </div>
                <div class="col-sm-12 col-lg-6">
                    <fieldset data-fields="jeProcentOdInkasa,procentOdInkasa,vrednostPredstave,vrednostVaj,placiloNaVajo,vrednostVaje,planiranoSteviloVaj">
                        <legend>
                            <span>{{t "pogodba.vrednost"}}</span>
                        </legend>
                    </fieldset>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="row">
                <div class="col-sm-12">
                    <fieldset data-fields="igralec,zaposlenVDrJz,samozaposlen,sifra">
                        <legend>
                            <span>{{t "pogodba.dodatniPodatki"}}</span>
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