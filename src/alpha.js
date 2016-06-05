Function.prototype.timeout = function(delay){
    setTimeout(this, delay);
}

NodeList.prototype.array=function(){
    return  [].slice.call(this);
};

Element.prototype.set_content=function( value ){
    this.innerHTML = value;
}

Element.prototype.set_html=function( value ){
    this.innerHTML = value;
}

Element.prototype.has_class = function( value ){
    try
    {
        return this.attributes.class.value.split(" ").some(
            function(class_name , index , class_name_list){
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

Element.prototype.get_childs_byclass = function( value ){
    var ret = [];
    this.children.array().forEach(
        function( element , index , array ){
            if( element.isClass( value ) ){
                ret.push( element );
            }
        }
    );
    return ret;
};

Element.prototype.css=function(attribute){
    return window.getComputedStyle(this)[attribute];
};

Element.prototype.sync_styles=function(attribute){
    return this.style[attribute] = window.getComputedStyle(this)[attribute];
};

Element.prototype.event=function(event_name, callback){
    this.addEventListener(event_name, callback);
    console.log('delegated ['+event_name+'] to ['+callback.toString()+']');
}

HTMLCollection.prototype.array = function(){
    return  [].slice.call(this);
}

Number.prototype.px=function(){ 
    return this.valueOf()+"px";
};

Number.prototype.em=function(){ 
    return this.valueOf()+"em";
};

Number.prototype.suffix=function(value){ 
    return this.valueOf()+value;
};

String.prototype.element=function(){
    var ret = document.querySelectorAll(this).array();
    if (ret.length > 1){
        return ret;
    }
    else{
        return ret[0];
    }
    
}

String.prototype.dom=function(){
    return this.element();
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

// onresize_hooks = [
//     function(){ console.log('onresize_hooks is executing :)') }
// ]

// window.onresize=function(){
//     alpha_onresize_hooks.forEach(
//         function( element , index , array ){
//             if( Object.prototype.toString.call(element) == "[object Function]" ){
//                 console.log('executing: '+element.toString());
//                 element();
//             }
//         }
//     )
// }
