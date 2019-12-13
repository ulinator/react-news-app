import { URL } from './../config.js';

export const getAuthor = async (authorId, token) => {
  const response = await fetch(`${URL}/author/${authorId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': token
    }
  });

  return response;
}

export const getComments = async (postId, token) => {
  const response = await fetch(`${URL}/posts/${postId}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': token
    }
  });

  return response;
}

export const getPost = async (postId, token) => {
  const response = await fetch(`${URL}/posts/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': token
    }
  });

  return response;
}

export const getPosts = async (page, order, orderBy, token) => {
  const response = await fetch(`${URL}/posts?page=${page}&order=${order}&orderBy=${orderBy}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': token
    }
  });

  return response;
}

export const postLogin = async (username, password) => {
  const response = await fetch(`${URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  return response;
}

export const postComment = async (commentId, name, comment, token) => {
  const response = await fetch(`${URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': token
    },
    body: JSON.stringify({
      id: commentId,
      name: name,
      comment: comment
    })
  });

  return response;
}

export const putTime = async (postId, time, token) => {
  const response = await fetch(`${URL}/time/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': token
    },
    body: JSON.stringify({
      time: time
    })
  });

  return response;
}
