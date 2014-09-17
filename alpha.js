NodeList.prototype.toArray=function(){
    return  [].slice.call(this);
};

Element.prototype.content=function( value ){
    this.innerHTML = value;
}

Element.prototype.increaseWidth=function( value ){
    this.style.width = ( parseInt( this.style.width ) + value ).asPixel();
};

Element.prototype.decreaseWidth=function( value ){ 
    this.style.width = (parseInt( this.style.width ) - value).asPixel();
};

Element.prototype.increaseHeight=function( value ){
    this.style.height = ( parseInt(this.style.height) + value ).asPixel();
};

Element.prototype.decreaseHeight=function( value ){
    this.style.height = ( parseInt(this.style.height) - value ).asPixel();
};

Element.prototype.isClass = function( value ){

    try
    {
        return this.attributes.class.value.split(" ").some(
            
            function( class_name , index , class_name_list )
            {
                return class_name == value;
            }
            
        );
    }
    catch( err )
    {
        console.log("[element has not a single class defined]");
        return false;
    }
    
};

Element.prototype.getChilds = function(){
    return this.childNodes.toArray();
};

Element.prototype.getChildsByClass = function( value )
{
    var result = [];

    this.children.toArray().forEach(
        
        function( element , index , array )
        {
            if( element.isClass( value ) )
            {
                result.push( element );
            }
        }
        
    );

    return result;
};

Element.prototype.css=function(attribute){
    return window.getComputedStyle( this )[attribute];
};

Element.prototype.syncStyle=function(attribute){
    return this.style[attribute] = window.getComputedStyle( this )[attribute];
};

HTMLCollection.prototype.toArray = function(){
    return  [].slice.call(this);
}

Number.prototype.asPixel=function(){ 
    return this.valueOf()+"px";
};


String.prototype.toElement=function()
{
    if( this.charAt(0) === "#")
    {
        return document.getElementById( this.substring(1));
    }
    else if( this.charAt(0) === "<" )
    {
        return document.getElementByTagName(this.substring(1));
    }
    else
    {
        return document.getElementsByClassName( this );
    }
};
