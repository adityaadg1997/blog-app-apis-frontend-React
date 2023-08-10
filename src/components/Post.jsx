import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
} from "reactstrap";
import { getCurrentUser, isLoggedIn } from "../auth";
import userContext from "../context/userContext";

function Post({
  post = {
    id: -1,
    title: "This is default post title",
    content: "This is default post content",
  },
  deletePost,
}) {
  const userContextData = useContext(userContext);

  return (
    <Card className="border-0 shadow mb-2">
      <CardBody>
        <CardTitle>
          <h1>{post.title}</h1>
        </CardTitle>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post.content?.substring(0, 200) + "...",
          }}
        ></CardText>
        <Container>
          <Link className="btn btn-secondary" to={`/posts/${post.postId}`}>
            Read More
          </Link>

          {userContextData.user.login &&
          post.user.id === getCurrentUser().id ? (
            <Button
              onClick={() => deletePost(post)}
              className="btn btn-danger ms-2"
            >
              Delete
            </Button>
          ) : (
            ""
          )}

          {userContextData.user.login &&
          post.user.id === getCurrentUser().id ? (
            <Button  
              tag={Link} to={`/user/update-blog/${post.postId}`}
              className="btn btn-warning ms-2"
            >
              Update
            </Button>
          ) : (
            ""
          )}
        </Container>
      </CardBody>
    </Card>
  );
}

export default Post;
