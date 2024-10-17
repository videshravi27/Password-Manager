require("dotenv").config();

const mongoose = require("mongoose");
const Detail = require("../models/detailModel");
const CryptoJS = require("crypto-js");

const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
};

const decryptPassword = (encryptedPassword) => {
  return CryptoJS.AES.decrypt(
    encryptedPassword,
    process.env.CRYPTO_SECRET
  ).toString(CryptoJS.enc.Utf8);
};

const getDetails = async (req, res) => {
  const user_id = req.user._id;
  const details = await Detail.find({ user_id }).sort({});

  const decryptedDetails = details.map((detail) => {
    return {
      ...detail.toObject(),
      password: decryptPassword(detail.password),
    };
  });

  res.status(200).json(decryptedDetails);
};

const getDetail = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such data" });
  }
  const detail = await Detail.findById(id);

  if (!detail) {
    return res.status(404).json({ error: "No such data" });
  }

  detail.password = decryptPassword(detail.password);

  res.status(200).json(detail);
};

const createDetail = async (req, res) => {
  const { website, url, username, password } = req.body;

  let emptyFields = [];
  if (!website) {
    emptyFields.push("website");
  }
  if (!url) {
    emptyFields.push("url");
  }
  if (!username) {
    emptyFields.push("username");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const encryptedPassword = encryptPassword(password);
    const detail = await Detail.create({
      website,
      url,
      username,
      password: encryptedPassword,
      user_id,
    });
    res.status(200).json({ message: "Password Stored!", detail });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a data
const deleteDetail = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such data" });
  }
  const detail = await Detail.findOneAndDelete({ _id: id });

  if (!detail) {
    return res.status(400).json({ error: "No such data" });
  }
  res.status(200).json({ message: "Password Deleted!" , detail} );
};

//update a data
const updateDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such data" });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "No data provided to update" });
  }
  try {
    const detail = await Detail.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!detail) {
      return res.status(400).json({ error: "No such data" });
    }

    res.status(200).json({ message: "Password Updated!", detail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDetails,
  getDetail,
  createDetail,
  deleteDetail,
  updateDetail,
};
