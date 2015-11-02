{{#if index}}
,
{{/if}}
<span class="podobne-osebe-link">
    <a href="{{href}}" class="alert-link" target="_blank">
        {{#if ime}}
        {{ime}}
        {{/if}}
        {{#if srednjeIme}}
        {{srednjeIme}}
        {{/if}}
        {{#if priimek}}
        {{priimek}}
        {{/if}}
    </a>
</span>
{{#if email}}
({{email}})
{{/if}}
