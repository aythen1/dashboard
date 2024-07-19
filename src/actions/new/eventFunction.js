import { createAsyncThunk } from '@reduxjs/toolkit'
import apiBackend from '@/utils/apiBackend'
import {
  addDataValues,
  deleteDataValues,
  setShowEventFunction
} from '@/slices/new/eventFunctionSlice'

// Función para mostrar la ventana modal (temporal)
export const showEventFunction = (show) => (dispatch) => {
  dispatch(setShowEventFunction(show))
}

export const setComponentValues = (data) => (dispatch) => {
  dispatch(addDataValues(data))
}

export const removeComponentsValues = (id) => (dispatch) => {
  dispatch(deleteDataValues(id))
}

export const saveComponentsValues = createAsyncThunk(
  'eventFunction/saveComponentsValues',
  async (values) => {
    // id del componente y { data: {} } con las propiedades (data en este caso)
    console.log(values)
    try {
      const { data } = await apiBackend.patch(
        `/v1/component/patch/${values.id}`,
        values.data
      )
      console.log('action', data.data)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const updateEventFunctions = createAsyncThunk(
  'eventFunction/updateEventFunctions',
  async (inf) => {
    console.log(inf)
    const { id, functionId, newFn } = inf
    try {
      console.log('entro a la action ')
      const { data } = await apiBackend.patch(`/v1/component/patchFn/${id}`, {
        functionId,
        newFn
      })
      console.log(data.data)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getEventFunctions = createAsyncThunk(
  'eventFunction/getEventFunctions',
  async (id) => {
    try {
      const { data } = await apiBackend.get(`/v1/component/${id}`)
      console.log('get en action', data.data)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const patchOrderFunctions = createAsyncThunk(
  'eventFunction/patchOrderFunctions',
  async (info) => {
    const { id, functionId, newOrder } = info
    console.log(id, functionId, newOrder)
    try {
      const { data } = await apiBackend.patch(
        `/v1/component/patchOrderFn/${id}`,
        {
          functionId,
          newOrder
        }
      )
      console.log('orderFunctions', data.data)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const deleteFunction = createAsyncThunk(
  'eventFunction/deleteFunction',
  async (info) => {
    const { functionId, id } = info
    console.log(functionId, id)
    try {
      const { data } = await apiBackend.delete(
        `/v1/component/deleteFunction/${id}`,
        {
          data: { functionId } // Pasar functionId como parte del cuerpo de la solicitud
        }
      )
      console.log('deleteFunctions', data.data)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }
)

