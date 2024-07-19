import { createAsyncThunk } from '@reduxjs/toolkit'
import apiBackend from '@/utils/apiBackend'
// import { ejemploSlice } from '@/slices/new/sectionSlice'

/*
    POST SECTIONS
*/
export const createSections = createAsyncThunk(
  'sections/createSections',
  async ({section, editor}) => {
    try {
      const response = await apiBackend.post(
        `/v1/component/section/${section.pageId}`,
        section
      )
      return {newSection: response.data.data, editor}
    } catch (error) {
      throw new Error(error)
    }
  }
)

/*
    GET ALL SECTIONS
*/

export const getSections = createAsyncThunk(
  'sections/getSections',
  async () => {
    try {
      // Realiza la solicitud a la base de datos para obtener la geometría
      const response = await apiBackend.get(
        'http://localhost:4000/api/v1/component/section/:pageId'
      )
      // console.log(response.data)

      // Actualiza el estado con la geometría encontrada
      console.log(response.data)
      return response.data
    } catch (error) {
      // Manejo de errores
      return { error: error.message }
    }
  }
)

/*
    GET SECTIONS BY ID
*/

export const getSectionById = createAsyncThunk(
  'sections/getSectionById',
  async (id) => {
    try {
      // Realiza la solicitud a la base de datos para obtener la geometría
      const response = await apiBackend.get(
        'http://localhost:4000/api/v1/component/section/:pageId'
      )
      console.log(response.data)

      // Actualiza el estado con la geometría encontrada
      return response.data
    } catch (error) {
      // Manejo de errores
      return { error: error.message }
    }
  }
)

/*
    DELETE SECTIONS
*/

export const deleteSectionById = createAsyncThunk(
  'sections/deleteSectionById',
  async (id) => {
    try {
      // Realiza la solicitud a la API para eliminar la geometría por ID
      const response = await apiBackend.delete(
        'http://localhost:4000/api/v1/component/section/:pageId'
      )

      // Verifica si la respuesta indica un error
      if (response.error) {
        return { error: response.error }
      }

      // Actualiza el estado después de eliminar la geometría
      return id // Devuelve el ID de la geometría eliminada
    } catch (error) {
      console.error('Error al realizar la solicitud:', error)
      return { error: 'Error al realizar la solicitud' }
    }
  }
)

/*
  ACTION EJEMPLO
  */

// export const ejemploActionSincrona = (params) => (dispatch) => {
//   dispatch(ejemploSlice(params))
// }
