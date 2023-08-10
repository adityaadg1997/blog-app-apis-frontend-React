import React, { useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import { loadPost, updatePost } from "../services/post-service";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../context/userContext";
import { getAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";

function UpdateBlog() {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const object = useContext(userContext);

  const { blogId } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    //load the blog from database
    loadPost(blogId)
      .then((data) => {
        setPost({ ...data , categoryId:data.category.categoryId});
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading blog..");
      });
  }, []);

  useEffect(() => {
    console.log("first");
    if (post) {
      if (post.user.id != object.user.data.id) {
        toast.error("This is not your post !!");
        navigate("/");
      }
    }
  }, [post]);

  const handleChange = (event, fieldName) => {
    setPost({
      ...post,
      [fieldName]: event.target.value
    });
  };

  const updatePostSubmit=(event)=>{
    event.preventDefault()
    console.log(post)

    updatePost({...post, category:{categoryId:post.categoryId}}, post.postId).then(response=>{
      console.log(response)
      toast.success("Post Updated..")
    }).catch(error=>{
      console.log(error)
      toast.error("Error in loading post")
    })

  }

  const updateHtml = () => {
    return (
      <Container>
        <Row>
          <Col sm={{ size: 10, offset: 1 }}>
            <Card className="mt-3 border-0 shadow">
              <CardBody>
                <CardTitle className="text-center">
                  <h3>Update your Post here !!</h3>
                </CardTitle>

                {/**form */}
                <Form onSubmit={updatePostSubmit}>
                  {/**Post title */}
                  <FormGroup>
                    <Label for="title">Post Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter here"
                      type="text"
                      name="title"
                      value={post.title}
                      onChange={(event)=>handleChange(event, 'title')}
                    />
                  </FormGroup>
                  {/**Post Content */}
                  <FormGroup>
                    <Label for="content">Post Content</Label>
                    {/* <Input
                id="content"
                placeholder="Enter here"
                type="textarea"
                style={{height:'150px'}} />*/}

                    <JoditEditor
                      ref={editor}
                      onChange={newContent=> setPost({...post, content:newContent})}
                      value={post.content}
                    />
                  </FormGroup>

                  {/**image upload */}

                  <FormGroup>
                    <Label for="image">Upload Post Banner</Label>
                    <Input id="image" type="file" onChange={""} />
                  </FormGroup>

                  {/**Post Category */}
                  <FormGroup>
                    <Label for="category">Post Category</Label>
                    <Input
                      id="category"
                      type="select"
                      name="categoryId"
                      onChange={(event)=> handleChange(event, 'categoryId')}
                      value={post.categoryId}
                    >
                      <option value={0} disabled>
                        --Select Category--
                      </option>
                      {categories.map((item) => (
                        <option value={item.categoryId} key={item.categoryId}>
                          {item.categoryTitle}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <Container className="text-center">
                    <Button
                      className="rounded-0"
                      type="submit"
                      color="primary"
                      outline
                    >
                      Update Post
                    </Button>
                    <Button className="ms-2 rounded-0" color="danger" outline>
                      Reset Content
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return <Base>{post && updateHtml()}</Base>;
}

export default UpdateBlog;
