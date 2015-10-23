<form>
    <div class="row">
        <div class="col-sm-6">
            <fieldset class="fieldset-strosek-podatki">
                <legend>
                    <span>{{t "std.glavniPodatki"}}</span>
                </legend>
                <div data-fields="naziv,vrednostDo,vrednostNa"></div>
            </fieldset>
        </div>
        <div class="col-sm-6">
            <fieldset class="fieldset-strosek-dodatni">
                <legend>
                    <span>{{t "std.dodatniPodatki"}}</span>
                </legend>
                <div data-fields="tipstroska,vrstaStroska,popa,sort"></div>
            </fieldset>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6 col-sm-offset-3" data-fields="opis"></div>
    </div>
</form>