var dojoConfig = {async: true,parseOnLoad: true};

//var resources = ['css/core.css','js/generic.js', '../arcgis_js_api/library/3.20/3.20/init.js'];

var resources = ['css/core.css','js/generic.js','https://js.arcgis.com/3.20/dijit/themes/claro/claro.css','https://js.arcgis.com/3.20/esri/css/esri.css', 'https://js.arcgis.com/3.20/'];

dojoConfig.packages = [{
        name: "js",
        location: location.pathname.replace(/\/[^/]+$/, "") + "/js"
}];

// Load the config file
resources[resources.length] = "js/config.js";

var loader = new esribelux.loader(resources);
loader.loadResources(function(){
	require(['js/core'], function(core) 
	{
		core.initialize();
	});
});

esribelux.catchAll = function(e)
{
	try
	{
		if( typeof e == 'undefined' || !e )
			esribelux.status.log('Unhandled error', esribelux.status.FINE);
		else if( typeof e.name != 'undefined' && e.message != 'undefined' )
			esribelux.status.log(e.name + ' : ' + e.message, esribelux.status.FINE);
		else if( e.message != 'undefined' )
			esribelux.status.log('' + e.message, esribelux.status.FINE);
		else
			esribelux.status.log('' + e, esribelux.status.FINE);
	}
	catch(ex)
	{
	}
}