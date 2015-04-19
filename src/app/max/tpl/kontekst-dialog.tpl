<div id="kontekstDialog" class="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="cancel close">&times;</button>
                <h4 class="modal-title">Nov kontekst</h4>
            </div>
            <div class="modal-body">
                <div class="input-group">
                    <input id="kontekstIme" class="input-xlarge" name="kontekstIme" type="text" placeholder="Ime konteksta"/>
                    <span class="help-block"></span>
                </div>
                <label class="checkbox">
                    <input id="kontekstAuto" name="kontekstAuto" type="checkbox"> Išči avtomatsko
                </label>
                <% if (globalPermission) { %>
                <label class="checkbox">
                    <input id="kontekstGlobal" name="kontekstGlobal" type="checkbox"> Skupni kontekst
                </label>
                <% } %>
            </div>
            <div class="modal-footer">
                <button type="button" class="cancel btn btn-default" data-dismiss="modal">Prekliči</button>
                <button type="button" class="save btn btn-primary">Shrani</button>
            </div>
        </div>
    </div>
</div>