<form>
    <div class="row">
        <div class="col-sm-6">
            <div class="row">
                <div class="col-sm-12 col-md-6 ">
                <fieldset class="pomembni">
                    <legend>
                        <span>{{t "uprizoritev.podatki"}}</span>
                    </legend>
                    <div data-fields="naslov,podnaslov,besedilo"></div>
                    <div class="prikazno-polje">{{t "uprizoritev.avtor"}}: <div class="pull-right nasDelez vrednost">{{avtor}}</div></div>
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