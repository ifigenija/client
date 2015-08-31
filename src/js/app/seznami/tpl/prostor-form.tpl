<form>
    <div class="row">
        <div class="col-sm-6">
            <div data-fields="naziv,popa"></div>
            <div class="row">
                <div class="col-sm-10 col-lg-9">
                    <div data-fields="naslov"></div>
                </div>
                <div class="col-sm-2 col-lg-3 vnosno-polje-gumb">
                    <a class="btn btn-default prostor-dodaj-naslov" title="{{t "std.title.dodajnaslov"}}">
                        <i class="fa fa-plus"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-sm-6" data-fields="kapaciteta,jePrizorisce,sifra"></div>
    </div>
    <div class="row">
        <div class="col-sm-6 col-md-offset-3" data-fields="opis"></div>
    </div>
</form>