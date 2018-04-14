'use strict'; 

const store = (() => {
  const setError = function (error) {
    this.errorMessage = error;
  };

  const addItem = function(item) {
    this.items.push(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  return {
    setError,
    errorMessage: '',
    items: [],
    hideBMControls: true,
    minRating: null,

    addItem,
    findById,
    findAndDelete,
  };

})();