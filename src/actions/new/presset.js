import { createAsyncThunk } from '@reduxjs/toolkit'

import apiBackend from '@/utils/apiBackend'
import {
  setShowPressetsList,
  fetchPressetStart,
  fetchPressetSuccess,
  fetchPressetFailure,
  setUserCssClassesStart,
  setUserCssClassesSuccess,
  setUserCssClassesFailure,
  setColorStart,
  setColorSuccess,
  setColorFailure,
  patchColorStart,
  patchColorLocal,
  patchColorSuccess,
  patchColorFailure,
  setTextStart,
  setTextSuccess,
  setTextFailure,
  patchTextLocal,
  addTextStart,
  addTextSuccess,
  addTextFailure,
  patchTextStart,
  patchTextSuccess,
  patchTextFailure,
  deleteTextStart,
  deleteTextSuccess,
  deleteTextFailure,
  setLayoutStart,
  setLayoutSuccess,
  setLayoutFailure,
  patchLayoutStart,
  patchLayoutSuccess,
  patchLayoutFailure,
  deleteLayoutStart,
  deleteLayoutSuccess,
  deleteLayoutFailure,
  setNewPresetStart,
  setNewPresetSuccess,
  setNewPresetFailure,
  deleteTextLocal,
  fetchUserPressetSuccess,
  fetchUserPressetFailure,
  fetchUserPressetStart,
  fetchSharedUserPressetSuccess,
  fetchSharedUserPressetStart,
  fetchSharedUserPressetFailure,
  setSharedColorStart,
  setSharedColorSuccess,
  setSharedColorFailure,
  setSharedTextStart,
  setSharedTextSuccess,
  setSharedTextFailure,
  setSharedLayoutStart,
  setSharedLayoutSuccess,
  setSharedLayoutFailure,
  toggleClasses
} from '@/slices/new/pressetSlice'
import { showPageFunction } from '@/actions/new/pageFunction'

export const getAllPressets = createAsyncThunk(
  'pressets/getPressets',
  async (query) => {
    const response = await apiBackend.get(
      `/v1/pressets/getPressets?query=${query}`
    )
    return response.data
  }
)

export const getPressetsByID = createAsyncThunk(
  'pressets/getPressets/:id',
  async (id) => {
    const response = await apiBackend.get(`/v1/pressets/getPressets/${id}`)
    return response.data
  }
)

// / / / / / / / / / / / / / / / / / / / / / / / P R E S S E T  \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \

// Traer todas las page por id del proyecto
export const toggleShowPresets = (boolean) => async (dispatch) => {
  try {
    dispatch(setShowPressetsList(boolean))
    if (boolean === true) {
      dispatch(showPageFunction(false))
    }
  } catch (error) {
    console.log(error.message)
  }
}
// Crear un presset
// export const createPresset =
//   ({ projectId, name }) =>
//   async (dispatch) => {
//     const newPage = {
//       projectId,
//       name
//     }
//     try {
//       dispatch(createNewPageByProjectId())
//       const { data } = await apiBackend.post('/v1/page', newPage)
//       dispatch(createNewPageByProjectIdSuccess(data.data))
//       return data.data
//     } catch (error) {
//       dispatch(createNewPageByProjectIdFailure(error.message))
//     }
//   }

// Traer todas las css classes por id de usuario
export const getUserCssClasses = () => async (dispatch) => {
  const { user } = JSON.parse(localStorage.getItem('user'))
  // console.log(user)
  try {
    dispatch(setUserCssClassesStart())
    const { data } = await apiBackend.get(`/v1/cssClass/all/${user.id}`)
    dispatch(setUserCssClassesSuccess(data.data))
  } catch (error) {
    dispatch(setUserCssClassesFailure(error.message))
  }
}
// Traer todas las css classes por id de usuario
export const toggleLocalCssClasses = (name) => async (dispatch) => {
  try {
    dispatch(toggleClasses(name))
  } catch (error) {
    throw Error(error.message)
  }
}
// Traer todas las page por id del proyecto
export const getPressetByProjectId = (id) => async (dispatch) => {
  // console.log('ACTION getPressetByProjectId', id)
  try {
    dispatch(fetchPressetStart())
    const { data } = await apiBackend.get(`/v1/preset/project/${id}`)
    dispatch(fetchPressetSuccess(data.data))
  } catch (error) {
    dispatch(fetchPressetFailure(error.message))
  }
}
// Traer todas las page por id del proyecto
export const getPressetByUserId = (id) => async (dispatch) => {
  // console.log('ACTION getPressetByProjectId', id)
  try {
    dispatch(fetchUserPressetStart())
    const { data } = await apiBackend.get(`/v1/preset/user/${id}`)
    dispatch(fetchUserPressetSuccess(data.data))
  } catch (error) {
    dispatch(fetchUserPressetFailure(error.message))
  }
}
// Traer todas las page por id del proyecto
export const getSharedPressetByUserId = (id) => async (dispatch) => {
  // console.log('ACTION getPressetByProjectId', id)
  try {
    dispatch(fetchSharedUserPressetStart())
    const { data } = await apiBackend.get(`/v1/preset/shared/${id}`)
    dispatch(fetchSharedUserPressetSuccess(data.data))
  } catch (error) {
    dispatch(fetchSharedUserPressetFailure(error.message))
  }
}
// Crear preset
export const addPreset = (body) => async (dispatch) => {
  // console.log('ACTION addPreset', body)
  try {
    dispatch(setNewPresetStart())
    const { data } = await apiBackend.post('/v1/preset/', body)
    dispatch(setNewPresetSuccess(data.data))
    // return data.data
  } catch (error) {
    dispatch(setNewPresetFailure(error.message))
  }
}

// / / / / / / / / / / / / / / / / / / / / / / / C O L O R \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \

// Crear color
export const addColor = (id, colorsAdded, idPreset) => async (dispatch) => {
  const body = { value: colorsAdded }
  try {
    dispatch(patchColorStart())
    dispatch(patchColorLocal({ id, colorsFiltered: colorsAdded, idPreset }))
    const { data } = await apiBackend.patch(`/v1/color/${id}`, body)
    dispatch(patchColorSuccess(data.data))
    // return data.data
  } catch (error) {
    dispatch(patchColorFailure(error.message))
  }
}

// Traer todos los colorers por id del presset
export const getColorByPressetId = (id) => async (dispatch) => {
  try {
    dispatch(setColorStart())
    const { data } = await apiBackend.get(`/v1/color/all/${id}`)
    dispatch(setColorSuccess({ projectId: id, color: data.data }))
  } catch (error) {
    dispatch(setColorFailure(error.message))
  }
}
// Traer todos los colorers por id del presset
export const getColorBySharedPressetId = (id) => async (dispatch) => {
  try {
    dispatch(setSharedColorStart())
    const { data } = await apiBackend.get(`/v1/color/all/${id}`)
    dispatch(setSharedColorSuccess({ projectId: id, color: data.data }))
  } catch (error) {
    dispatch(setSharedColorFailure(error.message))
  }
}

// Modificar un color especifico de una lista de colores
export const patchColor = (id, body, idPreset) => async (dispatch) => {
  try {
    dispatch(patchColorStart())
    const { data } = await apiBackend.patch(`/v1/color/${id}`, body)
    dispatch(patchColorSuccess(data.data))
    // return data.data
  } catch (error) {
    dispatch(patchColorFailure(error.message))
  }
}
// Modificar un color especifico de una lista de colores
export const updateColor =
  (id, colorsFiltered, idPreset) => async (dispatch) => {
    const body = { value: colorsFiltered }
    try {
      dispatch(patchColorStart())
      dispatch(patchColorLocal({ id, colorsFiltered, idPreset }))
      const { data } = await apiBackend.patch(`/v1/color/${id}`, body)
      dispatch(patchColorSuccess(data.data))
    } catch (error) {
      dispatch(patchColorFailure(error.message))
    }
  }
// / / / / / / / / / / / / / / / / / / / / / / / T E X T \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \

// Crear text
export const addText =
  ({ idPreset, newTextWithId }) =>
  async (dispatch) => {
    // console.log('ACTION addText body - ', newTextWithId)
    try {
      dispatch(addTextStart())
      const { data } = await apiBackend.post('/v1/text/', newTextWithId)
      dispatch(addTextSuccess({ idPreset, texts: data.data }))
    } catch (error) {
      dispatch(addTextFailure(error.message))
    }
  }
// Traer todos los text por id del presset
export const getTextByPressetId = (id) => async (dispatch) => {
  try {
    dispatch(setTextStart())
    const { data } = await apiBackend.get(`/v1/text/all/${id}`)
    dispatch(setTextSuccess({ projectId: id, texts: data.data }))
  } catch (error) {
    dispatch(setTextFailure(error.message))
  }
}
// Traer todos los text por id del presset
export const getTextBySharedPressetId = (id) => async (dispatch) => {
  try {
    dispatch(setSharedTextStart())
    const { data } = await apiBackend.get(`/v1/text/all/${id}`)
    dispatch(setSharedTextSuccess({ projectId: id, texts: data.data }))
  } catch (error) {
    dispatch(setSharedTextFailure(error.message))
  }
}
// Modificar un color especifico de una lista de colores
export const patchText = (id, body) => async (dispatch) => {
  try {
    dispatch(patchTextStart())
    const { data } = await apiBackend.patch(`/v1/text/${id}`, body)
    dispatch(patchTextSuccess(data.data))
    // return data.data
  } catch (error) {
    dispatch(patchTextFailure(error.message))
  }
}
export const updateText = (body) => async (dispatch) => {
  try {
    dispatch(patchTextStart())
    // console.log(body)
    const { data } = await apiBackend.put(`/v1/text/${body.id}`, body)
    dispatch(patchTextSuccess(data.data))
    // return data.data
  } catch (error) {
    dispatch(patchTextFailure(error.message))
  }
}
export const updateTextLocal = (body) => async (dispatch) => {
  try {
    // console.log('pressets', body)
    dispatch(patchTextLocal(body))
  } catch (error) {
    dispatch(patchTextFailure(error.message))
  }
}
// Modificar un color especifico de una lista de colores
export const deleteText = (id) => async (dispatch) => {
  try {
    dispatch(deleteTextStart())
    const { data } = await apiBackend.delete(`/v1/text/${id}`)
    dispatch(deleteTextSuccess(data.data))
  } catch (error) {
    dispatch(deleteTextFailure(error.message))
  }
}
export const filterTextLocal = (presetId, id) => async (dispatch) => {
  const data = {
    id,
    presetId
  }
  try {
    // console.log('delete text local', presetId, id)

    dispatch(deleteTextLocal(data))
  } catch (error) {
    dispatch(deleteTextFailure(error.message))
  }
}

// / / / / / / / / / / / / / / / / / / / / / / / L A Y O U T  \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \
// Crear layout
export const addLayout = (id, layoutsAdded) => async (dispatch) => {
  const body = { value: layoutsAdded }
  try {
    dispatch(patchLayoutStart())
    const { data } = await apiBackend.patch(`/v1/layout/${id}`, body)
    dispatch(patchLayoutSuccess(data.data))
    // return data.data
  } catch (error) {
    dispatch(patchLayoutFailure(error.message))
  }
}

// Traer todos los layout por id del presset
export const getLayoutByPressetId = (id) => async (dispatch) => {
  try {
    dispatch(setLayoutStart())
    const { data } = await apiBackend.get(`/v1/layaout/all/${id}`)
    dispatch(setLayoutSuccess({ presetId: id, layout: data.data }))
  } catch (error) {
    dispatch(setLayoutFailure(error.message))
  }
}
// Traer todos los layout por id del presset
export const getLayoutBySharedPressetId = (id) => async (dispatch) => {
  try {
    dispatch(setSharedLayoutStart())
    const { data } = await apiBackend.get(`/v1/layaout/all/${id}`)
    dispatch(setSharedLayoutSuccess({ presetId: id, layout: data.data }))
  } catch (error) {
    dispatch(setSharedLayoutFailure(error.message))
  }
}
// Modificar un layout especifico de una lista de layouts
export const patchLayout = (id, body) => async (dispatch) => {
  try {
    dispatch(patchLayoutStart())
    const { data } = await apiBackend.patch(`/v1/layaout/${id}`, body)
    dispatch(patchLayoutSuccess(data.data))
    // return data.data
  } catch (error) {
    dispatch(patchLayoutFailure(error.message))
  }
}
// Modificar un color especifico de una lista de colores
export const deleteLayout = (id, body) => async (dispatch) => {
  // console.log('body delete layout', body)
  try {
    dispatch(deleteLayoutStart())
    const { data } = await apiBackend.delete(`/v1/layaout/${id}`, body)
    dispatch(deleteLayoutSuccess(data.data))
  } catch (error) {
    dispatch(deleteLayoutFailure(error.message))
  }
}
// Modificar un color especifico de una lista de colores
export const updateLayout = (id, layoutsFiltered) => async (dispatch) => {
  const body = { value: layoutsFiltered }
  try {
    dispatch(patchLayoutStart())
    const { data } = await apiBackend.patch(`/v1/layaout/${id}`, body)
    dispatch(patchLayoutSuccess(data.data))
    // console.log('respuesta back update layout', data.data)
  } catch (error) {
    dispatch(patchLayoutFailure(error.message))
  }
}
