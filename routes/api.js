/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
const Book = require("../db/index").BookModel;

module.exports = function (app) {
  app
    .route("/api/books")
    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      Book.find({}, (err, books) => {
        if (err) {
          return res.send({ error: "db failure" });
        }
        res.send(books);
      });
    })

    .post(function (req, res) {
      //response will contain new book object including atleast _id and title
      let title = req.body.title;
      if (!title) {
        return res.send("missing required field title");
      }
      let newBook = new Book({ title });
      newBook.save((err, book) => {
        if (err) {
          return res.send({ error: "db failure" });
        }
        res.send(book);
      });
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
      Book.deleteMany({}, (err) => {
        if (err) {
          return res.send({ error: "db failure" });
        }
        res.send("complete delete successful");
      });
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      Book.findById(bookid, (err, book) => {
        if (!book) {
          return res.send("no book exists");
        }
        res.send(book);
      });
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) return res.send("missing required field comment");
      Book.findById(bookid, (err, book) => {
        if (!book) {
          return res.send("no book exists");
        }
        book.comments.push(comment);
        book.save((err, book) => {
          if (err) {
            return res.send({ error: "db failure" });
          }
          res.send(book);
        });
      });

      //json res format same as .get
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.findByIdAndRemove(bookid, function (err, book) {
        if (!book) {
          return res.send("no book exists");
        }
        res.send("delete successful");
      });
    });
};
