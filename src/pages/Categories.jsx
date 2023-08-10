import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import Base from "../components/Base";
import CategorySideMenu from "../components/CategorySideMenu";
import { deletePostById, loadPostsByCategory } from "../services/post-service";
import NewFeed from "../components/NewFeed";
import Post from "../components/Post";
import { toast } from "react-toastify";

function Categories() {
  const [posts, setPosts] = useState({
    content: [],
  });

  const { categoryId } = useParams();

  useEffect(() => {
    console.log("posts loading by categoryId : " + categoryId);
    loadPostsByCategory(categoryId)
      .then((data) => {
        setPosts({
          content: [...data.content],
        });
      })
      .catch((error) => {
        toast.error("error in loading posts");
      });
  }, [categoryId]);

  console.log(posts);


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
      <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-5">
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <h3>Blog Count ({posts.content.length})</h3>
            {posts.content &&
              posts.content.map((post, index) => {
                return <Post deletePost={deletePost} post={post} key={index} />;
              })}

            {posts.content.length <= 0 ? <h2>No Post in this Category</h2> : ""}
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Categories;
