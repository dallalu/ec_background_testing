define(
	["dojo/on", "esri/map","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISTiledMapServiceLayer","esri/layers/OpenStreetMapLayer","esri/layers/FeatureLayer", "esri/request", "js/customWMTS", "dojo/i18n!esri/nls/jsapi", "esri/layers/VectorTileLayer"], 
	function(on, Map, ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer, OpenStreetMapLayer, FeatureLayer, esriRequest, customWMTS, jsapiBundle, VectorTileLayer)
	{  
		var instance;
		if(instance)return instance;
		
		esribelux.core = function()
		{
			var self = this;
			this.initialize = function()
			{
				esribelux.map = new esri.Map(esribelux.properties.mapId, {logo: false});
				this.initLayers();		
			}
			
			// ========================================================
			// Layers initialization
			// ========================================================
			this.layers = null;
			this.__layerLoadCounter = 0;
			this.initLayers = function()
			{
				try
				{
					console.log("Core Initialize Layers");
					var layers = [];
					if( esribelux.properties.layers )
					{
						// ================
						// BASEMAPS
						// ================
						if( esribelux.properties.layers.basemap )
						{
							//esribelux.basemapCurrentName = esribelux.properties.initialBasemapName;
							for( var i = 0; i < esribelux.properties.layers.basemap.length; i++)
							{
								var l = esribelux.properties.layers.basemap[i];
								
								var props = {};
								for( var key in l )
								{
									if( key === undefined || key == 'type' )
										continue;
									if( key == 'name' )
										props['id'] = l[key];
									props[key] = l[key];
								}
								
								props['visible'] = (props['id'] == esribelux.properties.initialBasemapName) ? true : false;
								
								var url = l.service;
								
								if( l.type == "vectorTile" )
									layers.push(new VectorTileLayer(url, props));
								else if( l.type == 'tiled' )
									layers.push(new ArcGISTiledMapServiceLayer(url, props));
								else if( l.type == 'osm' )
									layers.push(new OpenStreetMapLayer(props));
								else if( l.type == 'wmts' )
								{
									var layer = new customWMTS(url, props['id'], new esri.SpatialReference(esribelux.properties.initialExtent[4]), props['format']);
									layer.visible = (props['visible']) ? true : false;
									layers.push(layer);
								}
								else
									layers.push(new ArcGISDynamicMapServiceLayer(url, props));
							}
						}
						
						// ================
						// OPERATIONAL
						// ================
						if( esribelux.properties.layers.operational )
						{
							for( var i = 0; i < esribelux.properties.layers.operational.length; i++)
							{
								var l = esribelux.properties.layers.operational[i];
								
								var props = {};
								for( var key in l )
								{
									if( key === undefined || key == 'type' )
										continue;
									if( key == 'name' )
										props['id'] = l[key];
									props[key] = l[key];
								}
								
								var url = l.service;
									
								if( l.type == 'tiled' )
									layers.push(new ArcGISTiledMapServiceLayer(url, props));
								else if(l.type == 'Feature Layer')
								{
									var featureLayer = new FeatureLayer(url, props);
									layers.push(featureLayer);
								}
								else
								{
									var dynamicLayer = new ArcGISDynamicMapServiceLayer(url, props);
									
									if(l.visibleLayers)
										dynamicLayer.setVisibleLayers([l.visibleLayers]);
									
									layers.push(dynamicLayer);
								}
							}
						}
					}
					
					for( var i = 0; i < layers.length; i++ )
					{
						// check layer error
						on(layers[i], 'error', function(e)
						{
							if( e.error.message == "xhr cancelled" )
								return;
							if( self.__loaded )
								return;

							console.log("LAYER LOAD ERROR"); 
							console.log("Layer ID : " + this.id + " -- Error : " + e.error.message);
								
							if( window.parent && window.parent.show )
								window.parent.error(null);
								
							esribelux.catchAll(e);
						});
							
						// check layer load
						on(layers[i], 'load', function(layer)
						{
							if( self.__loaded )
								return;

							if(layer instanceof ArcGISDynamicMapServiceLayer)
							{
								layer.setDisableClientCaching(true);
								layer.refresh();
							}
							self.__layerLoadCounter++;
							if( self.__layerLoadCounter == layers.length )
								self.afterMapLoad();
						});
							
						if(layers[i].loaded)
						{
							if( this.__loaded )
								return;

							if(layers[i] instanceof ArcGISDynamicMapServiceLayer)
							{
								layers[i].setDisableClientCaching(true);
								layers[i].refresh();
							}
							this.__layerLoadCounter++;
							if( this.__layerLoadCounter == layers.length )
								this.afterMapLoad();
						}
							
						// add layer to the map
						esribelux.map.addLayer(layers[i]);	
					}
					
					console.log("Core Initialize Layers Success");
				}
				catch(e) {esribelux.catchAll(e);}
			}
			
			// ========================================================
			// All layers loaded
			// ========================================================
			this.afterMapLoad = function()
			{
				try
				{
					this.__loaded = true;
					console.log("Core Map Load");
					
					// Set extent
					if( esribelux.properties.initialExtent && esribelux.properties.initialExtent.length == 5 )
					{
						var e = esribelux.properties.initialExtent;
						var extent = new esri.geometry.Extent(e[0], e[1], e[2], e[3], new esri.SpatialReference(e[4]));
						esribelux.map.setExtent(extent);
					}
					
					require(['js/basemapList','js/scale'],  
					function(basemapList, scale)
					{
						basemapList.initialize();
						scale.initialize();
					});
					
					/*require(['js/projectTitle', 'js/widget/scale','js/widget/scalebar', 'js/widget/menu', 'js/widget/tocLegend', 'js/widget/tocTool', 'js/widget/legendTool', 'js/dialog', 
							 'js/widget/copyright', 'js/widget/searchProjectCodes', 'js/widget/basemapList','js/widget/loadProjectData', 'js/widget/zoomToProject', 'js/widget/measureTool', 'js/widget/latLongTool',
							 'js/widget/geocoderTool','js/widget/infoWindows', 'js/widget/attributeTable', 'js/widget/proposals', 'js/widget/projects'], 
					function(projectTitle, scale, scalebar, menu, tocLegend, tocTool, legendTool, dialog, copyright, searchProjectCodes, basemapList, loadProjectData, zoomToProject, measureTool, latLongTool, geocoderTool, infoWindows, attributesTableTool, proposalsTool, projectsTool) 
					{
						if(esribelux.properties.projectData.enableWidget) loadProjectData.initialize();
						if(esribelux.properties.scale.enableWidget) scale.initialize();
						if(esribelux.properties.scalebar.enableWidget) scalebar.initialize();						
						if(esribelux.properties.basemapList.enableWidget) basemapList.initialize();
						if(esribelux.properties.copyright.enableWidget) copyright.initialize();
						
						if(esribelux.properties.menu.enableWidget)
						{
							menu.initialize();
							 
							if(esribelux.properties.measure.enableWidget) measureTool.initialize();
							if(esribelux.properties.searchProjectCodes.enableWidget) searchProjectCodes.initialize();
							if(esribelux.properties.zoomToProject.enableWidget) zoomToProject.initialize();
							if(esribelux.properties.latLong.enableWidget) latLongTool.initialize();			
							if(esribelux.properties.geocoder.enableWidget) geocoderTool.initialize();
							if(esribelux.properties.attributesTable.enableWidget) attributesTableTool.initialize();
							
							if(esribelux.properties.projects.enableWidget) projectsTool.initialize();
							if(esribelux.properties.proposals.enableWidget) proposalsTool.initialize();
							
							if(esribelux.properties.tocLegend.enableWidget) 
							{
								tocLegend.initialize();
								tocTool.initialize();
								legendTool.initialize();
							}
						}
						
						infoWindows.initialize();
						
						esribelux.map.resize();
						esribelux.map.reposition();

						if( window.parent && window.parent.show )
							window.parent.show();
							
						dialog.initialize();
						if(esribelux.properties.title.enableWidget) projectTitle.initialize();
					});*/
				}
				catch(e) { esribelux.catchAll(e); }
			}
		}
		
		console.log("Core Create");
		instance = new esribelux.core();
		return instance; 
	}
);

