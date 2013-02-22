jquery.dom-address
==================

An informal jquery plugin that can print out a unique CSS selector of given node

Example:

   $("div").eq(0).domAddress();  // will return CSS selector
   
How it works:
   It traverse up the node tree and describe the given node by its tag, most unique class and its nth-of-type id
