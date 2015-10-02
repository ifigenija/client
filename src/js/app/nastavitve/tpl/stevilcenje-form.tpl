<form class="row">
    <div class="col-sm-6 col-md-4">
        <fieldset data-fields="naziv,globalno,poLetih,sifra">
            <legend>
                <span>{{t "stevilcenje.glavniPodatki"}}</span>
            </legend>
        </fieldset>
    </div>
    <div class="col-sm-6 col-md-8">
        <fieldset>
            <legend>
                <span>{{t "stevilcenje.dodatniPodatki"}}</span>
            </legend>
            <div class="row">
                <div class="col-sm-6" data-fields="prefix,suffix"></div>
                <div class="col-sm-6" data-fields="format,zacetek"></div>
            </div>
        </fieldset>
    </div>
</form>