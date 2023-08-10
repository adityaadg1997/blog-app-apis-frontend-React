import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { signUp } from "../services/user-service";

const SignUp = () => {
  {
    /**useState is used to trace input(variable) */
  }
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // {/** useEffect allows us to perform side effects such as fetch data.., here on every dependecy change means change in [data], useEffect will run*/}
  // useEffect(()=>{
  //   console.log(data)
  // }, [data])

  {
    /**handle changes in every event change in input form*/
  }
  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  {
    /** reset button function */
  }
  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  {
    /**form submit button function,  preventDefault will prevent from all the deafult functionalities of button */
  }
  const submitForm = (event) => {
    event.preventDefault();

    console.log(data);

    //data validation

    //call server api for sending data
    signUp(data)
      .then((response) => {
        console.log(response);
        console.log("success");
        toast.success(response.name + " registered successfully");

        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("error");

        //handle error in proper way
        setError({
          errors: error,
          isError: false,
        });
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader className="text-center">
                <h3>Fill Information to Register !!</h3>
              </CardHeader>

              <CardBody>
                {/* creating form */}

                <Form onSubmit={submitForm}>
                  {/* name field */}
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter name here"
                      type="text"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={
                        error.errors?.response?.data?.name ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>

                  {/* email field */}
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="Enter email here"
                      type="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={
                        error.errors?.response?.data?.email ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>

                  {/* password field */}
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="Enter password here"
                      type="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>

                  {/* about field */}
                  <FormGroup>
                    <Label for="about">Write Something about Yourself</Label>
                    <Input
                      id="about"
                      placeholder="Enter here"
                      type="textarea"
                      style={{ height: "200px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={
                        error.errors?.response?.data?.about ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="info" outline>
                      Register
                    </Button>
                    <Button
                      onClick={resetData}
                      className="ms-2"
                      color="warning"
                      outline
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default SignUp;
