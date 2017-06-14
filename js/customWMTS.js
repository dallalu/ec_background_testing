define(
	["dojo/_base/declare", "esri/layers/TiledMapServiceLayer", "esri/geometry/Extent", "esri/layers/TileInfo"], 
	function(declare, TiledMapServiceLayer, Extent, TileInfo)
	{
		return declare(TiledMapServiceLayer, 
		{
			// The "constructor" method is special: the parent class (TiledMapServiceLayer)
			// constructor is called automatically before this one.
			constructor: function(url, id, spatialReference, format)
			{
				this.spatialReference = spatialReference;
				this.initialExtent = new Extent(-20037507.067162, -12932243.111992, 20037507.067162 , 12932243.111992, this.spatialReference);
				this.fullExtent = new Extent(-20037507.067162, -12932243.111992, 20037507.067162 , 12932243.111992, this.spatialReference);
				this.id = id;
				this.url = url;
				this.format = format;
				
				this.tileInfo = new TileInfo(
				{
					"spatialReference": this.spatialReference,
					"rows" : 256,
					"cols" : 256,
					"dpi" : 96,
					"format" : (format && format == "jpg") ? "image/jpg" : "image/png",
					"compressionQuality" : 90.0,
					"origin" : {
						"x" : -2.0037508342787E7,
						"y" : 2.0037508342787E7
					},

					// Scales in DPI 96
					// Put the same scale and resolution than esri map for having no problem
					"lods": 
					[
					{
						"level": 0,
						"scale": 5.91657527591555E8,
						"resolution": 156543.03392800014
					}, 
					{
						"level": 1,
						"scale": 2.95828763795777E8,
						"resolution": 78271.51696399994
					},
					{
						"level": 2,
						"scale": 1.47914381897889E8,
						"resolution": 39135.75848200009
					}, 
					{
						"level": 3,
						"scale": 7.3957190948944E7,
						"resolution": 19567.87924099992
					},
					{
						"level": 4,
						"scale": 3.6978595474472E7,
						"resolution": 9783.93962049996
					}, 
					{
						"level": 5,
						"scale": 1.8489297737236E7,
						"resolution": 4891.96981024998
					}, 
					{
						"level": 6,
						"scale": 9244648.868618,
						"resolution": 2445.98490512499
					}, 
					{
						"level": 7,
						"scale": 4622324.434309,
						"resolution": 1222.992452562495
					}, 
					{
						"level": 8,
						"scale": 2311162.217155,
						"resolution": 611.4962262813797
					}, 
					{
						"level": 9,
						"scale": 1155581.108577,
						"resolution": 305.74811314055756
					}, 
					{
						"level": 10,
						"scale": 577790.554289,
						"resolution": 152.87405657041106
					}, 
					{
						"level": 11,
						"scale": 288895.277144,
						"resolution": 76.4370282850732
					}, 
					{
						"level": 12,
						"scale": 144447.638572,
						"resolution": 38.21851414253662
					}, 
					{
						"level": 13,
						"scale": 72223.819286,
						"resolution": 19.10925707126831
					}, 
					{
						"level": 14,
						"scale": 36111.909643,
						"resolution": 9.554628535634155
					}, 
					{
						"level": 15,
						"scale": 18055.954822,
						"resolution": 4.77731426794937
					}, 
					{
						"level": 16,
						"scale": 9027.977411,
						"resolution": 2.388657133974685
					}, 
					{
						"level": 17,
						"scale": 4513.988705,
						"resolution": 1.1943285668550503
					}, 
					{
						"level": 18,
						"scale": 2256.994353,
						"resolution": 0.5971642835598172
					}
					]
				});
				
				this.loaded = true;
				this.onLoad(this);
			},

			// http://europa.eu/webtools/maps/tiles/osm-ec/{TileMatrix}/{TileCol}/{TileRow}.png
			getTileUrl: function(level, row, col) 
			{
				return (this.format && this.format == "jpg") ? this.url + level + "/" + col + "/" + row + ".jpg" : this.url + level + "/" + col + "/" + row + ".png";
			}
		});
	}
);