define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/dom",
    "dojo/_base/lang",
    "esri/dijit/TimeSlider",
    "esri/layers/TimeInfo",
    "esri/layers/FeatureLayer"

], function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        dom,
        lang,
        TimeSlider,
        TimeInfo,
        FeatureLayer

        ) {
    var clasa = new declare([], {
        postCreate: function () {

        },
        constructor: function () {
            declare.safeMixin(this, arguments);
            this.featureLayer = arguments[0].featureLayer;
            this.map = arguments[0].map;
            this.divId = arguments[0].divId;
            this.interval = arguments[0].interval;
           
        },
        start: function () {

            
            var div = document.createElement('DIV');
            div.id = "div_Tsld_" + parseInt(Math.random() * 10000).toString();
   
            dom.byId(this.divId).appendChild(div);

           
            this.timeSlider = new TimeSlider({style:"width:362px;"}, dom.byId(div.id));

            this.timeSlider.createTimeStopsByTimeInterval(this.featureLayer.timeInfo.timeExtent, 3, "esriTimeUnitsMonths");


            this.timeSlider.setThumbCount(2);

            this.timeSlider.setThumbIndexes([1, 3]);

            
            this.timeSlider.on('time-extent-change', lang.hitch(this, function (result) {
                var dat1 = result.startTime;
                var dat2 = result.endTime;
                this.interval.innerHTML = dat1.getMonth() + "/" + dat1.getFullYear() + " - " + dat2.getMonth() + "/" + dat2.getFullYear()

            }));

            this.timeSlider.startup();
            this.map.setTimeSlider(this.timeSlider);

           
        },
        destroy:function()
        {
            if (this.timeSlider)
            this.timeSlider.destroy();
            }

    });
    return clasa;
});