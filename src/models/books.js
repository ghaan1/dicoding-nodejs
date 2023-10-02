const {nanoid} = require('nanoid');


/**
 * Represents a book.
 */
class Book {
  /**
   * Creates a new Book instance.
   * @constructor
   * @param {object} bookInfo
   * @param {string} bookInfo.name
   * @param {number} bookInfo.year
   * @param {string} bookInfo.author
   * @param {string} bookInfo.summary
   * @param {string} bookInfo.publisher
   * @param {number} bookInfo.pageCount
   * @param {number} bookInfo.readPage
   * @param {boolean} bookInfo.reading
   */
  constructor({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }) {
    this.id = nanoid();
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.finished = pageCount === readPage;
    this.reading = reading;
    this.insertedAt = new Date().toISOString();
    this.updatedAt = this.insertedAt;
  }
}

module.exports = Book;
