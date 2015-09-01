<div class="col-sm-6 col-md-4 col-lg-3">
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="panel-title">
                <h3 class="panel-title">
                    <div class="clearfix">
                        <div class="panel-name">{{naziv}}</div>
                        <div class="panel-status pull-right">
                            <span class="panel-status-label">
                                {{#if zakljuceno}}
                                    {{#if potrjenProgram}}
                                        {{t "programDela.potrjen"}}<i class="fa fa-check-circle"></i>
                                    {{else}}
                                        {{t "programDela.poslanMzK"}} <i class="fa fa-share-square"></i>
                                    {{/if}}
                                {{else}}
                                    {{t "programDela.vDelu"}} <i class="fa fa-briefcase"></i>                                    
                                {{/if}}
                            </span>
                        </div>
                    </div>
                </h3>
            </div>
        </div>
        <div style="padding-top: 8px; padding-bottom: 8px" class="panel-body  mouse-hand">
            <p style="margin-bottom: 0;">
                <i class="fa fa-calendar"></i> {{t "programDela.sezona"}} : {{sezona}}
                <br />
                <i class="fa fa-clock-o"></i> {{t "ent.zacetek"}} : {{u "date" zacetek}}
                <br />
                <i class="fa fa-clock-o"></i> {{t "ent.konec"}} : {{u "date" konec}}
                <br />
                <i class="fa fa-money"></i> {{t "programDela.vrednostPs1"}} : {{vrPS1}}
                <br />
            </p>
        </div>
    </div>
</div>