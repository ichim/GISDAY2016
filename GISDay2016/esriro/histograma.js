
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
      "dojo/_base/lang",
      "dojo/dom-construct",
      "dojo/dom",

   "esri/dijit/HistogramTimeSlider"
], function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        lang,
        domConstruct,
        dom,



        HistogramTimeSlider

        ) {
    var clasa = new declare([], {
        postCreate: function () {

        },
        constructor: function () {
            declare.safeMixin(this, arguments);
            this.featureLayer = arguments[0].featureLayer;
            this.map = arguments[0].map;
            this.divId = arguments[0].divId;
        },
        start: function () {
            var div = document.createElement('DIV');
            div.id = "div_Tsld_" + parseInt(Math.random() * 10000).toString();

            dom.byId(this.divId).appendChild(div);

            var sliderElem = domConstruct.create("div", {
                id: "timeSlider_" + this.map.id,
                style: "margin-bottom:10px; bottom:33px"
            }, div.id);
            var sliderParams = {
              
                dateFormat: "DateFormat(selector: 'date', fullYear: true)",
                layers: [this.featureLayer],
                mode: "show_all",
                timeInterval: "esriTimeUnitsYears"
            };
            this.slider = new HistogramTimeSlider(sliderParams, sliderElem);
            this.slider.startup();
            this.map.setTimeSlider(this.slider);
            

        },
        destroy:function()
        {
            if(this.slider)
            this.slider.destroy();
        }
    });
    return clasa;
});