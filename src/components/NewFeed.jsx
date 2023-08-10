import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import { deletePostById, loadAllPosts } from "../services/post-service";
import Post from "./Post";

const NewFeed = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    lastPage: false,
    pageNumber: "",
    pageSize: "",
    totalElements: "",
    totalPages: "",
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    //load currentPage posts from server
    console.log("loading posts..");
    console.log(currentPage);
    changePage(currentPage);
  }, [currentPage]);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber == 0) {
      return;
    }

    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostContent({
          content: [...postContent.content, ...data.content],
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
        });

        console.log(data);
      })
      .catch((error) => {
        toast.error("Error in loading posts");
      });
  };

  const changePageInfinite = () => {
    console.log("page changed");
    setCurrentPage(currentPage + 1);
  };

  //function to delete post
  function deletePost(post) {
    //goint to delete post
    deletePostById(post.postId)
      .then((response) => {
        console.log(response);
        toast.success("post is successfully deleted ...!");

        let newPostContents = postContent.content.filter(
          (p) => p.postId != post.postId
        );
        setPostContent({ ...postContent, content: newPostContents });
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in deleting post...");
      });
  }

  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <h3>Blog Count ({postContent?.totalElements})</h3>

          {/**Implementing Infinite Scroll */}

          <InfiniteScroll
            dataLength={postContent.content.length}
            next={changePageInfinite}
            hasMore={!postContent.lastPage}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {postContent.content.map((post) => (
              <Post deletePost={deletePost} post={post} key={post.postId} />
            ))}
          </InfiniteScroll>

          {/**pagination implimentation */}
          {/* <Container className="mt-3">
            <Pagination size="lg">
              <PaginationItem
                onClick={() => changePage(postContent.pageNumber - 1)}
                disabled={postContent.pageNumber == 0}
              >
                <PaginationLink>Previous</PaginationLink>
              </PaginationItem>

              {[...Array(postContent.totalPages)].map((item, index) => (
                <PaginationItem
                  onClick={() => changePage(index)}
                  active={index == postContent.pageNumber}
                  key={index}
                >
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem
                disabled={postContent.lastPage}
                onClick={() => changePage(postContent.pageNumber + 1)}
              >
                <PaginationLink>Next</PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container> */}
        </Col>
      </Row>
    </div>
  );
};

export default NewFeed;
