<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-md-6 ">
                    <fieldset>
                        <legend>
                            <span>{{t "uprizoritev.podatki"}}</span>
                        </legend>
                        <div data-fields="naslov,podnaslov"></div>
                        <div class="vnosno-polje">
                            <div class="naslov">
                                <label class="">{{t "uprizoritev.besedilo"}}</label>
                                <div class="help-block hidden">{{t "uprizoritev.d.besedilo"}}</div>
                                <div class="error-block"></div>
                            </div>
                            <div style="width: 100%; display: table;">
                                <div style="display: table-row">
                                    <div class="izbor"  data-editors="besedilo">  </div>
                                    <div class="dodaj" > <a class="btn btn-default gumb dodaj-besedilo" title="{{t "std.title.dodajBesedilo"}}"><i class="fa fa-plus"> </i></a> </div>
                                </div>
                            </div>
                        </div>
                        <div data-fields="datumPremiere,gostujoca,sifra,faza"></div>
                    </fieldset>
                </div>
                <div class="col-sm-12 col-md-6" >
                    <fieldset data-fields="naslovIzvirnika,podnaslovIzvirnika,delovniNaslov,kratkiNaslov,internacionalniNaslov">
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
                    <fieldset data-fields="producent,maticniOder,datumZacStudija,datumZakljucka,planiranoSteviloVaj">
                        <legend>
                            <span>{{t "uprizoritev.produkcija"}}</span>
                        </legend>
                    </fieldset>
                </div>
                <div class="col-sm-12 col-md-6" >
                    <fieldset data-fields="zvrstSurs,zvrstUprizoritve,trajanje,stOdmorov,sloAvtor,krstna,prvaSlovenska,jeKoprodukcija">
                        <legend>
                            <span>{{t "uprizoritev.lastnosti"}}</span>
                        </legend>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</form>