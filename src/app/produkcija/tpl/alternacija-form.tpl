<form>
    <div class="row">
        <div class="col-sm-6" style="display: table;">
            <div data-fields="sifra,funkcija,oseba"></div>
            <div style="display: table-row">
                <div class="col-sm-9" data-fields="pogodba"></div>
                <a class="col-sm-3 btn btn-default pogodba-dodaj">
                    {{#if pogodba}}
                    {{t "std.uredi"}}
                    {{else}}
                    {{t "std.dodaj"}}
                    {{/if}}</a>
            </div>
        </div>
        <div class="col-sm-6"data-fields="zacetek,konec,privzeti,aktivna,zaposlen,zaposlitev"></div>
    </div>
</div>

<div class="row">
    <div class="col-sm-6 col-md-offset-3" data-fields="opomba"></div>
</div>
</form>