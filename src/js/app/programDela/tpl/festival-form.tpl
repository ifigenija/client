<div class="panel-group" id="accordion" role="tablist">
    <div class="panel panel-default panel-form glava-panel">
        <div class="panel-heading podatki" role="tab">
            <div class="clearfix">
                <h4 class="glava-title" data-toggle="collapse" data-parent="#accordion" href="#podatki">
                    {{t "festival.oFestivalu"}}
                </h4>

            </div>
        </div>
        <div id="podatki" class="panel-collapse collapse in" role="tabpanel">
            <div class="panel-body">
                <form>
                    <div class="row">
                        <div class="col-sm-6 col-md-3" data-fields="naziv,zvrst,stPredstav"></div>
                        <div class="col-sm-6 col-md-3" data-fields="stPredstavitev,stDelavnic"></div>
                        <div class="col-sm-6 col-md-3" data-fields="stDrugiDogodki,stProdukcij,obiskDoma"></div>
                        <div class="col-sm-6 col-md-3" data-fields="casPriprave,casIzvedbe,prizorisca"></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-md-offset-3" data-fields="opredelitevDrugiDogodki"></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="panel panel-default panel-form glava-panel">
        <div class="panel-heading koprodukcija">
            <div class="clearfix">
                <h4 class="glava-title collapsed" data-toggle="collapse" data-parent="#accordion" href="#koprodukcija">
                    {{t "festival.koprodukcija"}}
                </h4>

            </div>
        </div>
        <div id="koprodukcija" class="panel-collapse collapse" role="tabpanel">
            <div class="panel-body">
                <form>
                    <div class="row">
                        <div class="col-sm-6" data-fields="umetVodja,programskoTelo,soorganizatorji"></div>
                        <div class="col-sm-6" data-fields="stTujihSelektorjev,stZaposlenih,stHonorarnih"></div>
                    </div>
            </div>
            </form>
        </div>
    </div>
    <div class="panel panel-default panel-form glava-panel">
        <div class="panel-heading sredstva">
            <div class="clearfix">
                <h4 class="glava-title collapsed" data-toggle="collapse" data-parent="#accordion" href="#sredstva">
                    {{t "festival.sredstva"}}
                </h4>

            </div>
        </div>
        <div id="sredstva" class="panel-collapse collapse" role="tabpanel">
            <div class="panel-body">
                <form>
                    <div class="row">
                        <div class="col-sm-6" data-fields="nasDelez,lastnaSredstva"></div>
                        <div class="col-sm-6" data-fields="drugiJavni"></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>