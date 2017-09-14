define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/_base/lang",

    "esri/renderers/HeatmapRenderer"

], function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        lang,

        HeatmapRenderer

        ) {
    var clasa = new declare([], {
        postCreate: function () {

        },
        constructor: function () {
            declare.safeMixin(this, arguments);


            this.featureLayer = arguments[0].featureLayer;

            
        },
        simbolizare: function () {
           
            var hmr = new HeatmapRenderer({
                blurRadius: 9,
                colors: [
                    { ratio: 0, color: "rgba(0,0,0,0)" },
                    { ratio: 0.4, color: "rgb(0,255,0)" },
                    { ratio: 0.7, color: "rgb(255,255,0)" },
                    { ratio: 0.86, color: "rgb(255,128,0)" },
                    { ratio: 0.94, color: "rgb(255,0,0)" }
                ]
            });

            this.featureLayer.setRenderer(hmr);

          
           
        }
    });
    return clasa;
});