<span style="min-width: 20px;"><i class="<%= jeMapa ? "fa fa-folder-close-alt" : "fa fa-file" %>"></i></span>
<%= naziv %><% if (zaklenjena) { %>
<i class="fa fa-lock"></i>
<% } %>
<% if (tdok) { %>
<div class="pull-right"> <span class="badge" data-toggle="tooltip" title="<%= tdok.naziv %>"><%= tdok.sifra %></span></div>
<% } %>
