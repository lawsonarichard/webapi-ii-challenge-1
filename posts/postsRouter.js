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

// get comments by :id
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(response => {
      if (response.length == 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      return response;
    })
    .then(
      db
        .findPostComments(id)
        .then(response => {
          if (response.length > 0) {
            res.status(200).json(response);
          } else {
            res
              .status(404)
              .json({ message: "No comments found for this post" });
          }
        })
        .catch(error => {
          res.status(500).json({
            error: "The comments information could not be retrieved."
          });
        })
    );
});

// POST REQUESTS

router.post("/", (req, res) => {
  const newPost = req.body;
  const { title, contents } = req.body;
  if (title && contents) {
    db.insert(newPost)
      .then(idObj => {
        db.findById(idObj.id)
          .then(post => {
            res.status(201).json(post);
          })
          .catch(error => {
            res.status(500).json({ message: "Error getting new post" });
          });
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

router.post("/:id/comments", (req, res) => {
  const id = req.params.id;
  const newComment = req.body;
  if (req.body.text) {
    db.findById(id)
      .then(response => {
        if (response.length == 0) {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
        return response;
      })
      .then(
        db
          .insertComment(newComment)
          .then(idObj => {
            db.findCommentById(idObj.id)
              .then(response => {
                res.status(201).json(response);
              })
              .catch(error => {
                res.status(500).json({ message: "Error getting new comment" });
              });
          })
          .catch(error => {
            res.status(500).json({
              error:
                "There was an error while saving the comment to the database"
            });
          })
      );
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  }
});

// PUT REQUESTS //

// put (update) post by :id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatePost = req.body;
  if (updatePost.title && updatePost.contents) {
    db.findById(id).then(response => {
      if (response.length == 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      return response;
    });
    db.update(id, updatePost)
      .then(response => {
        res.status(201).json(updatePost);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The post information could not be modified." });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

// DELETE REQUESTS

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(response => {
      if (response.length == 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      return response;
    })
    .then(response => {
      db.remove(id)
        .then(() => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(500).json({ error: "The post could not be removed" });
        });
    })
    .catch(error => {
      res.status(500).json({ message: "There was an error finding that post" });
    });
});
module.exports = router;
