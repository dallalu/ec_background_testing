//GENERIC OTHER CORE FUNCTIONS
/*****************************************************
 * Description:
 *		Toggle the visibility of an element.
 *		If the element parameter is an entity, it is used directly.
 * 		If the element parameter is a string, the corresponding
 * 		entity is retrieved first.
 * 		The context parameter is optionnal and allows this function
 * 		to be called from other frames/windows.
 * Parameters:
 *		the element, the document context
 * Returns:
 *		nothing
 ****************************************************/
function toggle(element, context)
{
	if( context === undefined )
		context = document;
		
	if( typeof element == "string" )
		element = context.getElementById(element);
	
	if( !element )
		return;

	element.style.display = (element.style.display == "block" ? "none" : "block");
}

function show(element, context)
{
	if( context === undefined )
		context = document;
		
	if( typeof element == "string" )
		element = context.getElementById(element);
		
	if( !element )
		return;
	if(element.className.indexOf('dialog') > -1)
	{
		element.style.zIndex = esribelux.zindex;
		esribelux.zindex++;
	}
	element.style.display = "block";
}

function hide(element, context)
{
	if( context === undefined )
		context = document;
		
	if( typeof element == "string" )
		element = context.getElementById(element);
	
	if( !element )
		return;

	element.style.display = "none";
}

/*****************************************************
 * Description:
 *		General string operations
 * Parameters:
 *		-
 * Returns:
 *		-
 ****************************************************/
//if( typeof String.prototype.trim != 'function' ) // OVERRIDE THIS ANYWAYS
{
	String.prototype.trim = function(chars)
	{
		if( typeof chars != 'string' || chars.length == 0 )
			chars = "\\s";
		else
			chars = chars.split('').join('###').replace(/(\\|\(|\)|\-|\+|\*|\{|\}|\[|\]|\||\^|\$)/, "\\$1").replace('###', '|');

		return this.replace(new RegExp("^(" + chars + ")+"), '').replace(new RegExp("(" + chars + ")+$"), '');
	};
}

if( typeof String.prototype.title != 'function' )
{
	String.prototype.title = function()
	{
		return this.toLowerCase().replace(/(^|\s[a-z])/g, function($1){return $1.toUpperCase();});
	};
}

if( typeof String.prototype.startsWith != 'function' )
{
	String.prototype.startsWith = function (str)
	{
		return this.slice(0, str.length) == str;
	};
}

if( typeof String.prototype.endsWith != 'function' )
{
	String.prototype.endsWith = function (str)
	{
		return this.slice(-str.length) == str;
	};
}

if( typeof String.prototype.shorten != 'function' )
{
	String.prototype.shorten = function(length)
	{
		if( !length )
			length = 100;
		if( this.length > length )
			return this.slice(0, length-3)+'...';
		else
			return this;
	}
}

/*****************************************************
 * Description:
 *		Escape string for use in regex pattern
 * Parameters:
 *		-
 * Returns:
 *		-
 ****************************************************/
if( typeof RegExp.escape != 'function' )
{
	RegExp.escape= function(s)
	{
		return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
}

/*****************************************************
 * Description:
 *		IE8- does not have Date.toISOString()
 * Parameters:
 *		-
 * Returns:
 *		-
 ****************************************************/
if( typeof Date.prototype.toISOString != 'function' )
{
	Date.prototype.toISOString = function()
	{
		return this.getUTCFullYear()
			+ '-' + ('0' + (this.getUTCMonth() + 1)).slice(-2)
			+ '-' + ('0' + this.getUTCDate()).slice(-2)
			+ 'T' + ('0' + this.getUTCHours()).slice(-2)
			+ ':' + ('0' + this.getUTCMinutes()).slice(-2)
			+ ':' + ('0' + this.getUTCSeconds()).slice(-2)
			+ '.' + ('' + (this.getUTCMilliseconds()/1000).toFixed(3)).slice( 2, 5 )
			+ 'Z';
	};
}

if( typeof Date.prototype.toNormalString != 'function' )
{
	Date.prototype.toNormalString = function(precise)
	{
		return ('0' + this.getDate()).slice(-2)
			+ '/' + ('0' + (this.getMonth() + 1)).slice(-2)
			+ '/' + ('00' + this.getFullYear()).slice(-4)
			+ ' ' + ('0' + this.getHours()).slice(-2)
			+ ':' + ('0' + this.getMinutes()).slice(-2)
			+ (precise ? ':' + ('0' + this.getSeconds()).slice(-2)
			+ '.' + ('00' + this.getMilliseconds()).slice(-3) : '');
	};
}

/*****************************************************
 * Description:
 *		Appends, removes or checks for a class name on an element
 * Parameters:
 *		the element, the class name
 * Returns:
 *		-
 ****************************************************/
addClassName = function( element, className )
{
	if( typeof element == "string" )
		element = document.getElementById(element);
		
	if (!hasClassName(element, className))
		element.className += (element.className ? ' ' : '') + className;
}

hasClassName = function( element, className )
{
	if( typeof element == "string" )
		element = document.getElementById(element);
		
	return (
		element.className && element.className.length > 0 &&
		(element.className == className ||
		new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className))
		);
}

removeClassName = function( element, className )
{
	if( typeof element == "string" )
		element = document.getElementById(element);
		
	element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').trim();
}

toggleClassName = function( element, className1, className2 )
{
	if( typeof element == "string" )
		element = document.getElementById(element);
		
	if( hasClassName(element, className1) )
	{
		removeClassName(element, className1);
		addClassName(element, className2);
	}
	else
	{
		removeClassName(element, className2);
		addClassName(element, className1);
	}
}


/*****************************************************
 * Description:
 *		Checks if an element is contained in an array
 * Parameters:
 *		the array, the element
 * Returns:
 *		true if the element is contained in the array
 * 		false otherwise
 ****************************************************/
function in_array(_array, _value)
{
	for(var i = 0; i < _array.length; i++)
		if(_array[i] == _value)
			return true;
	return false;
}