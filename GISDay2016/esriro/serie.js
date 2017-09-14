
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/_base/lang",


    "esri/layers/FeatureLayer",
    "esri/plugins/FeatureLayerStatistics"

], function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        lang,


        FeatureLayer,
        FeatureLayerStatistics

        ) {
    var clasa = new declare([], {
        postCreate: function () {

        },
        constructor: function () {

            declare.safeMixin(this, arguments);


            this.featureLayer = arguments[0].featureLayer;

            this.fieldName = arguments[0].fieldName;


           

        },
        get: function (callback) {

         
            
           

                var elemente = [];

                //var element = {};
      

                //element['y'] = 100;
                //element['text'] = "A";
                //element['tooltip'] = "A"+ ' (' + 100 + ')';
                //element['categorie'] = "A";
                //elemente.push(element);

                //element['y'] = 200;
                //element['text'] = "B";
                //element['tooltip'] = "B" + ' (' + 100 + ')';
                //element['categorie'] = "B";
                //elemente.push(element);

        

                //callback(elemente);
               

                var fls = new FeatureLayerStatistics({
                    layer: this.featureLayer,
                    visible:false
                });

                fls.getUniqueValues({ field: this.fieldName }).then(function (res) {
                    dojo.forEach(res.uniqueValueInfos, function (el) {
                        var element = {};


                        element['y'] = el.count;
                        element['text'] =el.value.toString().split(' ')[0];
                        element['tooltip'] = el.value + ' (' + el.count + ')';
                        element['categorie'] = el.value;
                        elemente.push(element);
                    });
                    callback(elemente);
                });
           

            

           
        }
    });
    return clasa;
});