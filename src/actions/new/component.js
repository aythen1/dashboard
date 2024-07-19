import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  setAllComponentsForSpaces,
  setSelectedComponent,
  resetAndSetComponentsSelected,
  setEditingId,
  updatePositionComponent,
  updatePositionComponentSelected,
  updateSizeComponent,
  updateAnyProperty,
  setCleanComponent,
  setPartenId,
  setElementTag,
  allComponentsUpdate,
  updateFontSizeComponent,
  setComponentsSelected,
  addComponentToTreeOrder,
  cleanComponentsSelected,
  addPropagatedComponents,
  cleanPropagateComponents,
  updateComponentsSettingsStatus,
  contextCopy,
  contextSelectParent,
  setCommentsValue,
  setReparentHoverComponent,
  updatePositionChildrenComponent,
  setLocalProperty,
  setModeDrag,
  setContextMenuOpen,
  getVisualComponent,
  // getAllComponentsSlice,
  getAllComponentsLocal,
  setGroupReparentRedux,
  setReparentElementToPage,
  setContextComponent,
  setDevopsHookConection,
  setUpdatePositionRedux,
  updatePositionComponentWithChildren,
  setGuideLinesReparentProps,
  attributesUpdate,
  changeAdvancedActiveRedux
} from '@/slices/new/componentSlice'
import { setAllBreakpoints } from '@/slices/new/breakpointsSlice'
// import { updateComponentPropertyRecursive } from '../auxFunctions/editComponentAuxFunctions'

import { cleanTarget } from '@/slices/new/projectSlice'

import {
  findComponentByIdRecursive,
  // findComponentById,
  obtenerComponentesRecursivamente,
  findComponentsByIdRecursive
} from '@/slices/new/auxFunctions/componentAuxFunctions'
import apiBackend from '@/utils/apiBackend'

// const urlBackend =
//   process.env.NEXT_PUBLIC_API_BACKEND || 'https://api-web2.aythen.com/api'


// actions nuevas de advanced(right panel)

export const advancedChangeActiveRedux = (allComponents, element, device, property, boolean, minOrMax, space) => (dispatch) => {

  dispatch(changeAdvancedActiveRedux({allComponents, element, device, property, boolean, minOrMax, space}))
}

export const setComments = (value) => (dispatch) => {
  try {
    // Llama a setCommentsValue con el valor deseado (true o false)
    dispatch(setCommentsValue(value))
  } catch (error) {
    console.error('Error al ejecutar setCommentsValue:', error)
  }
}

export const setContextMenu = (value) => (dispatch) => {
  try {
    // Llama a setCommentsValue con el valor deseado (true o false)
    dispatch(setContextMenuOpen(value))
  } catch (error) {
    console.error('Error al ejecutar setContextMenuOpen:', error)
  }
}

export const addMultipleComponentSelected =
  (components) => async (dispatch) => {
    try {
      dispatch(resetAndSetComponentsSelected(components))
    } catch (error) {
      throw new Error(error)
    }
  }

export const deletedMultipleComponents = (componentsId) => async (dispatch) => {
  const targetId = localStorage.getItem('componentId')
  try {
    const { data } = await apiBackend.patch(
      `/v1/component/multipleComponentsDeleted/${targetId}`,
      {
        componentsId
      }
    )

    dispatch(cleanTarget(data.component))
  } catch (error) {
    throw new Error(error)
  }
}

export const getParentId = (idChildren) => async (dispatch) => {
  try {
    const { data } = await apiBackend.get('/v1/component/getParentId', {
      params: { idChildren }
    })

    dispatch(getComponentSelected(data.parentId))
  } catch (error) {
    throw new Error(error)
  }
}

export const setEditingIdAction = (id) => async (dispatch) => {
  try {
    dispatch(setEditingId(id))
  } catch (error) {
    throw new Error(error)
  }
}
export const changeLevelComponents =
  (dropedComponentId, dragComponentId, position) => async (dispatch) => {
    try {
      const targetId = localStorage.getItem('componentId')
      const { data } = await apiBackend.post(
        `/v1/component/changeParent/${targetId}`,
        {
          dropedComponentId,
          dragComponentId,
          position
        }
      )
      dispatch(cleanTarget(data.component))
    } catch (error) {
      throw new Error(error)
    }
  }

// / / / / / / / / / / / / / / / / / / / N U E V O B A C K E N D \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \

// Updatea una Property por id de componente
export const updateProperty = createAsyncThunk(
  'component/updateProperty',
  async ({ property, id }) => {
    try {
      const { data } = await apiBackend.put(`/v1/property/${id}`, property)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
export const updateDataProperty = createAsyncThunk(
  'component/updateProperty',
  async ({ id, body }) => {
    try {
      const { data } = await apiBackend.put(`/v1/component/data/${id}`, body)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
export const replaceDataProperty = createAsyncThunk(
  'component/updateProperty',
  async ({ id, body }) => {
    try {
      const { data } = await apiBackend.put(
        `/v1/component/dataReplace/${id}`,
        body
      )
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
// Updatea una Property por id de componente
export const updatePropertyBody = createAsyncThunk(
  'component/updatePropertyBody',
  async ({ property, id }) => {
    try {
      const { data } = await apiBackend.put(`/v1/property/${id}`, property)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
export const updateLocalProperty = (property) => (dispatch) => {
  dispatch(setLocalProperty(property))
}
export const createComponent = createAsyncThunk(
  'component/createComponent',
  async ({ component, page, space, editor, type, dispatch }) => {
    // console.log({ component, page, space, dispatch }, 'se ejecuta')
    try {
      const { data } = await apiBackend.post('/v1/component/', component)

      // REVISAR ESTO NO DEBERIA SER ASI
      // caso single Page
      if (type === 'singlePage') {
        // console.log({ component: data.data, page })
        // dispatch(getAllComponentsV6(page.id))
        return { component: data.data, page, editor, type }
        // caso multiplePage
      } else if (type === 'multiplePage') {
        console.log(page,'que tiene')
        // dispatch(getAllComponentsV6({id: page.id, dispatch}))
        return { component: data.data, page, space, type }

        // caso components in space
      } else if (!page && space) {
        return { compopnent: data.data, space }
        // caso components sueltos en singlePage
      } else if (!page && !space) {
        return { component: data.data }
      }
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Crear un componente a partir de otro
export const cloneComponent = createAsyncThunk(
  'component/cloneComponent',
  async (id) => {
    try {
      const { data } = await apiBackend.post(`/v1/component/${id}`)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Obtener los estilos de otro componente, se requiere el ID de ese componente
export const copyStyles = createAsyncThunk(
  'component/copyStyles',
  async (id) => {
    try {
      const { data } = await apiBackend.get(`/v1/component/copystyles/${id}`)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Borrar un componente
export const deleteComponent = createAsyncThunk(
  'component/deleteComponent',
  async (id) => {
    try {
      const { data } = await apiBackend.patch(`/v1/component/${id}`)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Eliminar un conjunto de componentes
export const deleteComponentsGroup = createAsyncThunk(
  'component/deleteComponentsGroup',
  async (toDelete) => {
    try {
      const { data } = await apiBackend.delete('/v1/component/', toDelete)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)
export const getAllComponentsForSpaces = (id) => async (dispatch) => {
  try {
    const response = await apiBackend.get(`/v1/component/allv6/${id}`)
    const data = response.data.data
    dispatch(setAllComponentsForSpaces(data))
  } catch (error) {
    throw new Error(error)
  }
}

export const getAllComponentsV6 = createAsyncThunk(
  'component/getAllComponentsV6',
  async ({ id, order, dispatch }) => {
    try {
      // order es para el tema del nivel, a la hora de pedir los elements
      if (!order) {
        const { data } = await apiBackend.get(`/v1/component/allv6/${id}`)
        dispatch(setAllBreakpoints(data.data.Property.style))
        return data.data
      } else {
        const { data } = await apiBackend.get(
          `/v1/component/allv6/${id}?order=${order}`
        )
        dispatch(setAllBreakpoints(data.data.Property.style))
        return data.data
      }
      // const { data } = await apiBackend.get(
      //   `/v1/component/allv6/${id}?order=${order}`
      // )
      // console.log(data.data, 'se ejecuta?')
      // dispatch(setAllBreakpoints(data.data.Property.style))
      // return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// export const getAllComponents = (id) => (dispatch) => {
//   try {
//     const source = new EventSource(`${urlBackend}/v1/component/all/${id}`)

//     source.onmessage = (event) => {
//       const component = JSON.parse(event.data)
//       // Despacha una acción con el componente recibido

//       if (component && component.tag === 'body') {
//         dispatch(setAllBreakpoints(component.Property.style))
//       }

//       dispatch(getAllComponentsSlice(component))
//     }
//     source.onerror = (event) => {
//       console.error('Error en EventSource', event)
//       source.close()
//     }

//     source.addEventListener(
//       'end',
//       (event) => {
//         source.close()
//       },
//       false
//     )
//   } catch (error) {
//     throw new Error(error)
//   }
// }

// Obtener todos los componentes de una PAGE con el ID de esa misma PAGE

export const getAllComponentLoc = (newFile) => (dispatch) => {
  try {
    dispatch(getAllComponentsLocal(newFile))
  } catch (error) {
    console.error('Ha ocurrido un error ', error)
  }
}

// obtener todos los bodies de un space
export const getAllBodies = createAsyncThunk(
  'components/getAllBodies',
  async ({id, dispatch}) => {
    try {
      const { data } = await apiBackend.get(`/v1/component/allBodies/${id}`)
      dispatch(setAllBreakpoints(data.data[0].Property.style))
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// obtener todos los componentes de un space
export const getAllComponentsBySpace = createAsyncThunk(
  'components/getAllComponentsBySpace',
  async (id) => {
    try {
      const { data } = await apiBackend.get(
        `/v1/component/allComponentsBySpace/${id}`
      )
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// obtener todos los componentes de un project y una page(componentes sueltos por fuera de la page en singlePage)
export const getAllComponentsByProject = createAsyncThunk(
  'components/getAllComponentsByProject',
  async ({ pageId, projectId }) => {
    try {
      const { data } = await apiBackend.get(
        `/v1/component/allComponentsByProject?pageId=${pageId}&projectId=${projectId}`
      )
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Obtener el componente por ID propio
export const updateComponentStatus = (id, propertyName) => (dispatch) => {
  try {
    dispatch(updateComponentsSettingsStatus({ id, propertyName }))
  } catch (error) {
    throw new Error(error)
  }
}
// Obtener el componente por ID propio
export const updatePropertyInAllComponent =
  ({ targetId, allComponents, device, selectedProperty, newValue }) =>
  (dispatch) => {
    try {
      // const updatedAllComponents = updateComponentPropertyRecursive({
      //   targetId,
      //   allComponents,
      //   device,
      //   selectedProperty,
      //   newValue
      // })
      dispatch(updateComponentsSettingsStatus())
    } catch (error) {
      throw new Error(error)
    }
  }

// Obtener el componente por ID propio
export const swapToAnotherComponent =
  (targetId, allComponents) => (dispatch) => {
    console.log('trying to swap to: ', targetId)
    console.log('allComponents: ', allComponents)
    function searchById(id, structure) {
      if (structure.id === id) {
        return structure // Return the object if the ID is found
      }

      if (structure.children) {
        // If there are children, recursively search in each child
        for (const child of structure.children) {
          const result = searchById(id, child)
          if (result) {
            return result // Return the result if found in the children
          }
        }
      }

      // Return null if the ID is not found in the current structure or its children
      return null
    }
    const foundComponent = searchById(targetId, allComponents)
    if (foundComponent) dispatch(setSelectedComponent(foundComponent))
  }
export const getComponentSelected =
  (id, allComponents, type, pageId) => (dispatch) => {
    console.log({ id, tagName: allComponents?.tagName, type})
    if (!id && !allComponents && !type && !pageId) {
      dispatch(setCleanComponent())
    } else {
      try {
        if (type === 'singlePage') {
          const foundComponent = findComponentByIdRecursive(
            id,
            allComponents,
            type
          )
          if (foundComponent) {
            dispatch(setSelectedComponent(foundComponent))
            return foundComponent
          }
        } else if (type === 'multiplePage') {
          
          const rootObj = allComponents.find((e) => e.pageId === pageId)
          const foundComponent = findComponentByIdRecursive(
            id,
            rootObj,
            type
          )
          dispatch(setSelectedComponent(foundComponent))
          return foundComponent
        } else if (
          type === 'allSpaceComponents' ||
          type === 'allProjectComponents'
        ) {
          const foundComponent = findComponentByIdRecursive(
            id,
            allComponents,
            type
          )
          dispatch(setSelectedComponent(foundComponent))
          return foundComponent
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  }

// actualizar posicion de componente sin children al soltarlo
export const updateComponentPosition =
  (allComponents, id, newX, newY, type, screen) => (dispatch) => {
    dispatch(
      updatePositionComponent({
        allComponents,
        id,
        newX,
        newY,
        type,
        screen
      })
    )
  }

// actualizar posición de componente con children al soltarlo
export const updateComponentWithChildrenPosition =
  (allComponents, id, newPosition, oldFatherPosition, newParentId, screen, type) =>
  (dispatch) => {
    dispatch(
      updatePositionComponentWithChildren({
        allComponents,
        id,
        newPosition,
        oldFatherPosition,
        newParentId,
        screen,
        type
      })
    )
  }

// actualizar posicion de componente al soltarlo
export const updateComponentSelectedPosition =
  (allComponents, id, newX, newY, parentId, type) => (dispatch) => {
    dispatch(
      updatePositionComponentSelected({
        allComponents,
        id,
        newX,
        newY
      })
    )
  }

// actualizar position de todos los children de un component

export const updateChildrenComponentPosition =
  (p, newAllChildren) => (dispatch) => {
    dispatch(updatePositionChildrenComponent({ p, newAllChildren }))
  }

// actualizar tamaño del componente al soltarlo
export const updateComponentSize =
  (allComponents, id, newWidth, newHeight, parentId, p, newX, newY, space, type) =>
  (dispatch) => {
    dispatch(
      updateSizeComponent({
        allComponents,
        id,
        newWidth,
        newHeight,
        parentId,
        p,
        newX,
        newY,
        space,
        type
      })
    )
  }
// actualizar cualquier property en un device
export const updateComponentProperty =
  (allComponents, id, device, property, value, parentId, page, active) =>
  (dispatch) => {
    // console.log('action', property, value, active)
    dispatch(
      updateAnyProperty({
        allComponents,
        id,
        device,
        property,
        value,
        parentId,
        page,
        active
      })
    )
  }

// Modificar un atributo especifico de un componente
export const patchProperty = createAsyncThunk(
  'component/patchProperty',
  async ({ id, body }) => {
    try {
      const { data } = await apiBackend.patch(`/v1/property/${id}`, body)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// actualizar tamaño de la fuente
export const updateComponentFontSize = (id, newFontSize) => (dispatch) => {
  dispatch(updateFontSizeComponent({ id, newFontSize }))
}

// actualizar estado con el nuevo component
export const updateAllComponents = (component) => (dispatch) => {
  dispatch(allComponentsUpdate(component))
}

// Modificar un atributo especifico de un componente
export const patchComponent = createAsyncThunk(
  'component/patchComponent',
  async ({ id, body, allComponents }) => {
    try {
      const { data } = await apiBackend.patch(`/v1/component/patch/${id}`, body)
      return { data: data.data, allComponents }
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Modificar mas de un atributo en un componente
export const updateComponent = createAsyncThunk(
  'component/updateComponent',
  async ({ id, component }) => {
    try {
      const { data } = await apiBackend.put(`/v1/component/${id}`, component)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const updatePropertieComponent = createAsyncThunk(
  'component/updatePropertieComponent',
  async ({ id, propertie }) => {
    try {
      // console.log({ id, propertie })
      const { data } = await apiBackend.patch(
        `/v1/component/patchGroup/${id}`,
        { propertie }
      )
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// action que actualiza x, y, w y h de un component
export const updateComponentProperties = createAsyncThunk(
  'component/updateComponentProperties',
  async ({ newProperties, ids, pageId, screen }) => {
    const newData = {
      newProperties,
      ids,
      pageId,
      screen
    }
    try {
      const { data } = await apiBackend.patch(
        '/v1/property/sizePosition',
        newData
      )
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

// Catchear el parentId
export const getParentIdComponent = (id) => (dispatch) => {
  dispatch(setPartenId(id))
}

// Catchear el elementTag
export const getElementTag = (tag) => (dispatch) => {
  dispatch(setElementTag(tag))
}

export const localReparentComponent =
  (allComponents, componentSelected, elementsUnderMouse) => (dispatch) => {
    // if(componentSelected.id === elementsUnderMouse[0].id){
    //   console.log(allComponents)
    //   const newParentComponent = findComponentById(allComponents, elementsUnderMouse[1].id)
    //   const oldParentId = componentSelected.parentId
    //   const oldParent = findComponentById(allComponents, oldParentId)
    //   oldParent.children = oldParent.children.filter(child => child.id !== componentSelected.id)
    //   componentSelected.parentId = newParentComponent.id
    //   newParentComponent.children.push(componentSelected)
    // }
    // dispatch()
  }

export const selectMultipleComponents =
  (component, componentsSelected, target) => (dispatch) => {
    const newSelectedComponents = [...componentsSelected]

    if (target.id) {
      if (!newSelectedComponents.some((element) => element.id === target.id)) {
        newSelectedComponents.push(target)
      }
    }

    const componentIndex = newSelectedComponents.findIndex(
      (element) => element.id === component.id
    )

    if (componentIndex !== -1) {
      newSelectedComponents.splice(componentIndex, 1)
    } else {
      newSelectedComponents.push(component)
    }

    dispatch(setComponentsSelected(newSelectedComponents))
  }
export const setSelectedsComponent = (component) => (dispatch) => {
  dispatch(setComponentsSelected(component))
}
export const setComponentSelected = (component, components) => (dispatch) => {
  if (typeof components === 'object') {
    const result = findComponentsByIdRecursive(component.id, components)
    dispatch(setComponentsSelected(result))
  } else {
    dispatch(setSelectedComponent(component))
  }
}

export const setComponentToOrder = (id) => (dispatch) => {
  dispatch(addComponentToTreeOrder(id))
}
export const setCleanComponentsSelected = () => (dispatch) => {
  dispatch(cleanComponentsSelected())
}

export const shiftSelectElementsTree =
  (treeOrderIds, affected, allSelected, allComponents) => (dispatch) => {
    // Obtén el índice del elemento afectado en el árbol ordenado
    const affectedIndex = treeOrderIds.indexOf(affected.id)

    if (affectedIndex !== -1) {
      // Encuentra el índice del último elemento seleccionado previamente
      const lastIndex =
        allSelected.length > 0
          ? treeOrderIds.indexOf(allSelected[allSelected.length - 1].id)
          : -1

      if (lastIndex !== -1) {
        // Determina el rango de elementos a seleccionar
        const startIndex = Math.min(affectedIndex, lastIndex)
        const endIndex = Math.max(affectedIndex, lastIndex)

        // Selecciona los elementos en el rango y actualiza la selección
        const selectedElements = treeOrderIds
          .slice(startIndex, endIndex + 1)
          .map((id) => {
            return allComponents.children.find(
              (component) => component.id === id
            )
          })

        dispatch(setComponentsSelected(selectedElements))
      } else {
        // Si no hay elementos seleccionados previamente, selecciona solo el elemento afectado
        dispatch(setComponentsSelected([affected]))
      }
    }
  }

export const setPropagateComponentsSelected =
  (componentsSelected, target) => (dispatch) => {
    if (componentsSelected.length < 1) {
      // Si no hay componentes seleccionados, simplemente agregamos el componente clicado
      dispatch(addPropagatedComponents([target]))
      return
    }
    if (componentsSelected[0].id !== target.id) {
      dispatch(addPropagatedComponents([target]))
    }

    const currentComponent = componentsSelected[componentsSelected.length - 1]

    // Llamamos a obtenerComponentesRecursivamente para obtener todos los componentes
    // bajo el componente actual y luego encontramos el siguiente componente en el orden
    // de recursión.
    const allComponents = obtenerComponentesRecursivamente(currentComponent, [])
    const currentIndex = allComponents.findIndex(
      (componente) => componente.id === currentComponent.id
    )

    if (currentIndex < allComponents.length - 1) {
      const nextComponent = allComponents[currentIndex + 1]
      dispatch(addPropagatedComponents([...componentsSelected, nextComponent]))
    }
  }

export const setCleanPropagateComponents = () => (dispatch) => {
  dispatch(cleanPropagateComponents())
}

// contextMenu
export const setContextCopy = (component) => (dispatch) => {
  dispatch(contextCopy(component))
}

// tengo q crear endpoint para pastear componentes y sus properties.
export const contextPaste = createAsyncThunk(
  'component/paste',
  async ({ copyComponents, copyProperties, screen, type, dispatch }) => {
    // console.log(copyComponents, copyProperties, 'los datos en la action')
    try {
      const { data } = await apiBackend.post('v1/component/paste', {
        copyComponents,
        copyProperties,
        screen
      })
      dispatch(getAllComponentsV6(copyComponents[0]?.pageId))
      return {
        newComponents: data.data.newComponents,
        type
      }
    } catch (error) {
      throw new Error(error)
    }
  }
)
// action que actualiza x, y, w y h de un component
// export const updateComponentProperties = createAsyncThunk(
//   'component/updateComponentProperties',
//   async ({ id, newData }) => {
//     try {
//       const { data } = await apiBackend.put(
//         `/v1/property/sizePosition/${id}`,
//         newData
//       )
//       return data.data
//     } catch (error) {
//       throw new Error(error)
//     }
//   }
// )
export const setContextDuplicate = createAsyncThunk(
  'component/duplicate',
  async ({ componentSelected }) => {
    try {
      // console.log('duplicate action')
      const { data } = await apiBackend.post('/v1/component/duplicate', {
        componentSelected
      })
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const setContextCut = createAsyncThunk(
  'component/cut',
  async ({ toDeletes, properties, allComponents, type }) => {
    // console.log(toDeletes, properties, allComponents, 'esta es la action')
    try {
      // console.log(array, 'entra a la action?')
      const { data } = await apiBackend.patch('/v1/component/', {
        toDeletes,
        properties
      })
      const deleteds = data.data
      return { deleteds, properties, allComponents, type }
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const setSelectParent =
  (contextComponent, allComponents) => (dispatch) => {
    const data = findComponentByIdRecursive(
      contextComponent.parentId,
      allComponents,
      null,
      'singlePage'
    )
    dispatch(contextSelectParent(data))
  }

export const setReparentHoverComponentAction = (array) => (dispatch) => {
  dispatch(setReparentHoverComponent(array))
}

export const groupComponents = createAsyncThunk(
  'component/groupComponents',
  async ({ componentIds, gridGroup }) => {
    // console.log(gridGroup, 'asdasd')
    try {
      const { data } = await apiBackend.post('/v1/component/group', {
        componentIds,
        gridGroup
      })
      return { data: data.data, componentIds }
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const unGroupComponents = createAsyncThunk(
  'components/ungroupComponent',
  async (groupId) => {
    try {
      const { data } = await apiBackend.patch('/v1/component/ungroup', {
        groupId
      })
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const contextDelete = createAsyncThunk(
  'components/contextDelete',
  async ({ toDeletes, properties, allComponents, type }) => {
    // console.log(toDeletes, 'arreglo de idsde components a eliminar')
    try {
      const { data } = await apiBackend.patch('/v1/component/', {
        toDeletes,
        properties
      })
      const deleteds = data.data
      console.log(deleteds)
      return { deleteds: toDeletes, properties, allComponents, type }
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const contextRename = createAsyncThunk(
  'components/contextRename',
  async ({ id, name, allComponents }) => {
    try {
      const { data } = await apiBackend.patch(`v1/component/patch/${id}`, {
        name
      })
      const obj = {
        data: data.data,
        allComponents
      }
      return obj
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const contextSpecialPaste = createAsyncThunk(
  'components/contextSpecialPaste',
  async ({ componentSelected, copy }) => {
    try {
      const { data } = await apiBackend.patch(
        `/v1/component/copyProperties/${componentSelected.id}`,
        { propertyId: copy.Property.id }
      )
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const contextHideComponent = createAsyncThunk(
  'components/contextHideComponent',
  async ({ toHides, properties, allComponents, type }) => {
    try {
      const { data } = await apiBackend.patch('/v1/component/isShowGroup', {
        toHides,
        properties
      })
      const hides = data.data
      return { hides, properties, allComponents, type }
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const updatePositionComponentTree = createAsyncThunk(
  'components/updatePositionComponentTree',
  async ({ ids, fatherId, newPositions, pageId, hasChildren, screen }) => {

    try {
      const { data } = await apiBackend.patch('/v1/property/positions', {
        ids,
        fatherId,
        newPositions,
        pageId,
        hasChildren,
        isAbsolute: true,
        screen
      })
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const updatePositionComponentTreeInSpace = createAsyncThunk(
  'components/updatePositionComponentTreeInSpace',
  async ({ ids, newPositions, spaceId }) => {
    try {
      const { data } = await apiBackend.patch('/v1/property/positions', {
        ids,
        newPositions,
        spaceId
      })
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const srcEditAction = createAsyncThunk(
  'components/srcEditAction',
  async ({ id, allComponents, src }) => {
    try {
      const { data } = await apiBackend.patch(`/v1/component/patch/${id}`, {
        src
      })
      return { component: data.data, allComponents, src: data.data.src }
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const groupReparent = createAsyncThunk(
  'components/groupReparent',
  async ({
    componentSelected,
    propertyId,
    componentUnderHover,
    allComponents,
    x,
    y,
    screen,
    bodyId,
    spaceReparent,
    pageReparent
  }) => {
    // console.log(x, y, 'entro a la funcion?')
    const newParentId = componentUnderHover
    const componentsId = componentSelected
    try {
      const { data } = await apiBackend.patch(
        `/v1/component/reparent/${newParentId}`,
        { componentsId, propertyId, screen, bodyId, spaceReparent, pageReparent }
      )
      // console.log(data.data, 'esto es lo que devuelve el group')
      return { data: data.data, allComponents, x, y }
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const groupReparentRedux =
  (
    componentSelected,
    componentUnderHover,
    spaceComponents,
    x,
    y,
    screen,
    bodyId,
    spaceReparent,
    type
  ) =>
  (dispatch) => {
    dispatch(
      setGroupReparentRedux(
        componentSelected,
        componentUnderHover,
        spaceComponents,
        x,
        y,
        screen,
        bodyId,
        spaceReparent,
        type
      )
    )
  }

 
export const reparentElementToPage = (
    componentSelected,
    componentUnderHover,
    allComponents,
    x,
    y,
    screen,
    bodyId,
) => (dispatch) => {
  dispatch(
    setReparentElementToPage(
      componentSelected,
      componentUnderHover,
      allComponents,
      x,
      y,
      screen,
      bodyId,
    )
  )
} 

export const setDragMode = (type) => (dispatch) => {
  dispatch(setModeDrag(type))
}

export const getVisualComponentAction = (id) => (dispatch) => {
  dispatch(getVisualComponent(id))
}

export const getContextComponent = (component) => (dispatch) => {
  dispatch(setContextComponent(component))
}

export const devopsHookConection = (data) => (dispatch) => {
  dispatch(setDevopsHookConection(data))
}

export const updateBackendAttributes = createAsyncThunk(
  'components/updateBackendAttribute',
  async ({ id, body }) => {
    try {
      const { data } = await apiBackend.patch(`/v1/property/${id}`, body)
      return data.data
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const updatePositionRedux = (data) => (dispatch) => {
  dispatch(setUpdatePositionRedux(data))
}

export const guideLinesReparentProps = (data) => (dispatch) => {
  dispatch(setGuideLinesReparentProps(data))
}

export const updateAttributes = (data) => (dispatch) => {
  dispatch(attributesUpdate(data))
}
