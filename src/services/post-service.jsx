import { myAxios, privateAxios } from "./helper";

export const createPost = (postData) => {
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => response.data);
};

//load all posts
export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
    )
    .then((response) => response.data);
};

//load post of given postId
export const loadPost = (postId) => {
  return myAxios.get(`/posts/${postId}`).then((response) => response.data);
};

//create comments - /user/{userId}/post/{postId}/comment
export const createComment = (userId, postId, comment) => {
  return privateAxios
    .post(`/comments/user/${userId}/post/${postId}/comment`, comment)
    .then((response) => response.data);
};

//upload post Image - /post/image/upload/{postId}
export const uploadPostImage = (file, postId) => {
  let formData = new FormData();
  formData.append("file", file);

  return privateAxios
    .post(`/post/image/upload/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

//loadPostByCategory -/category/{categoryId}/posts
export const loadPostsByCategory = (categoryId) => {
  return myAxios
    .get(`/category/${categoryId}/posts`)
    .then((response) => response.data);
};

// loadPostsByUser - /user/{userId}/posts
export const loadPostsByUser = (userId) => {
  return myAxios.get(`/user/${userId}/posts`).then((response) => response.data);
};

// deletePostById -/posts/{postId}
export const deletePostById = (postId) => {
  return privateAxios
    .delete(`/posts/${postId}`)
    .then((response) => response.data);
};

//update post
export const updatePost=(post, postId)=>{
  return privateAxios.put(`/posts/${postId}`, post).then(response=> response.data)
}
