///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'jimu/BaseWidgetSetting',
  "dojo/_base/lang"
],
function (
    declare,
    BaseWidgetSetting,
    lang) {

    return declare([BaseWidgetSetting], {
        baseClass: 'jimu-widget-demo-setting',
        _layers: {},
        _layersIds: {},
        _fields:{},

    postCreate: function(){
  
      this.setConfig(this.config);
    },

    setConfig: function (config) {

        this._selectLayers = this._listaLayere();
        this.divFeatureLayer.appendChild(this._selectLayers);
        this._selectLayers.value = config.layer;

        
        this._selectFields = document.createElement('SELECT');
        this._selectFields.style.width = "100%";


        this._onChangePeListaDeLayere(null, this._selectLayers);
        this._selectFields.value = config.field;

        this.divFields.appendChild(this._selectFields);
        this._selectFields.onchange = lang.hitch(this, function () {
            this._listFieldsOnChange();
        })

    
    },

    getConfig: function(){
    
      return {
          configText: this.textNode.value
           ,
          layerId: this._layerId,
          layer: this._layer.name,
          field: this._field.name

      };
    }
      ,
    _listaLayere: function () {
        var select = document.createElement('SELECT');
        select.style.width = "100%";

        select.onchange = lang.hitch(this, function (ev) {
            this._onChangePeListaDeLayere(ev, select)
        });

        var option = document.createElement('OPTION');
        option.text = "";
        option.value = "";
        select.options.add(option);


        dojo.forEach(this.map.graphicsLayerIds, lang.hitch(this, function (layerId) {
            var layer = this.map.getLayer(layerId);
            if (typeof layer.type !== 'undefined' && layer.type === "Feature Layer") {
                var option = document.createElement('OPTION');
                option.text = layer.name;
                option.value = layer.name;
                this._layers[layer.name] = layer;
                this._layersIds[layer.name] = layerId;
                select.options.add(option);

            }
        }));

        return select;
    },
    _clearList: function (select) {
        while (select.options.length > 0) {
            select.remove(0);
        }
    },
    _onChangePeListaDeLayere: function (ev, select) {
        if (this._selectFields)
        {
            this._clearList(this._selectFields);
            if (select.value !== "") {
                var layer = this._layers[select.value];
                this._layer = layer;
                this._layerId = this._layersIds[select.value];
                var option = document.createElement('OPTION');
                option.value = "";
                option.text = "";
                this._selectFields.options.add(option);

                dojo.forEach(layer.fields, lang.hitch(this, function (field) {
                    var option = document.createElement('OPTION');
                    option.value = field.name;
                    option.text = field.name;
                    this._selectFields.options.add(option);
                    this._fields[field.name] = field;
                }));
            }
        }

    },
    _listFieldsOnChange: function () {
        this._field = this._fields[this._selectFields.value];
    }
  });
});