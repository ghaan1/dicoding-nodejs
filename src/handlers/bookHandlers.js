const Book = require('../models/books');

const books = [];

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return h
        .response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        })
        .code(400);
  }

  if (readPage > pageCount) {
    return h
        .response({
          status: 'fail',
          message:
    'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
  }

  const newBook = new Book({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  });

  books.push(newBook);

  return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: newBook.id,
        },
      })
      .code(201);
};

const getAllBooksHandler = (request, h) => {
  const {reading, finished, name} = request.query;
  let filteredBooks = books;

  if (reading === '1') {
    filteredBooks = filteredBooks.filter((book) => book.reading === true);
  } else if (reading === '0') {
    filteredBooks = filteredBooks.filter((book) => book.reading === false);
  }

  if (finished === '1') {
    filteredBooks = filteredBooks.filter((book) => book.finished === true);
  } else if (finished === '0') {
    filteredBooks = filteredBooks.filter((book) => book.finished === false);
  }

  if (name) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  const response = {
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  };

  return h.response(response);
};


const getBookByIdHandler = (request, h) => {
  const {bookId} = request.params;

  const foundBook = books.find((book) => book.id === bookId);

  if (!foundBook) {
    return h
        .response({
          status: 'fail',
          message: 'Buku tidak ditemukan',
        })
        .code(404);
  }

  const {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  } = foundBook;

  return h.response({
    status: 'success',
    data: {
      book: {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt,
      },
    },
  });
};

const updateBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const foundBookIndex = books.findIndex((book) => book.id === bookId);

  if (foundBookIndex === -1) {
    return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan',
        })
        .code(404);
  }

  if (!name) {
    return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        .code(400);
  }

  if (readPage > pageCount) {
    return h
        .response({
          status: 'fail',
          message:
      'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
  }

  books[foundBookIndex] = {
    ...books[foundBookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  };

  return h
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      .code(200);
};

const deleteBookHandler = (request, h) => {
  const {bookId} = request.params;

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return h
        .response({
          status: 'fail',
          message: 'Buku gagal dihapus. Id tidak ditemukan',
        })
        .code(404);
  }

  books.splice(bookIndex, 1);

  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookHandler,
};
