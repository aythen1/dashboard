import apiBackend from '@/utils/apiBackend'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const postNewTicket = createAsyncThunk(
  'tickets/postNewTicket',
  async ({ datos }) => {
    try {
      const { data } = await apiBackend.post('/v1/ticket', datos)
      // console.log(data.data, 'data frontend')
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getAllTicketsByPage = createAsyncThunk(
  'tickets/getAllTicketsByPage',
  async ({ idPage }) => {
    try {
      const { data } = await apiBackend.get(`/v1/ticket/page/${idPage}`)
      // console.log(data.data, 'data frontend')
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const patchTicket = createAsyncThunk(
  'tickets/patchTicket',
  async ({ body, idTicket }) => {
    console.log(body)
    try {
      const { data } = await apiBackend.patch(`/v1/ticket/${idTicket}`, body)
      // console.log(data.data, 'data frontend')
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const postProposalTicket = createAsyncThunk(
  'tickets/postProposalTicket',
  async (body) => {
    console.log(body)
    try {
      const { data } = await apiBackend.post('/v1/proposal', body)
      console.log(data.data, 'data postProposalTicket')
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
