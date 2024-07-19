/* eslint-disable no-redeclare */
// /* global localStorage */
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createNewPageByProjectId,
  createNewPageByProjectIdSuccess,
  createNewPageByProjectIdFailure,
  // fetchPage,
  // fetchPageSuccess,
  // fetchPageFailure,
  setUpdatePage,
  setUpdatePageSuccess,
  setUpdatePageFailure,
  setDeletedPage,
  setDeletedPageSuccess,
  setDeletedPageFailure,
  setAllPagesForSpaces,
  clearState,
  editName,
  addPage,
  updatePageNav,
  clearPagesSelected,
  pageBySpaceSelect,
  getDataPage,
  clearDataPage,
  updatePositionPage,
  updateSizePage,
  cleanPageBySpaceSelected,
  setSelectedPage,
  obtenerCapturaStart,
  obtenerCapturaSuccess,
  obtenerCapturaFailure,

} from '@/slices/new/pageSlice'
import apiBackend from '@/utils/apiBackend'

// Crear una page
export const createPage =
  ({ name, spaceId, width, height, x, y, screen }) =>
  async (dispatch) => {
    const newPage = {
      name,
      spaceId,
      width,
      height,
      x,
      y,
      screen
    }
    try {
      dispatch(createNewPageByProjectId())
      const { data } = await apiBackend.post('/v1/page', newPage)
      console.log(data, 'tengo la new page y que más?')
      dispatch(createNewPageByProjectIdSuccess(data.data.newPage))
      return data.data
    } catch (error) {
      dispatch(createNewPageByProjectIdFailure(error.message))
    }
  }

// Borrar una page


export const deletePage = (id) => async (dispatch) => {
  try {
    dispatch(setDeletedPage())
    const { data } = await apiBackend.delete(`/v1/page/${id}`)
    dispatch(setDeletedPageSuccess(data.data.Page))
    return data.data
  } catch (error) {
    dispatch(setDeletedPageFailure(error.message))
  }
}
// Hacer captura de pantalla
// export const obtenerCaptura = ({id, screen}) => async (dispatch) => {
//   console.log(id, 'id')
//   console.log(screen, 'screen')
//   try {
//     dispatch(obtenerCapturaStart())
//     const response = await apiBackend.post(`/v1/puppeteer/screenshot/${id}`, { screen })
//     if (response.status === 200) {
//       const blob = await response.blob()
//       const url = URL.createObjectURL(blob)
//     }
//     const { data } = await apiBackend.post(`/v1/puppeteer/screenshot/${id}`, { screen })

//     console.log(data, 'data')
//     dispatch(obtenerCapturaSuccess(data.data))
//     return data.data
//   } catch (error) {
//     dispatch(obtenerCapturaFailure(error.message))
//   }
// }


export const obtenerCaptura = ({ id, screen, idProjecto, idPage, tipo, size }) => async (dispatch) => {
  try {
    dispatch(obtenerCapturaStart())

    const response = await apiBackend.post(`/v1/puppeteer/screenshot/${id}`, { screen, idProjecto, idPage, tipo, size}, { responseType: 'blob' })
    
    if (response.status === 200) {
      const blob = response.data
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `captura_${Date.now()}.${tipo}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      
      dispatch(obtenerCapturaSuccess())
    } else {
      dispatch(obtenerCapturaFailure('Error en la descarga de la imagen'))
    }
  } catch (error) {
    console.error('Error al obtener la captura:', error)
    dispatch(obtenerCapturaFailure('Error al obtener la captura'))
  }
}
// Traer todas las page por id del proyecto
export const getPageByProjectId = createAsyncThunk(
  'page/getAllProjectPages',
  async (id) => {
    const { data } = await apiBackend.get(
      `/v1/page/getbyproject?projectId=${id}`
    )
    return data.data
  }
)

// Obtener la page por ID propio
// export const getPage = (id) => async (dispatch) => {
//   try {
//     dispatch(fetchPage())
//     const { data } = await apiBackend.get(`/v1/page/${id}`)
//     dispatch(fetchPageSuccess(data.data))
//     return data.data
//   } catch (error) {
//     dispatch(fetchPageFailure(error.message))
//     console.log(error.message)
//   }
// }

export const getPage = createAsyncThunk('page/getPage', async (id) => {
  try {
    const { data } = await apiBackend.get(`/v1/page/${id}`)
    return { page: data.data.page, maxOrderValue: data.data.maxOrderValue }
  } catch (error) {
    throw new Error(error)
  }
})

export const patchPage = createAsyncThunk(
  'page/patchPage',
  async ({ id, name }) => {
    try {
      const { data } = await apiBackend.patch(`/v1/page/${id}`, { name })
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Modificar mas de un atributo en una page
export const updatePage = (id, body) => async (dispatch) => {
  try {
    dispatch(setUpdatePage())
    const { data } = await apiBackend.put(`/v1/page/${id}`, body)
    dispatch(setUpdatePageSuccess(data.data))

    return data.data
  } catch (error) {
    dispatch(setUpdatePageFailure(error.message))
  }
}

// eliminar estado page
export const clearPage = () => (dispatch) => {
  dispatch(clearState())
}

// TRAER TODAS LAS PAGE ASOCIADAS A UN SPACE
export const getAllPageBySpaceId = createAsyncThunk(
  'pages/getAllPageBySpaceId',
  async (id) => {
    try {
      const { data } = await apiBackend.get(`/v1/page/all/space/${id}`)
      // console.log(data.data)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getAllPagesForSpaces = (id) => async (dispatch) => {
  try {
    const response = await apiBackend.get(`/v1/page/all/space/${id}`)
    const data = response.data.data
    dispatch(setAllPagesForSpaces(data))
  } catch (error) {
    throw new Error(error)
  }
}

export const editedPage = (id) => (dispatch) => {
  dispatch(editName(id))
}

export const addPagesNav = (id) => (dispatch) => {
  dispatch(addPage(id))
}

export const updatePageNavAction = (id, name) => (dispatch) => {
  dispatch(updatePageNav({ id, name }))
}
export const clearPagesSelectedNav = (id) => (dispatch) => {
  dispatch(clearPagesSelected(id))
}

export const pageBySpaceSelectedAction = (id) => (dispatch) => {
  dispatch(pageBySpaceSelect(id))
}

export const getPageData = (id) => (dispatch) => {
  dispatch(getDataPage(id))
}

export const clearPageData = () => (dispatch) => {
  dispatch(clearDataPage())
}

export const patchPagesProjectId = createAsyncThunk(
  'pages/patchPagesProjectId',
  async ({ ids, spaceId, position }) => {
    try {
      const { data } = await apiBackend.patch(`/v1/page/associate/${spaceId}`, {
        ids,
        position
      })
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const updatePagePosition = (id, newX, newY) => (dispatch) => {
  dispatch(updatePositionPage({ id, newX, newY }))
}

export const updatePageSize = (id, newWidth, newHeight, newX, newY, screen) => (dispatch) => {
  dispatch(updateSizePage({ id, newWidth, newHeight, newX, newY, screen }))
}
export const cleanPageSelectedBySpace = () => (dispatch) => {
  dispatch(cleanPageBySpaceSelected())
}

export const setPageSelected = (id) => (dispatch) => {
  dispatch(setSelectedPage(id))
}
