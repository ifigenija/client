<form>
    <div class="row">
        <div class="col-sm-6" style="display: table;">
            <div data-fields="sifra,funkcija,oseba"></div>
            <div style="display: table-row">
                {{t "alternacija.pogodba"}}: 
                {{#if imaPogodbo}}
                {{ pogodba.ident }}
                {{else}}
                {{t "std.prazno"}}
                {{/if}}
                <a class="pull-right btn btn-default pogodba-dodaj">
                    {{#if imaPogodbo}}
                    {{t "std.uredi"}}
                    {{else}}
                    {{t "std.dodaj"}}
                    {{/if}}
                </a>
            </div>
        </div>
        <div class="col-sm-6"data-fields="zacetek,konec,zaposlitev,pomembna,privzeti,aktivna"></div>
    </div>
</div>

<div class="row">
    <div class="col-sm-6 col-md-offset-3" data-fields="opomba"></div>
</div>
</form>