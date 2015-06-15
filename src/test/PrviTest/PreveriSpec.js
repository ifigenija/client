define(['jquery', 'app/Max/Module/Form'], function ($, Form) {

    describe('just checking', function () {


        it('works for underscore', function () {
   
            var f = new Form({
                schema: {
                   "sifra": {
                        "name": "sifra",
                        "validators": [],
                        "type": "Toone",
                        "help": "",
                        "editorAttrs": {
                            "type": "sifra",
                            "class": "sifra-polje form-control",
                            "name": "sifra",
                            "required": true,
                            "maxlength": 4,
                            "prependIcon": "fa fa-barcode"
                        },
                        "targetEntity": "drzava",
                        "group": "Osnovni podatki",
                        "title": "Sifra"
                    },
                }
                
            });
            
            $('<div></div>').append(f.render().el);
            
            expect(f.$('input')).to.not.be.null;
            
            var e = f.fields['sifra'];
            console.log(e.editor);   
            e.getValue();
            e.setValue('12123');
            
            
            expect(f.getValue().sifra).to.equal('12123')
         
        });
        
        
       
    });
});