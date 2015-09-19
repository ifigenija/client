<div class="col-md-4">
    <div class="panel panel-{{ statusJoba.class}}  panel-job {{ showGlow}}">
        <div class="panel-heading">
            <div class="panel-title">
                    <div class="panel-name">
                        {{ taskMeta.name }}
                    </div>
                    <div class="panel-status pull-right">
                        <span class="panel-status-label"><i class="fa fa-{{ statusJoba.icon}}"></i>{{  statusJoba.name}} </span>
                        <span class="panel-status-hide" style="display: none;"><i class="fa fa-remove"></i> {{t "jobs.skrij"}}</span>
                    </div>
                <div class="clearfix">
                </div>
            </div>
        </div>
        <div style="padding-top: 8px; padding-bottom: 8px" class="panel-body">
            <p style="margin-bottom: 0;">
                {{ name }}
                <br/>
                <i class="fa fa-time"></i>
                {{#if  izveden }}
                    {{u "timestamp" izveden}}
                {{else}}
                    {{u "timestamp" casIzvedbe }}
                {{/if}}
                <br/>
                <small style="top: 6px; text-align: right;">{{t "jobs.ustvaril" }} {{ user.username }}{{u "kdaj" datum}}
                </small>
            </p>
        </div>
    </div>
</div>