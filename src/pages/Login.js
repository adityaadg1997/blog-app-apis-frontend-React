import { useState } from "react";
import { toast } from "react-toastify";
import { doLogin } from "../auth";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { login } from "../services/user-service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../context/userContext";

const Login = () => {
  const userContextData = useContext(userContext);

  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, property) => {
    setLoginDetails({ ...loginDetails, [property]: event.target.value });
  };

  {
    /**Submit form */
  }
  const handleFormSubmit = (event) => {
    event.preventDefault();

    //form validation
    if (
      loginDetails.username.trim() == "" ||
      loginDetails.password.trim() == ""
    ) {
      toast.error("Username or Password is required!!");
      return;
    }

    //server api call to login, to generate token
    login(loginDetails)
      .then((data) => {
        console.log(data);
        toast.success("Login Success");

        //save data to localstorage
        doLogin(data, () => {
          console.log("data saved to localstorage");
        });

        //redirect to user dashboard page
        userContextData.setUser({
          data: data.user,
          login: true
        })
        navigate("/user/dashboard");

        setLoginDetails({
          username: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("error log");
        if (error.response.status == 400 || error.response.status == 404) {
          toast.error("Username or Password Invalid!");
        }
      });
  };

  const formReset = () => {
    setLoginDetails({
      username: "",
      password: "",
    });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader className="text-center">
                <h3>Login Here !!</h3>
              </CardHeader>

              <CardBody>
                {/* creating form */}

                <Form onSubmit={handleFormSubmit}>
                  {/* email field */}
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter email here"
                      type="email"
                      value={loginDetails.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>

                  {/* password field */}
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      placeholder="Enter password here"
                      type="password"
                      value={loginDetails.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="info" outline>
                      Login
                    </Button>
                    <Button
                      onClick={formReset}
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

export default Login;
