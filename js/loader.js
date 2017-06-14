esribelux.loader = function(resources)
{
	var self = this;
	this.loaded = [];
	this.resources = resources;
	this.onLoad = null;
	
	this.__onLoad = function(url)
	{
		//to avoid trigger onload more then one time
		if(this.__checkHaveLoaded(url)){
			return;
		}
		
		this.loaded.push(url);
		console.log("Load complete "+url);
		
		if(this.loaded.length === this.resources.length)
		{
			console.log("Load Resources success");
			if(this.onLoad)
			  this.onLoad();
		}
    }

	this.loadResources = function(onLoad)
	{
		console.log("Load Resources");
		this.onLoad = onLoad;
		this.loaded = [];
		for(var i = 0; i < this.resources.length; i ++)
		{
			this.loadResource(this.resources[i]);
		}
	}
	
	this.loadResource = function(url)
	{
		var type = this.__getExtension(url);
		if(type.toLowerCase() === 'css'){
		  this.loadCss(url);
		}else{
		  this.loadJs(url);
		}
	}
	
	this.loadCss = function(url)
	{
		var result = this.__createElement({
				element: 'link',
				rel: 'stylesheet',
				type: 'text/css',
				href: url,
				onload: function(){
				  self.__onLoad(url);
				},
				appendTo: 'head'
			});

		//for the browser which doesn't fire load event
		//safari update documents.stylesheets when style is loaded.
		var ti = setInterval(function() {
			var styles = document.styleSheets;
			for(var i = 0; i < styles.length; i ++){
			  if(styles[i].href && styles[i].href.substr(styles[i].href.indexOf(url), styles[i].href.length) === url)
			  {
				clearInterval(ti);
				self.__onLoad(url);
			  }
			}
		}, 500);

		return result;
	}

    this.loadJs = function(url) {
		var result = this.__createElement({
			element: 'script',
			type: 'text/javascript',
			onload: function(){
			  self.__onLoad(url);
			},
			onreadystatechange: function(){
			  self.__elementReadyStateChanged(url, this);
			},
			src: url,
			appendTo: 'body'
		});
		return (result);
    }
	
    this.__elementReadyStateChanged = function(url, thisObj)
	{
		if (thisObj.readyState === 'loaded' || thisObj.readyState === 'complete') 
		{
			self.__onLoad(url);
		}
    }
	
	this.__checkHaveLoaded = function(url)
	{
		for(var i = 0; i < this.loaded.length; i ++)
		{
			if(this.loaded[i] === url){
			  return true;
			}
		}
		return false;
    }
	
	this.__createElement = function(config) 
	{
		var e = document.createElement(config.element);
		for (var i in config) 
		{
			if (i !== 'element' && i !== 'appendTo') {
			  e[i] = config[i];
			}
		}
		var root = document.getElementsByTagName(config.appendTo)[0];
		return (typeof root.appendChild(e) === 'object');
    }
	
	this.__getExtension = function(url)
	{
		url = url || "";
		var items = url.split("?")[0].split(".");
		return items[items.length-1].toLowerCase();
	}
}