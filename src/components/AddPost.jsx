import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
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
import { getCurrentUser } from "../auth";
import { getAllCategories } from "../services/category-service";
import { createPost, loadPostsByUser, uploadPostImage } from "../services/post-service";

const AddPost = () => {
  const editor = useRef(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  //on change function
  const fieldChanged = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const contentFieldChanaged = (data) => {
    setPost({ ...post, content: data });
  };

  const addPost = (event) => {
    event.preventDefault();
    console.log(post);

    if (post.title.trim() === "") {
      toast.error("post title is required!");
      return;
    }
    if (post.content.trim() === "") {
      toast.error("post content is required!");
      return;
    }
    if (post.categoryId.trim() === "") {
      toast.error("post category is required!");
      return;
    }

    post["userId"] = getCurrentUser().id;

    //create post function
    createPost(post)
      .then((postData) => {
        //api call to upload post image
        uploadPostImage(image, postData.postId).then(data =>{
          toast.success('image successfully uploaded!!')
        }).catch(error =>{
          toast.error('something went wrong while uploading image')
        })
        toast.success("Post Created!!");
        setPost({
          title: "",
          content: "",
          categoryId: "",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something Went wrong !!");
      });
  };

  const[image, setImage]=useState(null)

  const handleFileChange=(event)=>{
    setImage(event.target.files[0])
  }

  return (
    <Container>
      <Row>
        <Col sm={{ size: 10, offset: 1 }}>
          <Card className="mt-3 border-0 shadow">
            <CardBody>
              <CardTitle className="text-center">
                <h3>Add your Post here</h3>
              </CardTitle>

              {/**form */}
              <Form onSubmit={addPost}>
                {/**Post title */}
                <FormGroup>
                  <Label for="title">Post Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter here"
                    type="text"
                    name="title"
                    onChange={fieldChanged}
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
                    value={post.content}
                    onChange={(newContent) => contentFieldChanaged(newContent)}
                  />
                </FormGroup>

                {/**image upload */}

                <FormGroup>
                  <Label for="image">Upload Post Banner</Label>
                  <Input
                    id="image"
                    type="file"
                    onChange={handleFileChange}
                  />
                </FormGroup>

                {/**Post Category */}
                <FormGroup>
                  <Label for="category">Post Category</Label>
                  <Input
                    id="category"
                    type="select"
                    name="categoryId"
                    onChange={fieldChanged}
                    defaultValue={0}
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
                    Create Post
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

export default AddPost;
