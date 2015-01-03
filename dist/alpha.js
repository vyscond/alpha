
NodeList.prototype.array=function(){
    return  [].slice.call(this);
};

Element.prototype.content=function( value ){
    this.innerHTML = value;
}

Element.prototype.has_class = function( value ){

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

Element.prototype.get_childs = function(){
    return this.childNodes.array();
};

Element.prototype.get_childs_byclass = function( value )
{
    var result = [];

    this.children.array().forEach(
        
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

Element.prototype.sync_styles=function(attribute){
    return this.style[attribute] = window.getComputedStyle( this )[attribute];
};

HTMLCollection.prototype.array = function(){
    return  [].slice.call(this);
}

Number.prototype.px=function(){ 
    return this.valueOf()+"px";
};

String.prototype.element=function(){
    return document.querySelectorAll(this).array();
}

/*
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
*/

alpha_onresize_hooks = [
    function(){ console.log('onresize_hooks is executing :)') }
]

window.onresize=function(){
    alpha_onresize_hooks.forEach(
        function( element , index , array ){
            if( Object.prototype.toString.call(element) == "[object Function]" ){
                console.log('executing: '+element)
                element();
            }
        }
    )
}
