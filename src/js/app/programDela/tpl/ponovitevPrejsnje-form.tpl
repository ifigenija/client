<div class="panel-group" id="accordion" role="tablist">
    <div class="panel panel-default panel-form glava-panel">
        <div class="panel-heading podatki" role="tab">
            <div class="clearfix">
                <h4 class="glava-title" data-toggle="collapse" data-parent="#accordion" href="#podatki">
                    {{t "ponPrej.osnoviPodatki"}}
                </h4>

            </div>
        </div>
        <div id="podatki" class="panel-collapse collapse in" role="tabpanel">
            <div class="panel-body">
                <form>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="row">
                                <div class="col-sm-12 col-lg-6" data-fields="uprizoritev,tipProgramskeEnote,obiskDoma"></div>
                                <div class="col-sm-12 col-lg-6" data-fields="obiskGost,obiskZamejo"></div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="row">
                                <div class="col-sm-12 col-lg-6" data-fields="obiskInt,ponoviDoma"></div>
                                <div class="col-sm-12 col-lg-6" data-fields="ponoviZamejo,ponoviGost"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="panel panel-default panel-form glava-panel">
        <div class="panel-heading koprodukcija">
            <div class="clearfix">
                <h4 class="glava-title collapsed" data-toggle="collapse" data-parent="#accordion" href="#koprodukcija">
                    {{t "ponPrej.sredstva"}}
                </h4>

            </div>
        </div>
        <div id="koprodukcija" class="panel-collapse collapse" role="tabpanel">
            <div class="panel-body">
                <form>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="row">
                                <div class="col-sm-12 col-lg-6" data-fields="zaprosenProcent,nasDelez"></div>
                                <div class="col-sm-12 col-lg-6" data-fields="celotnaVrednostMat,drugiJavni"></div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="row">
                                <div class="col-sm-12 col-lg-6" data-fields="celotnaVrednostGostovSZ,vlozekGostitelja"></div>
                                <div class="col-sm-12 col-lg-6" data-fields="lastnaSredstva"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="panel panel-default panel-form glava-panel">
        <div class="panel-heading kadrovska">
            <div class="clearfix">
                <h4 class="glava-title collapsed" data-toggle="collapse" data-parent="#accordion" href="#kadrovska">
                    {{t "ponPrej.kadrovska"}}
                </h4>

            </div>
        </div>
        <div id="kadrovska" class="panel-collapse collapse" role="tabpanel">
            <div class="panel-body">
                <form>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="row">
                                <div class="col-sm-12 col-lg-6" data-fields="avtorskiHonorarji,tantieme,avtorskePravice"></div>
                                <div class="col-sm-12 col-lg-6" data-fields="stZaposUmet,stZaposDrug"></div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="row">
                                <div class="col-sm-12 col-lg-6" data-fields="stHonorarnih,stHonorarnihIgr"></div>
                                <div class="col-sm-12 col-lg-6" data-fields="stHonorarnihIgrTujJZ,stHonorarnihIgrSamoz"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>