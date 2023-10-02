const {addBookHandler} = require('../handlers/bookHandlers');
const {getAllBooksHandler} = require('../handlers/bookHandlers');
const {getBookByIdHandler} = require('../handlers/bookHandlers');
const {updateBookByIdHandler} = require('../handlers/bookHandlers');
const {deleteBookHandler} = require('../handlers/bookHandlers');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
  },
];

module.exports = routes;
