require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const book = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    comments: [String],
  },
  { toJSON: { virtuals: true } }
);

book.virtual("commentcount").get(function () {
  return this.comments.length;
});

const Book = mongoose.model("book", book);

exports.BookModel = Book;
