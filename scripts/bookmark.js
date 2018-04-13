'use strict'; 

/* global $, store*/

const bookmarkItems = (() => {
  const genError = (err) => {
    let message = '';
    if (err.responseJSON && err.responseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} Server Error`;
    }

    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  };

  const genItemElement = (item) => {
    return `
    <li class="item-element js-item-element" data-item-id="${item.id}">
      <details>
        <summary>${item.title} ${(item.rating ? item.rating + ' stars' : 'No Rating')}</summary>
        <p>${(item.desc ? item.desc : 'No Description')}</p>
        <a href="${item.url}" target="_blank">Visit Site</a>
        <button class="delete-item-btn js-delete-item-btn">Remove Bookmark</button>
      </details>
    </li>
    `;
  };

  const genItemsStr = () => {
    const items = store.items.map((item) => {
      return genItemElement(item);
    });

    return items.join('');
  };

  const handleAddItemClicked = () => {
    $('.js-add-bm-btn').click(() => {
      store.hideBMControls = false;
      render();
    });
  };

  const handleSubmitItem = () => {
    $('.js-add-bm-form').submit((event) => {
      event.preventDefault();
      store.hideBMControls = true;
      render();
    });
  };

  const handleCancelItemClicked = () => {
    $('.js-cancel-bm-btn').click(() => {
      store.hideBMControls = true;
      render();
    });
  };

  const render = () => {
    if (store.hideBMControls) {
      $('.js-add-bm-controls').hide();
      console.log('true ran');
    } 

    if (!store.hideBMControls) {
      console.log('false ran');
      $('.js-add-bm-controls').show();
    }

  };

  handleAddItemClicked();
  handleSubmitItem();
  render();

})();
