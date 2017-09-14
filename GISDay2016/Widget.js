define([
    'dojo/_base/declare',
    'jimu/BaseWidget',
    'dojo/_base/lang',

    "dojo/dom",

           "dijit/form/DropDownButton",
            "dijit/DropDownMenu",
            "dijit/MenuItem",
            "dijit/RadioMenuItem",
            "dijit/MenuSeparator",


            //"esri/tasks/query",
            //"esri/symbols/SimpleMarkerSymbol",
            //"esri/symbols/PictureMarkerSymbol",
            //"esri/renderers/ClassBreaksRenderer",
            //"esri/dijit/PopupTemplate",


    './esriro/controale/grafic',
    './esriro/serie',
    './esriro/heatmap',
    './esriro/evolutie',
     './esriro/temporal',
    
    './esriro/histograma',

    "esri/layers/FeatureLayer"
],
function (
    declare,
    BaseWidget,
    lang,

    dom,

    DropDownButton,
    DropDownMenu,
    MenuItem,
    RadioMenuItem,
    MenuSeparator,

    //Query,
    //SimpleMarkerSymbol,
    //PictureMarkerSymbol,
    //ClassBreaksRenderer,
    //PopupTemplate,

    Grafic,
    Serie,
    Heatmap,
    Evolutie,
    Temporal,
   
    Histograma,
    

    FeatureLayer
    ) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-demo',
    _featureLayer: null,
    _defaultRenderer: null,
    _defaultRendererPoligoane: null,
      _heatmap:null,
      _temporal:null,
      _evolutie:null,
    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');
    },

    startup: function() {
      this.inherited(arguments);
        
      this.graf.id = "graf_" + parseInt(Math.random() * 10000).toString();
      this.timeSliderDiv.id = "tsld_" + parseInt(Math.random() * 10000).toString();
      this.toolsMenu.id = "tls_" + parseInt(Math.random() * 10000).toString();
      this.setMenu.id = "set_" + parseInt(Math.random() * 10000).toString();
      this.hostograma.id = "his_" + parseInt(Math.random() * 10000).toString();

   
      var id = this.params.id + "_panel";

      document.getElementById(id).style.height = '572px';


     



      
      var layerId = this.config.layerId;
    

      console.log('this.map.graphicsLayerIds', this.map.graphicsLayerIds)

      this._featureLayer = this.map.getLayer(layerId);
     
      this._defaultRenderer = this._featureLayer.renderer;
   
      var fieldName = this.config.field;


    
        
      var serieObject = Serie({ featureLayer: this._featureLayer, fieldName: fieldName });

      serieObject.get(lang.hitch(this, function (serie) {


          this.grafic = new Grafic({
              serie: serie,
              featureLayer: this._featureLayer,
              field: fieldName
          }, this.graf.id);




      }));
      //this.inapoiButon.onclick = lang.hitch(this, function () {
      //    this._featureLayer.setDefinitionExpression("1=1");
      //    this._featureLayer.setRenderer(this._defaultRenderer);
      //});

     this._heatmap = new Heatmap({ featureLayer: this._featureLayer });

      //this.heatmeapButon.onclick = lang.hitch(this, function () {
      //    this._heatmap.simbolizare();
      //});

     this._temporal = new Temporal({ featureLayer: this._featureLayer });


     this._histograma = new Histograma({ featureLayer: this._featureLayer, map:this.map, divId: this.hostograma.id });

      //this.temporalButon.onclick = lang.hitch(this, function () {
      //    this._temporal.simbolizare();
        //});

        
   
      this._evolutie = new Evolutie({ featureLayer: this._featureLayer, map: this.map, divId: this.timeSliderDiv.id, interval: this.interval });
      
      this._evolutie.start();


       

      this._createMenu();
    },
    _createMenu:function()
    {
        var tlsMenu = dom.byId(this.toolsMenu.id);
        var menu = new DropDownMenu({ style: "display: none;" });
        menu.id = "mnu_" + parseInt(Math.random() * 10000).toString();
        var separator = new MenuSeparator();

        var rFara = new RadioMenuItem({
            label: "Fara",
            group: menu.id,
            checked: true,
            id: "f_" + parseInt(Math.random() * 10000).toString(),
            onClick: lang.hitch(this, function () {
                this._featureLayer.setDefinitionExpression("1=1");
                this._featureLayer.setRenderer(this._defaultRenderer);
                
            })
        });
        menu.addChild(rFara);

        var rHeatmap = new RadioMenuItem({
            label: "Heatmap",
            group: menu.id,
            checked: false,
            id: "h_" + parseInt(Math.random() * 10000).toString(),
            onClick: lang.hitch(this, function () {
                this._heatmap.simbolizare();

            })
        });
        menu.addChild(rHeatmap);
        
        var rFerestre = new RadioMenuItem({
            label: "Ferestre de timp (3 luni)",
            group: menu.id,
            checked: false,
            id: "F_" + parseInt(Math.random() * 10000).toString(),
            onClick: lang.hitch(this, function () {
                this._temporal.simbolizare();

            })
        });
        menu.addChild(rFerestre);


        //var r2 = new RadioMenuItem({
        //    label: "Hotspot",
        //    group: menu.id,
        //    checked: false,
        //    id: "HS_" + parseInt(Math.random() * 10000).toString(),
        //    onClick: lang.hitch(this, function () {
                
        //        this._histograma.simbolizare();
        //    })
        //});
        //menu.addChild(r2);


        menu.startup();

        var button = new DropDownButton({
            label: "Instrumente",
            name: "analize",
            dropDown: menu,
            id: "cbt_" + parseInt(Math.random() * 10000).toString()
        })

        button.startup();

        tlsMenu.appendChild(button.domNode);


        var setMenu = dom.byId(this.setMenu.id);
        var menu0 = new DropDownMenu({ style: "display: none;" });
        menu0.id = "mnu_" + parseInt(Math.random() * 10000).toString();

        var rTimeSlider = new RadioMenuItem({
            label: "Time Slider",
            group: menu0.id,
            checked: true,
            id: "HS_" + parseInt(Math.random() * 10000).toString(),
            onClick: lang.hitch(this, function () {
                this._histograma.destroy();
                this._evolutie.start();
                
            })
        });
        menu0.addChild(rTimeSlider);

        var rHistoSlider = new RadioMenuItem({
            label: "Histogram Slider",
            group: menu0.id,
            checked: false,
            id: "HS_" + parseInt(Math.random() * 10000).toString(),
            onClick: lang.hitch(this, function () {
                this._evolutie.destroy();
                this._histograma.start();

            })
        });
        menu0.addChild(rHistoSlider);

        var button0 = new DropDownButton({
            label: "Timp",
            name: "analize",
            dropDown: menu0,
            id: "tmp_" + parseInt(Math.random() * 10000).toString()
        })

        button0.startup();

        setMenu.appendChild(button0.domNode);
    },
    onOpen: function(){
        console.log('onOpen');


    },

    onClose: function(){
        console.log('onClose');
      
    },

    onMinimize: function(){
      console.log('onMinimize');
    },

    onMaximize: function(){
      console.log('onMaximize');
    },

    onSignIn: function(credential){
      /* jshint unused:false*/
      console.log('onSignIn');
    },

    onSignOut: function(){
      console.log('onSignOut');
    }
  });
});