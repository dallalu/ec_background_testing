define(
	['dojo/on'], 
	function(on) 
	{  
		var instance;
		if(instance) return instance;
		
		esribelux.basemapListWidget = function()
		{
			var self = this;
			
			var dropDownList = null;
			var currentBasemapName = null;
			var label = null;
			
			/**
			* Initialize the widget
			*/
			this.initialize = function()
			{
				console.log("Basemap List Initialize");
				
				this.createWidget();
				this.createBasemapList();
				this.setLabel();
			}
			
			/**
			* Create the widget
			*/
			this.createWidget = function()
			{
				var mapDiv = document.getElementById(esribelux.properties.mapId);;
				
				var basemapListDiv = document.createElement("div");
				basemapListDiv.id = "basemapList";
				
				this.label = document.createElement("label");
				this.label.id = "basemapListLabel";
				this.label.htmlFor = "basemapListDropDownList";
				
				this.dropDownList = document.createElement("select");
				this.dropDownList.id = "basemapListDropDownList";
				
				basemapListDiv.appendChild(this.label);
				basemapListDiv.appendChild(this.dropDownList);
				mapDiv.appendChild(basemapListDiv);
			}
			
			/**
			* Set label for elements
			*/
			this.setLabel = function()
			{
				this.label.innerHTML = esribelux.properties.basemapList.text;
			}

			/**
			* Set action for events we want to handle
			*/
			this.addEvents = function()
			{
				on(this.dropDownList, "change", function(evt)  
				{
					var value = this[this.selectedIndex].id;
					
					self.hideBasemap(self.currentBasemapName);
					
					self.checkVisibilityAtCurrentLevelForLayer(value);
					
					self.showBasemap(value);
					
					self.currentBasemapName = value;
					esribelux.basemapCurrentName = value;
				});
			}
			
			/**
			* Create the basemap list
			*/
			this.createBasemapList = function()
			{		
				for(var b=0; b<esribelux.properties.layers.basemap.length; b++)
				{
					this.addOptionToDropDownList(esribelux.properties.layers.basemap[b].name, esribelux.properties.layers.basemap[b].name);
				}
				
				this.dropDownList.value = esribelux.properties.initialBasemapName;
				this.currentBasemapName = esribelux.properties.initialBasemapName;
				
				this.addEvents();
			}
			
			/**
			* Add a new option in the drop down list given in argument
			*/
			this.addOptionToDropDownList = function(value, id)
			{
				var option = document.createElement("option");
				option.text = value;
				option.id = id;
				option.value = value;
				this.dropDownList.add(option);
			}
			
			/**
			* Hide the basemap layer with the name given in argument
			*/
			this.hideBasemap = function(layerName)
			{
				esribelux.map.getLayer(layerName).hide();
			}
			
			/**
			* Show the basemap layer with the name given in argument
			*/
			this.showBasemap = function(layerName)
			{
				esribelux.map.getLayer(layerName).show();
			}
			
			/**
			* Check if there is data visible at this level for the current layer. 
			* Otherwise, it displays the no data message.
			*/
			this.checkVisibilityAtCurrentLevelForLayer = function(basemapName)
			{
				var currentBasemap = "";
				for(var i = 0; i < esribelux.properties.layers.basemap.length; i++)
				{
					var basemap = esribelux.properties.layers.basemap[i];
					if(basemap.name == basemapName)
					{
						currentBasemap = basemap;
						break;
					}
				}
						
				var minZoomLevel = currentBasemap.minZoomLevel;
				var maxZoomLevel = currentBasemap.maxZoomLevel;
				var currentLevel = esribelux.map.getLevel();
						
				if(minZoomLevel != "undefined" && maxZoomLevel)
				{
					if(currentLevel > maxZoomLevel || currentLevel < minZoomLevel)
						document.getElementById("nodatamsg").style.display = "block";
					else
					document.getElementById("nodatamsg").style.display = "none";
				}	
			}
		}
		
		console.log("Basemap List Create");
		instance = new esribelux.basemapListWidget();
		return instance; 
	}
);