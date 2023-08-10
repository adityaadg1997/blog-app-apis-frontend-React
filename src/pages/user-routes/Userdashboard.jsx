import { toast } from "react-toastify";
import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { getCurrentUser } from "../../auth";
import AddPost from "../../components/AddPost";
import Base from "../../components/Base";
import NewFeed from "../../components/NewFeed";
import { deletePostById, loadPostsByUser } from "../../services/post-service";
import { useState } from "react";
import Post from "../../components/Post";

const Userdashboard = () => {
  const [posts, setPosts] = useState({
    content: [],
  });

  useEffect(() => {
    loadPostsByUser(getCurrentUser().id)
      .then((data) => {
        console.log(data);
        setPosts({
          content: [...data.content],
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading posts of user");
      });
  }, []);

  //function to delete post
  function deletePost(post) {
    //goint to delete post
    deletePostById(post.postId)
      .then((response) => {
        console.log(response);
        toast.success("post is successfully deleted ...!");

        let newPostContents = posts.content.filter((p) => p.postId != post.postId);
        setPosts({...posts, content:newPostContents});

      })
      .catch((error) => {
        console.log(error)
        toast.error("error in deleting post...");
      });
  }

  return (
    <Base>
      <AddPost />
      <Row>
        <Col md={{ size: 10, offset: 1 }} className="mt-5">
          <h3>Posts Count : ({posts.content.length})</h3>
          {posts.content.map((post, index) => {
            return <Post post={post} key={index} deletePost={deletePost} />;
          })}
        </Col>
      </Row>
    </Base>
  );
};

export default Userdashboard;
