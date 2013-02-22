/**
 * @author: Zhongjie Wu
 */
(function($){
  $.fn.domAddress = function(opt) {
    var self = this
      , el = self[0];

    opt = opt || {};

    if (el === null) {
      return null;
    }
    return getAddress(el);;
  };

  function getAddress(dom) {
    if(dom === null) {
      return null;
    }
    var currentElement = dom
      , html = document.body.parentElement
      , childSelectors = []
      , i;
    
    while($(childSelectors.join(" ")).size() !== 1 && currentElement !== html) {
      var id = currentElement.id
        , className
        , tagName = currentElement.tagName.toLowerCase()
        , localSelector = ""
        , classSelectorSize
        , mostUniqueClassSize = null
        , mostUniqueClassName = null;

      // try id
      localSelector += (id && "#" + id) || "";
      if($(localSelector + " " + childSelectors.join(" ")).size() == 1) {
        childSelectors.unshift(localSelector);
        break;
      }

      // try tag+class
      for(i = 0; i < currentElement.classList.length; i++) {
        className = currentElement.classList[i];
        classSelectorSize = $(">"+tagName + "." + className + localSelector
          , currentElement.parentElement).size();
        if(mostUniqueClassSize == null || mostUniqueClassSize > classSelectorSize) {
          mostUniqueClassSize = classSelectorSize;
          mostUniqueClassName = className;
        }
      }
      mostUniqueClassName = mostUniqueClassName?("." + mostUniqueClassName):"";
      localSelector = tagName + mostUniqueClassName + localSelector;

      // add nth-child
      var nthOfType
        , siblings = $(">"+tagName,currentElement.parentElement);
      for(i = 0; i < siblings.length; i++) {
        if(siblings[i] === currentElement) {
          nthOfType = i + 1;
          break;
        }
      }
      if(nthOfType != 1) {
        localSelector += ":nth-of-type("+nthOfType+")";
      }

      childSelectors.unshift(localSelector);

      currentElement = currentElement.parentElement;
    }
    return childSelectors.join(" ");
  }
}(jQuery));
