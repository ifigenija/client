<form>
    <div class="row">
        <div class="col-sm-8">
            <div class="row">
                <div class="col-sm-12 col-lg-6">
                    <fieldset data-fields="zacetek,konec,popa,trr,jeAvtorskePravice">
                        <legend>
                            <span>{{t "pogodba.osnovniPodatki"}}</span>
                        </legend>
                    </fieldset>
                </div>
                <div class="col-sm-12 col-lg-6">
                    <fieldset data-fields="vrednostPredstave,vrednostVaj,placiloNaVajo,vrednostVaje,planiranoSteviloVaj">
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