import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Row, Table } from 'reactstrap'
import { getCurrentUser, isLoggedIn } from '../auth'

const ViewUserProfile=({user}) =>{

  const [currentUser, setCurrentUser]=useState(null)
  const [login, setLogin]=useState(false)

  useEffect(()=>{
    setCurrentUser(getCurrentUser())
    setLogin(isLoggedIn())
  },[])


  return (
    <Card className='mt-5 border-0 rounded-0 shadow-sm'>
            <CardBody>
              <h3 className='text-uppercase'>User Information</h3>
              <Container className='text-center'>
                <img style={{ maxHeight:'500px', maxWidth:'250px'}} src={user.image ? user.image : 'https://images.unsplash.com/photo-1617505676611-9e3575321d6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'} alt='user profile picture' className='img-fluid rounded'/>
              </Container>

              <Table responsive striped hover bordered={true} className='mt-5 text-center'>
                <tbody>
                  <tr>
                    <td>
                      ID
                    </td>
                    <td>
                      {user.userId}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      USER NAME
                    </td>
                    <td>
                      {user.name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      EMAIL
                    </td>
                    <td>
                      {user.email}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      ABOUT
                    </td>
                    <td>
                      {user.about}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      ROLE
                    </td>
                    <td>
                      {user.roles.map(role=>{
                        return(
                          <div key={role.id}>{role.name}</div>
                        )
                      })}
                    </td>
                  </tr>
                </tbody>
              </Table>
              {currentUser ? 
                (currentUser.id == user.id) ? (<CardFooter className='text-center'>
                <Button color='warning' >Update Profile</Button>
              </CardFooter>)  : '' : ''}
            </CardBody>
          </Card>
  )
}

export default ViewUserProfile