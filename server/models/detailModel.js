const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const detailSchema = new Schema(
  {
    website: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Detail", detailSchema);
