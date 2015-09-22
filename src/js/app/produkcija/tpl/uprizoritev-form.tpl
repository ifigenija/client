<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-md-6 ">
                    <fieldset class="pomembni">
                        <legend>
                            <span>{{t "uprizoritev.podatki"}}</span>
                        </legend>
                        <div data-fields="naslov,podnaslov"></div>
                        <div class="besedilo-vnosno-polje">
                            <div class="besedilo-naslov">
                                <label class="">{{t "uprizoritev.besedilo"}}</label>
                                <div class="help-block hidden">{{t "uprizoritev.d.besedilo"}}</div>
                                <div class="error-block"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-10" data-editors="besedilo"></div>
                                <div class="col-sm-2">
                                    <a class="btn btn-default dodaj-besedilo" title="{{t "std.title.dodajBesedilo"}}">
                                        <i class="fa fa-plus"> </i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="prikazno-polje">{{t "uprizoritev.avtorji"}}: <div class="pull-right avtor">{{avtor}}</div></div>
                        <div data-fields="datumPremiere,gostujoca,sifra,faza"></div>
                    </fieldset>
                </div>
                <div class="col-sm-12 col-md-6" >
                    <fieldset class="" data-fields="naslovIzvirnika,podnaslovIzvirnika,delovniNaslov,kratkiNaslov,internacionalniNaslov">
                        <legend>
                            <span>{{t "uprizoritev.naslovi"}}</span>
                        </legend>
                    </fieldset>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-md-6" >
                    <fieldset class="" data-fields="producent,maticniOder,datumZacStudija,datumZakljucka,planiranoSteviloVaj">
                        <legend>
                            <span>{{t "uprizoritev.produkcija"}}</span>
                        </legend>
                    </fieldset>
                </div>
                <div class="col-sm-12 col-md-6" >
                    <fieldset class="" data-fields="zvrstSurs,zvrstUprizoritve,trajanje,stOdmorov,sloAvtor,krstna,prvaSlovenska">
                        <legend>
                            <span>{{t "uprizoritev.lastnosti"}}</span>
                        </legend>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</form>