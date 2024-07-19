import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import apiBackend from '@/utils/apiBackend'

export const getAllComments = createAsyncThunk(
  'comment/allComments',
  async () => {
    try {
      const { data } = await apiBackend.get('/v1/comment/all')
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const updateAllComments = createAction('comment/updateAllComments')

export const postComment = createAsyncThunk(
  'comment/postComment',
  async (newComment) => {
    try {
      console.log(newComment)
      const { data } = await apiBackend.post('/v1/comment', newComment)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getCommentsByType = createAsyncThunk(
  'rpa/getAllComments',
  async ({ type, idType }) => {
    try {
      const { data } = await apiBackend.get(`v1/comment/${type}/${idType}`)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getAllFolders = createAsyncThunk(
  'comment/getAllFolders',
  async () => {
    try {
      const { data } = await apiBackend.get('/v1/folder/all')
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getFoldersByPage = createAsyncThunk(
  'comment/getFoldersByPage',
  async (folderByPage) => {
    try {
      const { data } = await apiBackend.get(`/v1/folder/page/${folderByPage}`)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const updateCommentFolder = createAsyncThunk(
  'comment/updateCommentFolder',
  async ({ commentId, body }) => {
    try {
      const { data } = await apiBackend.patch(`/v1/comment/${commentId}`, body)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const createNewFolder = createAsyncThunk(
  'comment/createNewFolder',
  async ({ title, description, parentId = null, folderByPage = null }) => {
    try {
      const { data } = await apiBackend.post('/v1/folder', {
        title,
        description,
        parentId,
        folderByPage
      })
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const deleteFolder = createAsyncThunk(
  'comment/deleteFolder',
  async (folderId) => {
    try {
      const { data } = await apiBackend.delete(`/v1/folder/${folderId}`)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const dragFolder = createAsyncThunk(
  'comment/dragFolder',
  async ({ folderId, body }) => {
    try {
      const { data } = await apiBackend.patch(`/v1/folder/${folderId}`, body)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const patchComment = createAsyncThunk(
  'comment/patchComment',
  async ({ commentId, body }) => {
    try {
      const { data } = await apiBackend.patch(`/v1/folder/${commentId}`, body)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
