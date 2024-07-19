import { createAsyncThunk } from '@reduxjs/toolkit'
import apiBackend from '@/utils/apiBackend'
import {
  setShowPageFunction,
  showFunctionId,
  setPageAuthorization,
  modifyPageAuthorization,
  selectPageAuthorization,
  clearSelectedFunction,
  selectedEvent,
  deletePageAuthorization,
  updateOffset,
  setOrderFunctions,
  setShowGroupFunction,
  showGroupId,
  setRunPageFunctions,
  updateExecutionResult,
  clearEjecutionResult
} from '@/slices/new/pageFunctionSlice'

export const executedResult = (body) => (dispatch) => {
  dispatch(updateExecutionResult(body))
}
// crear una funcion del panel de funciones en la db
export const createFunction = createAsyncThunk(
  'function/createFunction',
  async (func) => {
    try {
      const { data } = await apiBackend.post('/v1/function', func)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// actualizar offset en redux
export const updateOffsetAction = (prop) => (dispatch) => {
  // console.log('ESTA ES LA PORP', prop)
  const { name, value } = prop
  dispatch(updateOffset({ value, name }))
}

// traer todas las funciones de la db que pertenecen a un projecto
export const getAllFunctions = createAsyncThunk(
  'function/getAllFunctions',
  async (projectId) => {
    try {
      const { data } = await apiBackend.get(`/v1/function/all/${projectId}`)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const modifyOrderFunctions = (functions) => (dispatch) => {
  dispatch(setOrderFunctions(functions))
}

// Trae una funcion especifica por su id
export const getFunctionById = createAsyncThunk(
  'function/getFunctionById',
  async (functionId) => {
    try {
      const { data } = await apiBackend.get(`/v1/function/${functionId}`)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// booleano para mostrar o no el panel derecho de funciones
export const showPageFunction = (boolean) => (dispatch) => {
  dispatch(setShowPageFunction(boolean))
}

// booleano para mostrar o no el panel derecho de grupos
export const showGroupPanel = (boolean) => (dispatch) => {
  dispatch(setShowGroupFunction(boolean))
}

// seleccionar un grupo y mostrarlo en el panel derecho
export const setGroupId = (group) => (dispatch) => {
  dispatch(showGroupId(group))
}

// seleccionar una funcion y mostrarla en el panel derecho
export const showFunctionSelected = (func) => (dispatch) => {
  dispatch(showFunctionId(func))
}

// guardar los cambios de la funcion
export const saveFunctionSelected = createAsyncThunk(
  'function/saveFunctionSelected',
  async (data) => {
    const { body, functId } = data
    try {
      const { data } = await apiBackend.put(`/v1/function/${functId}`, body)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const updateFunction = createAsyncThunk(
  'function/updateFunction',
  async (data) => {
    const { id, body } = data
    try {
      const { data } = await apiBackend.put(`/v1/function/${id}`, body)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// // modificar el grupo de una funcion
// export const modifyFunctionGroup = createAsyncThunk(
//   'function/modifyFunctionGroup',
//   async (data) => {
//     const { group, functId } = data
//     try {
//       const { data } = await apiBackend.put(`/v1/function/${functId}`, {
//         group
//       })
//       return data.data
//     } catch (error) {
//       throw new Error(error)
//     }
//   }
// )

// borrar una funcion determinada
export const deleteFunctionById = createAsyncThunk(
  'function/deleteFunctionById',
  async (functId) => {
    try {
      const { data } = await apiBackend.delete(`/v1/function/${functId}`)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Folders anidadas
export const postFolder = createAsyncThunk(
  'folder/postFolderFunc',
  async (body) => {
    try {
      const res = await apiBackend.post('/v1/folderVar', body)
      return res.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getAllFolder = createAsyncThunk(
  'folder/getAllFolderFunc',
  async () => {
    try {
      const res = await apiBackend.get('/v1/folderVar/all?type=funciones')
      return res.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getAllFolderChildren = createAsyncThunk(
  'folder/getAllFolderChildrenFunc',
  async () => {
    try {
      const res = await apiBackend.get(
        '/v1/folderVar/allChildren?type=funciones'
      )
      return res.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getFolder = createAsyncThunk(
  'folder/getFolderFunc',
  async (id) => {
    try {
      const res = await apiBackend.get(`/v1/folderVar/${id}`)
      return res.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const deleteFolder = createAsyncThunk(
  'folder/deleteFolderFunc',
  async (id) => {
    try {
      const res = await apiBackend.delete(`/v1/folderVar/${id}`)
      return res.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const editFolder = createAsyncThunk(
  'folder/updateFolderFunc',
  async (editFolder) => {
    const { id, data } = editFolder
    try {
      const res = await apiBackend.put(`/v1/folderVar/${id}`, data)
      return res.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
// <--- Folders anidadas

// crear una autorizacion de pagina en el estado global
export const pushPageAuthorization = (auth) => (dispatch) => {
  dispatch(setPageAuthorization(auth))
}

// seleccionar una autorizacion determinada por su id
export const showPageAuthorization = (auth) => (dispatch) => {
  dispatch(selectPageAuthorization(auth))
}

// editar una autorizacion determinada por su id
export const putPageAuthorization = (auth) => (dispatch) => {
  dispatch(modifyPageAuthorization(auth))
}

// eleminar una autorizacion determinada por su id
export const deleteSelectedPageAuthorization = (auth) => (dispatch) => {
  dispatch(deletePageAuthorization(auth))
}

// para correr las funciones de la pagina
export const setRunFunction = (func) => (dispatch) => {
  dispatch(setRunPageFunctions(func))
}

export const clearLocalSelectedFunction = () => (dispatch) => {
  dispatch(clearSelectedFunction())
}

export const runEvents = (func) => (dispatch) => {
  dispatch(setRunPageFunctions(func))
}

export const events = (func) => (dispatch) => {
  dispatch(selectedEvent(func))
}

export const setClearEjecutionResult = () => (dispatch) =>
  dispatch(clearEjecutionResult())
