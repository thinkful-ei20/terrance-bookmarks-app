'use strict'; 

/* global $, bookmarkItems, api, store,  */

$(document).ready(function() {
  bookmarkItems.bindEventListeners();
  bookmarkItems.render();
  api.getItems(bookmarkItems => {
    bookmarkItems.forEach(bookmark => store.addItem(bookmark));
    bookmarkItems.render;
  });
});
