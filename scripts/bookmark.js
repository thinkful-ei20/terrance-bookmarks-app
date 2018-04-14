'use strict'; 

/* global $, store, api */

const bookmarkItems = (() => {
  const genErr = (errorMessage) => {
    return `<button type="button" class="error-button">${errorMessage}</button>`;
  };

  const genItemElement = (item) => {
    let itemRating = null;
    if (item.rating === 5) {
      itemRating = '&bigstar;&bigstar;&bigstar;&bigstar;&bigstar;';
    } else if (item.rating === 4) {
      itemRating = '&bigstar;&bigstar;&bigstar;&bigstar;';      
    } else if (item.rating === 3) {
      itemRating = '&bigstar;&bigstar;&bigstar;';      
    } else if (item.rating === 2) {
      itemRating = '&bigstar;&bigstar;';      
    } else if (item.rating === 1) {
      itemRating = '&bigstar;';      
    }

    return `
    <li class="item-element js-item-element" data-item-id="${item.id}">
      <details>
        <summary>${item.title} ${itemRating}</summary>
        <p>${(item.desc ? item.desc : 'No Description')}</p>
        <a href="${item.url}" target="_blank">Visit Site</a>
        <button class="delete-item-btn js-delete-item-btn">Remove Bookmark</button>
      </details>
    </li>
    `;
  };

  const genItemsStr = (items) => {
    let bmItems = items.map((item) => {
      return genItemElement(item);
    });

    return bmItems.join('');
  };

  const handleAddItemClicked = () => {
    $('.js-add-bm-btn').click(() => {
      store.hideBMControls = false;
      $('#js_bm_title').val('');
      $('#js_bm_link').val('');
      $('#js_bm_description').val('');
      render();
    });
  };

  const handleSubmitItem = () => {
    $('.js-add-bm-form').submit((event) => {
      event.preventDefault();

      const newItemTitle = $('#js_bm_title').val();
      const newItemUrl = $('#js_bm_link').val();
      const newItemRating = +$('.add-bm-form input[type="radio"]:checked').val();
      const newItemDescription = $('#js_bm_description').val();
      api.createItem({title: newItemTitle, url: newItemUrl, rating: newItemRating, desc: newItemDescription},
        (newItem) => {
          store.addItem(newItem);
          store.hideBMControls = true;
          render();
        },
        (err) => {
          store.setError(err.responseJSON.message);
          render();
        }
      );
    });
  };

  const handleCancelItemClicked = () => {
    $('.js-cancel-bm-btn').click((event) => {
      store.hideBMControls = true;
      render();
    });
  };

  const getItemId = (item) => {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  };

  const handleDeleteItemClicked = () => {
    $('.js-bm-list').on('click', '.js-delete-item-btn', event => {
      const id = getItemId(event.currentTarget);
      api.deleteItem(id, () => {
        store.findAndDelete(id);
        render();
      });
    });
  };

  const handleMinRatingFilter = () => {
    $('.js-min-rating-select').change(() => {
      let selectedRatingVal = +$('.js-min-rating-select option:selected').val();
      store.minRating = selectedRatingVal;

      render();
    });
  };

  const handleErrMessage = () => {
    $('.error').on('click', '.error-button', () => {
      store.setError('');
      render();
    });
  };

  const render = () => {

    store.errorMessage !== '' ? $('.error').html(genErr(`${store.errorMessage} <span class="err-exit">&times;</span>`)) : $('.error').html('');

    if (store.hideBMControls) {
      $('.js-add-bm-controls').hide();
    } 

    if (!store.hideBMControls) {
      $('.js-add-bm-controls').show();
    }

    if (typeof store.minRating === 'number') {
      let items = store.items.filter(item => item.rating >= store.minRating);
      const bookmarkItemsString = genItemsStr(items);
      $('.js-bm-list').html(bookmarkItemsString);
    } else {
      const bookmarkItemsString = genItemsStr(store.items);
      $('.js-bm-list').html(bookmarkItemsString);
    }
    
  };

  const bindEventListeners = () => {
    handleErrMessage();
    handleAddItemClicked();
    handleSubmitItem();
    handleCancelItemClicked();
    handleDeleteItemClicked();
    handleMinRatingFilter();
  };

  return {
    render,
    bindEventListeners,
  };

})();
