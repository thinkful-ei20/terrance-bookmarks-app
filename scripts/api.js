'use strict'; 

/* global $ */

const api = (() => {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/terrance';

  const getItems = (callback) => {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  }

  const createItem = (item, onSuccess, onError) => {
    const newItem = JSON.stringify(item);
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: onSuccess,
      error: onError,
    });
  }

  const deleteItem = (id, onSuccess, onError) => {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`;
      method: 'DELETE',
      success: onSuccess,
      error: onError,
    });
  };

  return {
    getItems,
    createItem,
    deleteItem,
  };
  
}());