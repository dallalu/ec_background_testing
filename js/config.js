esribelux.properties.mapId = 'map';
esribelux.properties.initialExtent = [-1200000,4220000,5470000,11580000,{wkid:3857}];

/*esribelux.properties.proxy = "http://d02tn1401562w7.net1.cec.eu.int/ProxyTest/proxy.ashx";
esribelux.properties.alwaysUseProxy = false;
esribelux.properties.proxyRule = 
[
	// Everything begin with the urlprefix passed by the proxy given in the proxyUrl
	{ urlPrefix: "https://webgate.development.ec.europa.eu/getis/arcgis/rest/services/TENTEA", proxyUrl: esribelux.properties.proxy },
	{ urlPrefix: "https://webgate.acceptance.ec.europa.eu/getis/arcgis/rest/services/TENTEA", proxyUrl: esribelux.properties.proxy },
	{ urlPrefix: "https://webgate.ec.europa.eu/getis/arcgis/rest/services/TENTEA", proxyUrl: esribelux.properties.proxy }
];*/

// Initial basemap
esribelux.properties.initialBasemapName = "OSM All";

esribelux.properties.layers = { 
	'basemap':
	[
		{'name':'Toner', 'service':'http://europa.eu/webtools/maps/tiles/temp/toner/','opacity':1, 'type':'wmts', 'maxScale':144448, 'minZoomLevel':0, 'maxZoomLevel':12},
		{'name':'Toner Lite', 'service':'http://europa.eu/webtools/maps/tiles/temp/toner-lite/','opacity':1, 'type':'wmts', 'minZoomLevel':0, 'maxZoomLevel':18},
		{'name':'Terrain', 'service':'http://europa.eu/webtools/maps/tiles/temp/terrain/','opacity':1, 'type':'wmts', 'minZoomLevel':0, 'maxZoomLevel':18},
		{'name':'Water Color', 'service':'http://europa.eu/webtools/maps/tiles/temp/watercolor/','opacity':1, 'type':'wmts', 'format':'jpg', 'minZoomLevel':0, 'maxZoomLevel':18}, // format by default png if jpg define  'format':'jpg'
		{'name':'OSM Admin', 'service':'http://europa.eu/webtools/maps/tiles/temp/osm_admin/','opacity':1, 'type':'wmts', 'minZoomLevel':0, 'maxZoomLevel':18},
		{'name':'OSM Land', 'service':'http://europa.eu/webtools/maps/tiles/temp/osm_land/','opacity':1, 'type':'wmts', 'minZoomLevel':0, 'maxZoomLevel':18},
		{'name':'OSM Water', 'service':'http://europa.eu/webtools/maps/tiles/temp/osm_water/','opacity':1, 'type':'wmts', 'minScale':2311162, 'minZoomLevel':8, 'maxZoomLevel':18},
		{'name':'OSM Roads', 'service':'http://europa.eu/webtools/maps/tiles/temp/osm_roads/','opacity':1, 'type':'wmts', 'minScale':1.8489297737236E7, 'minZoomLevel':5,'maxZoomLevel':18},
		
		
		{'name':'OSM All', 'service':'http://europa.eu/webtools/maps/tiles/osm-ec/', 'opacity':1, 'type':'wmts'},
		/*{'name':'Streets', 'service':'http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer', 'opacity':1, 'type':'tiled'},
		{'name':'Canvas', 'service':'http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer', 'opacity':1, 'type':'tiled'},
		{'name':'Satellite', 'service':'http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer', 'opacity':1, 'type':'tiled'},
		{'name':'Topographic', 'service':'http://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer', 'opacity':1, 'type':'tiled'},
		{'name':'Streets Vector tile', 'service':'http://www.arcgis.com/sharing/rest/content/items/a60a37a27cc140ddad15f919cd5a69f2/resources/styles/root.json', 'opacity':1, 'type':'vectorTile'},
		{'name':'Topo Vector tile', 'service':'http://www.arcgis.com/sharing/rest/content/items/86d5ed4b6dc741de9dad5f0fbe09ae95/resources/styles/root.json', 'opacity':1, 'type':'vectorTile'},
		{'name':'Grey Canvas Vector tile', 'service':'http://www.arcgis.com/sharing/rest/content/items/5dd75c1a544b46c3af01ba5736bfdfa0/resources/styles/root.json', 'opacity':1, 'type':'vectorTile'}*/
	], 
	'operational':
	[
		/*// Corridors
		{'name':'Corridors', 'service':'https://webgate.ec.europa.eu/getis/arcgis/rest/services/TENTec/tentec_public_corridors_new/MapServer',
			'visible':true, 'opacity':1, 'type':'dynamic', 'mode':1, 'outFields':['*'], 'displayInfos':false, 'edit':false, 'visibleLayers': -1},
		//GAS
		{'name':'Gas PCIs', 'service':'https://webgate.development.ec.europa.eu/getis/arcgis/rest/services/Energy/PCI_gas/MapServer',
		'visible':true, 'opacity':1, 'type':'dynamic', 'mode':1, 'outFields':['*'], 'displayInfos':false, 'edit':false, 'visibleLayers': -1}*/
	]
};

// Basemaps List
esribelux.properties.basemapList = new Array();
esribelux.properties.basemapList.enableWidget = true;
esribelux.properties.basemapList.text = "Basemap: ";

// Scale
esribelux.properties.scale = new Array();
esribelux.properties.scale.enableWidget = true;
esribelux.properties.scale.text = "Scale : 1/"; // the scale value will be add after this text