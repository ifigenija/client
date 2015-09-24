<form>
    <div class="row">
        <div class="col-sm-6">
            <fieldset class="fieldset-strosek-podatki">
                <legend>
                    <span>{{t "stroskovnik.osnovniPodatki"}}</span>
                </legend>
                <div data-fields="naziv,vrednostDo,vrednostNa"></div>
            </fieldset>
        </div>
        <div class="col-sm-6">
            <fieldset class="fieldset-strosek-dodatni">
                <legend>
                    <span>{{t "stroskovnik.dodatniPodatki"}}</span>
                </legend>
                <div data-fields="tipstroska,vrstaStroska,popa,sort"></div>
            </fieldset>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6 col-sm-offset-3" data-fields="opis"></div>
    </div>
</form>