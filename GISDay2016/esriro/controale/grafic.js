define(
        [
            "dojo/_base/declare",
            "dijit/_WidgetBase",
            "dijit/_TemplatedMixin",
            "dijit/_AttachMixin",
            "dijit/_WidgetsInTemplateMixin",
            "dojo/text!./templates/grafic.html",

            "dojo/parser",
            "dojo/_base/lang",
            "dojo/_base/array",
            "dojo/_base/event",
            "dojo/dom-construct",
            "dojo/dom",
            "dojo/on",
            "dojo/Deferred"
            ,
            "dojox/charting/Chart",
            "dojox/charting/plot2d/Pie",
            "dojox/charting/action2d/Highlight",
            "dojox/charting/action2d/MoveSlice",
            "dojox/charting/action2d/Tooltip",
            "dojox/charting/themes/MiamiNice",
            "dojox/charting/widget/Legend"




        ],
        function (
                declare,
                _WidgetBase,
                _TemplatedMixin,
                _AttachMixin,
                _WidgetsInTemplateMixin,
                widgetTemplateString,

                parser,
                lang,
                array,
                event,
                domConstruct,
                dom,
                on,
                Deferred
                ,
                Chart
                ,
                Pie, Highlight, MoveSlice, Tooltip, MiamiNice, Legend




                ) {


            var clasa = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
                widgetsInTemplate: true,
                templateString: widgetTemplateString,
                _chart:null,
                postCreate: function () {

                    this.divGraf.id = "dgraf_" + parseInt(Math.random() * 10000).toString();


                    this.startGrafic();

                 
                  

                },
                constructor: function () {

                    declare.safeMixin(this, arguments);


                    this.serie = arguments[0].serie;
                    this.featureLayer = arguments[0].featureLayer;
                    this.field = arguments[0].field;

                },

                startGrafic:function()
                {
                  
                    
                    this._chart = new Chart(this.divGraf.id);
                    this._chart.setTheme(MiamiNice)
                     .addPlot("default", {
                         type: Pie,
                         font: "normal normal 11pt Tahoma",
                         fontColor: "black",
                         labelOffset: -30,
                         radius: 80
                     }).addSeries("Serie", this.serie);
                    var paramMoveSlice = new MoveSlice(this._chart, "default");
                    var paramHighlight = new Highlight(this._chart, "default");
                    var paramTooltip = new Tooltip(this._chart, "default");
                    this._chart.render();

                    this._chart.connectToPlot('default', lang.hitch(this, function (evt) {
                        console.log(evt.type);
                        if (evt.type == "onclick") {
                            
                            this.featureLayer.setDefinitionExpression(this.field + " = '" + this.serie[evt.index].categorie + "'")
                        }
                    }));
                    

                }


            });
            return clasa;
        }

);