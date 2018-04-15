'use strict'; 

/* global $, bookmarkItems, api, store,  */

$(document).ready(function() {
  bookmarkItems.bindEventListeners();
  bookmarkItems.render();
  
  api.getItems((items) => {
    items.forEach((item) => store.addItem(item));
    bookmarkItems.render();
  });
});
