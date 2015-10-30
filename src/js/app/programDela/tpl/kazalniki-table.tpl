<div class="kazalniki-right">
    <h3>{{t "kazalnik.dokument"}}</h3>
    <table class="table table-striped table-condensed">
        <thead>
            <tr>
                <th class="col-sm-9">{{t "kazalnik.kazalci"}}</th>
                <th class="col-sm-3 col-numbers"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{t "kazalnik.stPremier"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stPremier 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stPonPrej"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stPonPrej 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stVsehPredstav"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stVsehPredstav}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stObiskNekom"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stObiskNekom 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stProdVstopnic"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stProdVstopnic 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stIzvGostovanjSlo"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvGostovanjSlo}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stIzvGostovanjZam"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvGostovanjZam}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stIzvGostovanjInt"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvGostovanjInt 0}}</td>
            </tr>
        </tbody>
    </table>

    <h4>{{t "kazalnik.sklop1"}}</h4>
    <table class="table table-striped table-condensed">
        <thead>
            <tr>
                <th class="col-sm-3">{{t "kazalnik.sklop1"}}</th>
                <th class="col-sm-1 col-numbers">{{t "kazalnik.stEnot"}}</th>
                <th class="col-sm-2 col-numbers">{{t "kazalnik.virMK"}}</th>
                <th class="col-sm-3 col-numbers">{{t "kazalnik.virDMLS"}}</th>
                <th class="col-sm-1 col-numbers">{{t "kazalnik.virLastna"}}</th>
                <th class="col-sm-1 col-numbers">{{t "kazalnik.drugiVir"}}</th>
                <th class="col-sm-1 col-numbers">{{t "kazalnik.vlozGostit"}}</th>
                <th class="col-sm-2 col-numbers">{{t "kazalnik.skupaj"}}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{t "kazalnik.premiere"}}</td>
                <td class="col-numbers">{{u "formatNumber" stPremier 0}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaZaprosenoPrem}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiJavniPrem}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaLastnaPrem}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiViriPrem}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaVlozekGostiteljaPrem}}</td>
                <td class="col-numbers">{{u "formatNumber" premiereSredstva}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.ponovitvePremier"}}</td>
                <td class="col-numbers">{{u "formatNumber" stPonPrem 0}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaZaprosenoPonPrem}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiJavniPonPrem}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaLastnaPonPrem}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiViriPonPrem}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaVlozekGostiteljaPonPrem}}</td>
                <td class="col-numbers">{{u "formatNumber" ponovitvePremierSredstva}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.ponovitveprejsnjih"}}</td>
                <td class="col-numbers">{{u "formatNumber" stPonPrej 0}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaZaprosenoPonPrej}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiJavniPonPrej}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaLastnaPonPrej}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiViriPonPrej}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaVlozekGostiteljaPonPrej}}</td>
                <td class="col-numbers">{{u "formatNumber" ponovitvePrejsnjihSredstva}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.gostujoce"}}</td>
                <td class="col-numbers">{{u "formatNumber" stGostujo 0}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaZaprosenoGostujo}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiJavniGostujo}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaLastnaGostujo}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiViriGostujo}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaVlozekGostiteljaGostujo}}</td>
                <td class="col-numbers">{{u "formatNumber" gostujoceSredstva}}</td>
            </tr>
            <tr>
                <td><b>{{t "kazalnik.skupajSklop1"}}</b></td>
                <td class="col-numbers">{{u "formatNumber" stEnotSK1 0}}</td>
                <td class="col-numbers">{{u "formatNumber" mkViriSK1}}</td>
                <td class="col-numbers">{{u "formatNumber" dmlsViriSK1}}</td>
                <td class="col-numbers">{{u "formatNumber" lastnaSK1}}</td>
                <td class="col-numbers">{{u "formatNumber" drugiViriSK1}}</td>
                <td class="col-numbers">{{u "formatNumber" vlozekGostSK1}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaSkupajSK1}}</td>
            </tr>
        </tbody>
    </table>

    <h4>{{t "kazalnik.sklop2"}}</h4>
    <table class="table table-striped table-condensed">
        <thead>
            <tr>
                <th class="col-sm-3">{{t "kazalnik.sklop2"}}</th>
                <th class="col-sm-1 col-numbers">{{t "kazalnik.stEnot"}}</th>
                <th class="col-sm-2 col-numbers">{{t "kazalnik.virMK"}}</th>
                <th class="col-sm-3 col-numbers">{{t "kazalnik.virDMLS"}}</th>
                <th class="col-sm-1 col-numbers">{{t "kazalnik.virLastna"}}</th>
                <th class="col-sm-1 col-numbers">{{t "kazalnik.drugiVir"}}</th>
                <th class="col-sm-1 col-numbers">{{t "kazalnik.vlozGostit"}}</th>
                <th class="col-sm-2 col-numbers">{{t "kazalnik.skupaj"}}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{t "kazalnik.gostovanja"}}</td>
                <td class="col-numbers">{{u "formatNumber" stInt 0}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaZaprosenoInt}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiJavniInt}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaLastnaInt}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiViriInt}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaVlozekGostiteljaInt}}</td>
                <td class="col-numbers">{{u "formatNumber" gostovanjaSredstva}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.festivali"}}</td>
                <td class="col-numbers">{{u "formatNumber" stFest 0}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaZaprosenoFest}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiJavniFest}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaLastnaFest}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiViriFest}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaVlozekGostiteljaFest}}</td>
                <td class="col-numbers">{{u "formatNumber" festivaliSredstva}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.razni"}}</td>
                <td class="col-numbers">{{u "formatNumber" stRazno 0}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaZaprosenoRazno}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiJavniRazno}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaLastnaRazno}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiViriRazno}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaVlozekGostiteljaRazno}}</td>
                <td class="col-numbers">{{u "formatNumber" raznoSredstva}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.izjemni"}}</td>
                <td class="col-numbers">{{u "formatNumber" stIzjem 0}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaZaprosenoIzjem}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiJavniIzjem}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaLastnaIzjem}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaDrugiViriIzjem}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaVlozekGostiteljaIzjem}}</td>
                <td class="col-numbers">{{u "formatNumber" izjemniSredstva}}</td>
            </tr>
            <tr>
                <td><b>{{t "kazalnik.skupajSklop2"}}</b></td>
                <td class="col-numbers">{{u "formatNumber" stEnotSK2 0}}</td>
                <td class="col-numbers">{{u "formatNumber" mkViriSK2}}</td>
                <td class="col-numbers">{{u "formatNumber" dmlsViriSK2}}</td>
                <td class="col-numbers">{{u "formatNumber" lastnaSK2}}</td>
                <td class="col-numbers">{{u "formatNumber" drugiViriSK2}}</td>
                <td class="col-numbers">{{u "formatNumber" vlozekGostSK2}}</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaSkupajSK2}}</td>
            </tr>
        </tbody>
    </table>

    <table class="table table-striped table-condensed">
        <thead>
            <tr>
                <th class="col-sm-3"></th>
                <th class="col-sm-1 col-numbers">{{t "kazalnik.stEnot"}}</th>
                <th class="col-sm-2 col-numbers">{{t "kazalnik.virMK"}}</th>
                <th class="col-sm-3 col-numbers">{{t "kazalnik.virDMLS"}}</th>
                <th class="col-sm-1 col-numbers">{{t "kazalnik.virLastna"}}</th>
                <th class="col-sm-1 col-numbers">{{t "kazalnik.drugiVir"}}</th>
                <th class="col-sm-1 col-numbers">{{t "kazalnik.vlozGostit"}}</th>
                <th class="col-sm-2 col-numbers">{{t "kazalnik.skupaj"}}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><b>{{t "kazalnik.skupajSk"}}</b></td>
                <td class="col-numbers">{{u "formatNumber" stEnotSkupaj 0}}</td>
                <td class="col-numbers">{{u "formatNumber" mkViriSkupaj}}</td>
                <td class="col-numbers">{{u "formatNumber" dmlsViriSkupaj}}</td>
                <td class="col-numbers">{{u "formatNumber" lastnaSkupaj}}</td>
                <td class="col-numbers">{{u "formatNumber" drugiViriSkupaj}}</td>
                <td class="col-numbers">{{u "formatNumber" vlozekGostSkupaj}}</td>
                <td class="col-numbers">{{u "formatNumber" skSkupaj}}</td>
            </tr>
        </tbody>
    </table>

    <h3>{{t "kazalnik.priloga2"}}</h3>
    <table class="table table-striped table-condensed">
        <thead>
            <tr>
                <th class="col-sm-9">{{t "kazalnik.naslov"}}</th>
                <th class="col-sm-3 col-numbers">{{t "kazalnik.nacrtovano"}}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{t "kazalnik.stPremier"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stPremier 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stPonPrejVelikih"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stPremierVelikih 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stPonPrejMalih"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stPremierMalih 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stPonPrejMalihKopr"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stPremierMalihKopr 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stPonPrejSredKopr"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stPremierSredKopr 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stPonPrejVelikihKopr"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stPremierVelikihKopr 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stPonPrej"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stPonPrej 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stPonPrejVelikih"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stPonPrejVelikih 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stPonPrejMalih"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stPonPrejMalih 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stPonPrejMalihKopr"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stPonPrejMalihKopr 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stPonPrejSredKopr"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stPonPrejSredKopr 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stPonPrejVelikihKopr"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stPonPrejVelikihKopr 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.vrPS1"}}:</td>
                <td class="col-numbers">{{u "formatNumber" vrPS1}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.vrPS1Do"}}:</td>
                <td class="col-numbers">{{u "formatNumber" vrPS1Do}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.vrPS1Mat"}}:</td>
                <td class="col-numbers">{{u "formatNumber" vrPS1Mat}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.vrPS1GostovSZ"}}:</td>
                <td class="col-numbers">{{u "formatNumber" vrPS1GostovSZ}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stIzvNekomerc"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvNekomerc}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stIzvPrem"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvPrem}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.oderDom"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvPremDoma 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.oderSloZam"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvPremKopr 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.gostSlo"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvPonPremGost}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.gostZam"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvPonPremZamejo}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.gostTuj"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvPonPremInt 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.oderKopTuj"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvPonPremKoprInt 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stIzvPonPrej"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvPonPrej}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.oderDom"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvPonPrejDoma 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.oderSloZam"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvPonPrejKopr 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.gostSlo"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvPonPrejGost}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.gostZam"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvPonPrejZamejo}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.gostTuj"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvPonPrejInt 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.oderKopTuj"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvPonPrejKoprInt 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stIzvGostuj"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvGostuj 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stIzvOstalihNek"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvOstalihNek}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stIzvGostovanjSlo"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvGostovanjSlo 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stIzvGostovanjZam"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvGostovanjZam}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stIzvGostovanjInt"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stIzvGostovanjInt 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stObiskPrem"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stObiskPrem 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.obiskDom"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stObiskPremDoma 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.obiskSloZam"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stObiskPremKopr 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.obiskKopTuj"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stObiskPonPremKoprInt 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.obiskGostSlo"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stObiskPonPremGost 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.obiskGostZam"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stObiskPonPremZamejo 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.obiskGostInt"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stObiskPonPremInt 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stObiskNekom"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stObiskNekom 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stObiskNekomMat"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stObiskNekomMat 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stObiskNekomGostSlo"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stObiskNekomGostSlo 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stObiskNekomGostZam"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stObiskNekomGostZam 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stObiskNekomGostInt"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stObiskNekomGostInt 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.avgObiskPrired"}}:</td>
                <td class="col-numbers">{{u "formatNumber" avgObiskPrired}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.obiskPov"}}:</td>
                <td class="col-numbers">{{u "formatNumber" obiskPov}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.avgZasedDvoran"}}:</td>
                <td class="col-numbers">{{u "formatNumber" avgZasedDvoran}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.avgCenaVstopnice"}}:</td>
                <td class="col-numbers">{{u "formatNumber" avgCenaVstopnice}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stProdVstopnic"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stProdVstopnic 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stKoprodukcij"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stKoprodukcij 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stKoprodukcijInt"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stKoprodukcijInt 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stKoprodukcijNVO"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stKoprodukcijNVO 0}}</td>
            </tr>        
            <tr>
                <td>{{t "kazalnik.stZaposlenih"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stZaposlenih 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stZaposIgralcev"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stZaposIgralcev 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.avgStNastopovIgr"}}:</td>
                <td class="col-numbers">{{u "formatNumber" avgStNastopovIgr}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.stHonorarnihZun"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stHonorarnihZun 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stHonorarnihZunSamoz"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stHonorarnihZunSamoz 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stHonorarnihZunIgr"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stHonorarnihZunIgr 0}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.stHonorarnihZunIgrTujJZ"}}:</td>
                <td class="col-numbers">{{u "formatNumber" stHonorarnihZunIgrTujJZ 0}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.sredstvaInt"}}:</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaInt}}</td>
            </tr>
            <tr>
                <td>{{t "kazalnik.sredstvaAvt"}}:</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaAvt}}</td>
            </tr>
            <tr>
                <td class="kazalnik-padleft">- {{t "kazalnik.sredstvaAvtSamoz"}}:</td>
                <td class="col-numbers">{{u "formatNumber" sredstvaAvtSamoz}}</td>
            </tr>
        </tbody>
    </table>
</div>