import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import { getCurrentUser, isLoggedIn } from "../auth";
import Base from "../components/Base";
import { BASE_URL } from "../services/helper";
import { createComment, loadPost } from "../services/post-service";

const PostPage = () => {
  const { postId } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    //load post of postId
    loadPost(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        toast.error("Post Can't be loaded...");
        console.log(error);
      });
  }, []);

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleDateString();
  };

  const [comment, setComment]=useState({
    content:''
  })


  const submitComment=()=>{

    if(!isLoggedIn()){
      toast.error('Please login to add comments.. !!')
      return
    }

    if(comment.content.trim()===''){
      return
    }

    createComment(post.user.id, post.postId, comment).then(data =>{
      console.log(data)
      toast.success("comment added ...")
      setPost({
        ...post,
        comments:[...post.comments, data]
      })
      setComment({
        content:''
      })

    }).catch(error=>{
      console.log(error)
    })
  }

  

  return (
    <Base>
      <Container className="mt-4">
        <Link to={"/"}>Home</Link> / {post && <Link to={""}>{post.title}</Link>}
        <Row>
          <Col md={{ size: 12 }}>
            <Card className="mt-3 border-0 shadow-md">
              {post && (
                <CardBody>
                  <CardText>
                    Posted by<b> {post.user.name}</b> on{" "}
                    <b>{printDate(post.addedDate)}</b>
                  </CardText>
                  <CardText>
                    <span className="text-muted">
                      {post.category.categoryTitle}
                    </span>
                  </CardText>

                  <div
                    className="divider"
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#e2e2e2",
                    }}
                  ></div>

                  <CardTitle className="mt-3">
                    <h1>{post.title}</h1>
                  </CardTitle>

                  <div
                    className="image-container container mt-4  shadow"
                    style={{ maxWidth: "50%" }}
                  >
                    <img
                      className="img-fluid"
                      src={BASE_URL + "/post/image/" + post.imageName}
                      alt="image here"
                    ></img>
                  </div>

                  <CardText
                    className="mt-5"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col md={{ size: 10, offset: 1 }}>
            <h3>comments ({post ? post.comments.length : 0})</h3>

            <Card className="mt-2 border-0">
              <CardBody>
                <CardText>
                  <input
                    style={{ width: "100%", height: "80px"}}
                    type="textarea"
                    placeholder="Add a comment.."
                    value={comment.content}
                    onChange={(event)=> setComment({content:event.target.value})}
                  />
                  <Button onClick={submitComment} className="mt-2" color="primary">Submit</Button>
                </CardText>
              </CardBody>
            </Card>

            
            {post &&
              post.comments.map((item, index) => (
                <Card className="mt-2 border-0" key={index}>
                  <CardBody>
                    <CardText className="mt-2">{item.content}</CardText>
                  </CardBody>
                </Card>
              ))}
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
