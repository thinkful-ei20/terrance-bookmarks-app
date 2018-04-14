'use strict'; 

/* global $, bookmarkItems, api, store,  */

const main = () => {
  bookmarkItems.bindEventListeners();
  bookmarkItems.render();
  api.getItems(bookmarkItems => {
    bookmarkItems.forEach(bookmark => store.addItem(bookmark));
    bookmarkItems.render();
  });
};

$(main);