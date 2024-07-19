/* eslint-disable no-redeclare */
import apiBackend from '@/utils/apiBackend'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getAllFreelancer = createAsyncThunk(
  'info/getAllFreelancer',
  async () => {
    try {
      const { data } = await apiBackend.get('/v1/infofreelance')
      console.log(data.data)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
