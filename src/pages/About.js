import Base from "../components/Base";
import userContext from "../context/userContext";

const About = () => {
  return (

    <userContext.Consumer>
      
      {
        (object)=> (
          
          <Base>
          <h1> this is about component</h1>
          <p>Hi, User {object.user.login && object.user.data.name} , welcome to About Page</p>
        </Base>
       )
      }
    </userContext.Consumer>
   
  );
};

export default About;
