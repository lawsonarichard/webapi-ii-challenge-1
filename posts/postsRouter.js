const express = require("express");

const router = require("express").Router();
const db = require("../data/db");

// GET REQUESTS //

// GET all POSTS
router.get("/", (req, res) => {
  db.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    });
});

// Get Post by :id

router.get("/:id", (req, res) => {
  const postId = req.params.id;
  db.findById(postId).then(post => {
    if (post) {
      res
        .status(200)
        .json(post)
        .send(`You get post id ${postId}`);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  });
});

// POST REQUESTS

module.exports = router;
