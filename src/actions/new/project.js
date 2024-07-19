/* eslint-disable no-redeclare */
/* global localStorage */
import apiBackend from '@/utils/apiBackend'
import {
  createNewPage,
  createNewComponent,
  cleanTarget,
  actionZoom,
  sliceScaleChange,
  addFilesToNavBar,
  removeError,
  removeFileToNavBar,
  setSelectedFile,
  setEditor3d,
  deleteProjectLocal,
  setProjectSelected,
  addFilesScreenSplit,
  setDescription,
  // deleteFavourite,
  // setFavourite,
  setRating,
  setUserRating,
  cleanNavBar2
} from '@/slices/new/projectSlice'

import { createAsyncThunk } from '@reduxjs/toolkit'
function buildQueryString(params) {
  return Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    )
    .join('&')
}
// http://localhost:4002/api/v1/project/getbyworkspace/f540f39d-7afc-409a-9831-eb4506d2188c endpoint para traer los proyectos por id de workspace

// http://localhost:4002/api/v1/component/all/

// http://localhost:4002/api/v1/page/all/d15e480e-e817-4175-a3a6-3681684f2b51

// Acción para eliminar un componente
export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (projectId, { dispatch }) => {
    // console.log('on deleteProject action, removing project: ', projectId)
    try {
      dispatch(deleteProjectLocal(projectId))
      const { data } = await apiBackend.delete(`/v1/project/${projectId}`)

      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Acción para éxito en la eliminación del proyecte
export const deleteProjectSuccess = (proyectId) => ({
  type: 'project/deleteProjectSuccess',
  payload: proyectId
})

// Acción para fallo en la eliminación del componente
export const deleteProjectFailure = (error) => ({
  type: 'project/deleteProjectFailure',
  payload: error
})

// Acción para actualizar un proyecto
export const updateProject = createAsyncThunk(
  // console.log('entro'),
  'project/updateProject',

  async ({ projectId, body }) => {
    console.log(projectId, body)
    try {
      const { data } = await apiBackend.patch(`/v1/project/${projectId}`, body)

      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const updateProyectSelect = (id, updateData) => async (dispatch) => {
  try {
    const { data } = await apiBackend.patch(`/v1/project/${id}`, updateData)
    dispatch(setProjectSelected(data.data))
  } catch (error) {
    throw new Error(error)
  }
}

export const getProject = createAsyncThunk('project/getProject', async (id) => {
  id = id || localStorage.getItem('projectid')
  try {
    const { data } = await apiBackend.get(`/v1/project/${id}`)

    return data.data
  } catch (error) {
    throw new Error(error)
  }
})
export const getProjectById = createAsyncThunk(
  'project/getProjectById',
  async (id) => {
    try {
      const { data } = await apiBackend.get(`/v1/project/${id}`)

      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
export const getSharedProject = createAsyncThunk(
  'project/getSharedProject',
  async (id) => {
    try {
      const { data } = await apiBackend.get(`/v1/project/shared/${id}`)

      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
export const shareProjectById = createAsyncThunk(
  'project/shareProjectById',
  async ({ body, user }) => {
    try {
      const { data } = await apiBackend.post('/v1/project/setuser', body)

      return { data, user }
    } catch (error) {
      throw new Error(error)
    }
  }
)
export const changeUserRol = createAsyncThunk(
  'project/changeUserRol',
  async (body) => {
    try {
      const { data } = await apiBackend.put('/v1/project/change-rol', body)

      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
export const removeUserFromProject = createAsyncThunk(
  'project/removeUserFromProject',
  async (body) => {
    const query = buildQueryString({ ...body })
    try {
      const { data } = await apiBackend.delete(
        `/v1/project/delete-user?${query}`
      )
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const createComponent = createAsyncThunk(
  'component/createComponent',
  async ({ id, name, isPage }, { dispatch }) => {
    try {
      const { data } = await apiBackend.post(
        `/v1/component/${id}?isPage=${isPage}`,
        {
          name
        }
      )

      if (isPage) {
        dispatch(createNewPage(data.data))
      } else {
        dispatch(createNewComponent(data.data))
      }

      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getProjectsByWorkspaceId = createAsyncThunk(
  'project/getProjectsByWorkspaceId',
  async (workspaceid) => {
    try {
      const { data } = await apiBackend.get(
        `/v1/project/getbyworkspace/${workspaceid}`
      )

      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const createProject = createAsyncThunk(
  'project/createProject',
  async ({ workSpaceId, role, name }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log('esto es user ==>', user)
    const newProject = {
      userToolId: user.user.id,
      workSpaceId,
      role: role || 'Owner',
      name: name || 'New project',
      collaborator: 'WORKSPACE'
    }
    try {
      const { data } = await apiBackend.post('/v1/project', newProject)
      console.log(data.data)
      return data.data
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Si existe un mensaje de error personalizado en la respuesta del servidor
        throw new Error(error.response.data.message)
      } else {
        // Si no hay mensaje de error personalizado, puedes lanzar el error original
        throw error
      }
    }
  }
)

export const deleteComponent = createAsyncThunk(
  'project/deleteComponent',
  async (componentId) => {
    try {
      await apiBackend.delete(`/v1/component/${componentId}`)
      const { data } = await apiBackend.get(
        `/template/${localStorage.getItem('projectid')}`
      )
      return data.template
    } catch (error) {
      throw new Error(error.message)
    }
  }
)

export const getTarget = createAsyncThunk('project/getTarget', async (id) => {
  try {
    const componentId = id || localStorage.getItem('componentId')

    const { data } = await apiBackend(`/v1/component/${componentId}`)

    id && localStorage.setItem('componentId', id)
    return data.component
  } catch (error) {
    throw new Error(error)
  }
})

export const cleanTargetAction = () => async (dispatch) => {
  try {
    dispatch(cleanTarget({}))
  } catch (error) {
    throw new Error(error)
  }
}

export const editOrCreateClassProperties = createAsyncThunk(
  'project/editOrCreateClassProperties',
  async (id, classProperties) => {
    try {
      const { data } = await apiBackend.post(
        `/v1/classes/${id}`,
        classProperties
      )

      return data.template
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const deleteClassProperties = createAsyncThunk(
  'project/deleteClassProperties',
  async (id, classProperties) => {
    try {
      const { data } = await apiBackend.patch(
        `/v1/classes/delete/${id}`,
        classProperties
      )
      return data.template
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const addCommandToAssistant = createAsyncThunk(
  'project/addCommandToAssistant',
  async (body) => {
    try {
      const { code, selected, position, id } = body
      if (!code || !id || (!selected && !position)) {
        throw Error('Missing Data')
      }

      const { data } = await apiBackend.post(
        '/v1/openai/chatWithCursorPosition',
        {
          prompt: { code, selected, position },
          id
        }
      )
      const content = JSON.parse(data.data.content)
      if (!content.Code || !content.Action) {
        throw Error('Error returning JSON')
      }
      return { content, id: data.id }
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const updateDomainUrl = createAsyncThunk(
  'project/updateDomainUrl',
  async ({ id, newDomain }) => {
    try {
      const { data } = await apiBackend.patch(`/v1/project/${id}/url`, {
        newDomain
      })
      return data.data.domain
    } catch (error) {
      throw new Error(error)
    }
  }
)

// agregar files a la topbar
export const addFileTopBar = createAsyncThunk(
  'project/topbar',
  async (body) => {
    const { file, id } = body
    // console.log(id, file)
    try {
      const { data } = await apiBackend.post(`/v1/project/${id}/topbar`, {
        file
      })
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// eliminar un file de la topbar
export const deleteFileTopBar = createAsyncThunk(
  'project/deletetopbar',
  async (body) => {
    const { idFile, id } = body
    console.log(idFile, id, 'voy a borrar este')
    try {
      const { data } = await apiBackend.delete(
        `/v1/project/${id}/topbar/${idFile}`
      )
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// traer los files de la topbar
export const getFilesTopBar = createAsyncThunk(
  'project/gettopbar',
  async (id) => {
    try {
      const { data } = await apiBackend.get(`/v1/project/${id}/topbar`)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// eliminar todos los files del topbar

export const deleteAllTopBar = createAsyncThunk(
  'project/deleteAllTopBar',

  async (body) => {
    const { id, projects } = body
    console.log(projects, ' here the body')
    try {
      const { data } = await apiBackend.delete(`/v1/project/${id}/topbar`, {
        data: { projects }
      })
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const putUserToProjectByInviteToken = createAsyncThunk(
  'project/putUserToProjectByInviteToken',
  async ({ inviteToken, userEmail }) => {
    console.log('entro a dispatcj ==>', { inviteToken, userEmail })
    try {
      const { data } = await apiBackend.get(
        `/v1/inviteToken/${inviteToken}/${userEmail}`
      )
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const zoomAction = (value) => (dispatch) => {
  dispatch(actionZoom(value))
}

export const scaleChangeAction = (value) => (dispatch) => {
  dispatch(sliceScaleChange(value))
}

export const addFilesToNavBarAction = (file) => (dispatch) => {
  dispatch(addFilesToNavBar(file))
}

export const removeFileToNavBarAction = (id) => (dispatch) => {
  dispatch(removeFileToNavBar(id))
}
export const clearError = () => (dispatch) => {
  dispatch(removeError())
}

export const selectedFileAction = (file) => (dispatch) => {
  dispatch(setSelectedFile(file))
}
export const selectedFileWidthAction = (file, width, height) => (dispatch) => {
  dispatch(setSelectedFile({ ...file, width, height }))
}

/* ========== Editor 3D =========== */
export const setEditor3dAction = () => (dispatch) => {
  dispatch(setEditor3d())
}

// export const getGeometry = createAsyncThunk(
//   'project/updateDomainUrl',
//   async ({ id }) => {
//     try {
//       const { response } = await apiBackend.get(`/api/v1/geometry/${id}`)
//       console.log('esto es data', response)
//       return response.data
//     } catch (error) {
//       throw new Error(error)
//     }
//   }
// )

// AGREGAR FILES AL ESTADO filesScreenSplit

export const addFilesScreenSplitAction = (file) => (dispatch) => {
  dispatch(addFilesScreenSplit(file))
}

export const firstSharedRender = createAsyncThunk(
  'project/firstSharedRender',
  async ({ id, type }) => {
    try {
      if (type === 'page') {
        const { data } = await apiBackend.get(`/v1/page/${id}`)
        return data.data.page
      }
      if (type === 'space') {
        const { data } = await apiBackend.get(`/v1/space/${id}`)
        return data.data
      }
      if (type === 'component') {
        // FALTA UN GETCOMPONENT
      }
    } catch (error) {
      throw new Error(error)
    }
  }
)
// -------------------ADD USERS EN PROJECTS----------------------- //
export const addUserIntoShareProject = createAsyncThunk(
  'project/addUserToShare',
  async ({ newArray, projectId }) => {
    // console.log(array, 'estoy en el actionnnn')
    try {
      // http://localhost:4000/api/
      // https://api-web3.aythen/api/
      const { data } = await apiBackend.post(
        `v1/project/share/${projectId}`,
        newArray
      )
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getUserOfProject = createAsyncThunk(
  'project/getUsersProyect',
  async (id) => {
    try {
      const { data } = await apiBackend.get(`/v1/project/share/${id}`)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const deleteUserFromProject = createAsyncThunk(
  'project/deleteUserFromProject',
  // le paso projectId y el id del usuario a eliminar
  async (info) => {
    // console.log(body.userId, body.projectId, 'projectId y id')
    try {
      const { data } = await apiBackend.delete(
        `/v1/project/share/${info.projectId}?userId=${info.userId}`
      )
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
/* ============================= INVITED EXTERNAL PEOPLE TO PROJECT============================= */
export const getUserToInvite = createAsyncThunk(
  'send/inviteToProject',
  async (body) => {
    console.log(body, 'llegue al action')
    try {
      // la ruta "mail-project-invite" me lleva al archivo "mail-project-invite.js"
      const { data } = await apiBackend.post(
        '/v1/send/mail-project-invite',
        body
      )
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
/* ============================= INVITED EXTERNAL PEOPLE TO WORKSPACE============================= */
export const getUserToInviteWorkspace = createAsyncThunk(
  'workspace/setuser',
  async (body) => {
    try {
      // la ruta "mail-invite" me lleva al archivo "mail-invite-workspace.js"
      const { data } = await apiBackend.post('/v1/send/mail-invite', body)
      console.log(data.data)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
// invitacion por link
export const getLinkToInvite = createAsyncThunk(
  'send/link-invite',
  async (body) => {
    try {
      console.log(body, 'todo el body')
      const { data } = await apiBackend.post('v1/send/link-invite', body)
      console.log(data.data)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

/* ============================= RATING PROJECT ============================= */
export const rateProject = createAsyncThunk(
  'project/deleteUserFromProject',
  async (projectId, userId, rating) => async (dispatch) => {
    try {
      const { data } = await apiBackend.post('/v1/rate-project', {
        projectId,
        userId,
        rating
      })
      dispatch(setUserRating(data.data))
    } catch (error) {
      console.log(error)
    }
  }
)

// esto es para traer el rating general del proyecto
export const getProjectRating = (projectId) => async (dispatch) => {
  try {
    const { data } = await apiBackend.get(
      `/v1/rate-project/average/${projectId}`
    )
    dispatch(setRating(data.data))
  } catch (error) {
    console.log(error)
  }
}

export const updateRating = (ratingId, rating) => async (dispatch) => {
  try {
    const { data } = await apiBackend.patch(
      `/v1/rate-project/${ratingId}`,
      rating
    )
    dispatch(setUserRating(data.data))
  } catch (error) {
    console.log(error)
  }
}

export const getProjectRatingByUser =
  (userId, projectId) => async (dispatch) => {
    try {
      const { data } = await apiBackend.get(
        `/v1/rate-project/?userId=${userId}&projectId=${projectId}`
      )
      dispatch(setUserRating(data.data[0]))
    } catch (error) {
      console.log(error)
    }
  }

/* ============================= FAVORITE PROJECT ============================= */
export const addFavorite = createAsyncThunk(
  'projects/addFavorite',
  async ({ projectId, UserToolId }) => {
    try {
      const { data } = await apiBackend.post('/v1/favourite-project', {
        projectId,
        UserToolId
      })
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const deleteFavorite = createAsyncThunk(
  'project/deleteFavorite',
  async ({ projectId, UserToolId }) => {
    try {
      const { data } = apiBackend.delete('/v1/favourite-project', {
        params: { projectId, UserToolId }
      })
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getFavoritesByUser = createAsyncThunk(
  'project/getFavoritesByUser',
  async (userId) => {
    try {
      const { data } = await apiBackend.get(`/v1/favourite-project/${userId}`)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

/* ============================= DESCRIPTION PROJECT ============================= */
export const setProjectDescription = (projectId) => async (dispatch) => {
  try {
    const { data } = await apiBackend.get(
      `/v1/project-description/${projectId}`
    )
    if (!data.data.length) {
      const newDescription = {
        projectId
      }
      await apiBackend.post('/v1/project-description/', newDescription)
      dispatch(setDescription(data.data))
    }
    dispatch(setDescription(data.data[0]))
  } catch (error) {
    console.log(error)
  }
}

export const updateDescription = (id, description) => async (dispatch) => {
  try {
    const { data } = await apiBackend.patch(`/v1/project-description/${id}`, {
      description
    })
    dispatch(setDescription(data.data))
  } catch (error) {
    console.log(error)
  }
}

// title
export const updateTitle = (id, title) => async (dispatch) => {
  try {
    const { data } = await apiBackend.patch(
      `/v1/project-description/title/${id}`,
      {
        title
      }
    )
    dispatch(setDescription(data.data))
  } catch (error) {
    console.log(error)
  }
}

export const getAllTokenFromProjectId = createAsyncThunk(
  'project/getAllTokenFromProjectId',
  async (workspaceId) => {
    try {
      const { data } = await apiBackend.get(
        `/v1/inviteToken/allFromProjectId/${workspaceId}`
      )
      return data.data
    } catch (error) {
      throw new Error(error.message)
    }
  }
)

export const patchTokenFromProjectId = createAsyncThunk(
  'project/patchTokenFromProjectId',
  async ({ tokenId, body }) => {
    try {
      const { data } = await apiBackend.patch(
        `/v1/inviteToken/${tokenId}`,
        body
      )
      console.log(data.data)
      return data.data
    } catch (error) {
      throw new Error(error.message)
    }
  }
)

export const createUserProject = createAsyncThunk(
  'project/createUserProject',
  async ({ projectId, userToolId }) => {
    try {
      const { data } = await apiBackend.post(
        `/v1/project/userproject/${projectId}`,
        { userToolId }
      )
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getUserProjectByProjectId = createAsyncThunk(
  'project/getUserProjectByProjectId',
  async (projectId) => {
    try {
      const { data } = await apiBackend.get(
        `/v1/project/userproject/${projectId}`
      )
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const getProjectOwnerByUserId = createAsyncThunk(
  'project/getProjectOwnerByUserId',
  async (id) => {
    try {
      const { data } = await apiBackend(`/v1/user/${id}`)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const updateImageProject = createAsyncThunk(
  'project/updateImageProject',
  async ({ body, projectId }) => {
    try {
      const { data } = await apiBackend.patch(
        `/v1/project/${projectId}/image`,
        body,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const cleanTopBar = () => (dispatch) => {
  dispatch(cleanNavBar2)
}
