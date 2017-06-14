define(
	['js/core'], 
	function(Core) 
	{  
		var instance;
		if(instance) return instance;
		
		esribelux.scale = function()
		{
			var self = this;
			
			var scaleDiv = null;
			
			/**
			* Initialize the widget
			*/
			this.initialize = function()
			{
				console.log("Scale Initialize");
				
				this.createWidget();
				this.addEvents();
				this.refreshScaleValue();
			}
			
			/**
			* Create the widget
			*/
			this.createWidget = function()
			{
				var mapDiv = document.getElementById(esribelux.properties.mapId);;
				
				this.scaleDiv = document.createElement("div");
				this.scaleDiv.id = "scale";
				
				mapDiv.appendChild(this.scaleDiv);
			}
			
			/**
			* Set action for events we want to handle
			*/
			this.addEvents = function()
			{
				esribelux.map.on("extent-change",function(event)
				{
					self.refreshScaleValue();
				});
			}
			
			/**
			* Refresh the display scale value
			*/
			this.refreshScaleValue = function()
			{
				this.scaleDiv.innerHTML = esribelux.properties.scale.text + Math.round(esribelux.map.getScale());
			}
		}
		
		console.log("Scale Create");
		instance = new esribelux.scale();
		return instance; 
	}
);