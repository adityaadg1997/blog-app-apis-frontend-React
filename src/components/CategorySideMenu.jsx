import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap'
import {getAllCategories} from '.././services/category-service'

function CategorySideMenu() {

  const [category, setCategory]=useState();

  useEffect(()=>{
    getAllCategories().then(data => {
      console.log("loading category")
      setCategory(data)
    })

  },[])


  return (
    <div>
        <ListGroup>
          <ListGroupItem tag={Link} to="/" action={true} className='border-0'>
            All Blogs
          </ListGroupItem>
          {
            category && category.map((cat, index) =>{
              return (
                <ListGroupItem tag={Link} to={'/categories/' +cat.categoryId} action={true} className='border-0 shadow-0 mt-1' key={index}>
                {cat.categoryTitle}
              </ListGroupItem>
              )
            })
          }
        </ListGroup>
        
      </div>
  )
}

export default CategorySideMenu