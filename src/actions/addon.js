// userActions.js
import apiBackend from '@/utils/apiBackend'
import { createAsyncThunk } from '@reduxjs/toolkit';


// Acción asincrónica
export const fetchsAddon =
  createAsyncThunk('addon/fetchsAddon',
    async (addonId, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.get(
          '/addon',
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        return resp.data;
      } catch (error) {
        throw error;
      }
    }
  );


export const fetchAddon =
  createAsyncThunk('addon/fetchAddon',
    async (id, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.get(
          `/addon/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        console.log('resp fetch addon', resp)


        return resp.data;
      } catch (error) {
        throw error;
      }
    }
  );




export const addAddon =
  createAsyncThunk('addon/addAddon',
    async (addon, { dispatch }) => {
      console.log('eee add adon', addon)
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.post(
          '/addon',
          { addon },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        console.log('respeeeee', resp)
        return resp.data;
      } catch (error) {
        throw error;
      }
    }
  );




  export const updateAddon =
  createAsyncThunk('addon/update',
    async (addon, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.put(
          '/addon',
          { addon },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        console.log('resp update addon', resp)

        return resp.data;
      } catch (error) {
        console.log('errorrr!!!', error)
        throw error;
      }
    }
  );


export const deleteAddon =
  createAsyncThunk('addon/delete',
    async (addonId, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.delete(
          `/addon`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          data: { id: addonId },  
        });

        return resp.data;
      } catch (error) {
        throw error;
      }
    }
  );


// function for select addons and components




// get vectores

export const fetchsMapAddon =
  createAsyncThunk('vector/fetchsMapAddon',
    async ({ id }) => {

      try {
        const token = localStorage.getItem('token')

        const res = await apiBackend.post(
          `/addon/public/map`,
          {
            id
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        console.log('eeee', res)

        return res.data
      } catch (error) {
        console.error('Error:', error)
      }
    })

export const addMapAddon =
  createAsyncThunk('addon/addonMap',
    async ({ component, data }, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.post(
          `/addon/map`,
          {
            component,
            data
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );


        return resp.data;
      } catch (error) {
        throw error;
      }
    }
  );


// quizas eliminar
export const fetchsI18Addon =
  createAsyncThunk('vector/fetchsI18Addon',
    async ({ lng = 'es', template }) => {

      console.log('133444')
      try {
        const token = localStorage.getItem('token')
        const res = await apiBackend.post(
          `/addon/public/i18`,
          {
            lng, 
            template
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        console.log('eeee buscar i18', res)

        return {
          id: template,
          text: res.data
        }
      } catch (error) {
        console.error('Error:', error)
      }
    })

export const addI18Addon =
  createAsyncThunk('addon/addonI18',
    async ({ lng = 'es', template, data }, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const resp = await apiBackend.post(
          `/addon/i18`,
          {
            lng,
            template,
            data
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        // console.log('respeee', resp)

        return {
          id: template,
          text: resp.data
        }
      } catch (error) {
        throw error;
      }
    }
  );














export const fetchsPublicAddon =
  createAsyncThunk('vector/fetchsPublicAddon',
    async ({ href, path }) => {

      try {
        const res = await apiBackend.post(
          `/addon/public/href`, {
          href,
          path
        }
        )

        return res.data
      } catch (error) {
        console.error('Error:', error)
      }
    })


export const fetchsPublicTemplateAddon =
  createAsyncThunk('vector/fetchsPublicTemplate',
    async ({ workspaceId, projectId }) => {
      try {
        const res = await apiBackend.post(
          `/addon/public`, {
          workspaceId,
          projectId

        })

        return res.data
      } catch (error) {
        console.error('Error:', error)
      }
    })




    // ------------------------------------
    export const addTemplate =
    createAsyncThunk('addon/addTemplate',
      async ({ addon, vector }, { dispatch }) => {
        try {
          const token = localStorage.getItem('token')
          const resp = await apiBackend.post(
            '/addon/add',
            {
              addon,
              vector
            }, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
          );
  
          // console.log('rrr', vector, resp)
  
          return resp.data
          // return resp.data[0];
        } catch (error) {
          console.log('errr', vector.id, error)
          throw error;
        }
      }
    );
  
  
  
    export const fetchsTemplate =
    createAsyncThunk('vector/fetchsTemplate',
      async ({ id, name }) => {
        try {
          const token = localStorage.getItem('token')
  
          const res = await apiBackend.post(
            `/addon/${id}/${name}`, {
  
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
          )
  
          return res.data
        } catch (error) {
          console.error('Error:', errror)
        }
      })
  

      export const deleteTemplate =
      createAsyncThunk('vector/deleteTemplate',
        async ({ id, name }) => {
          try {
            const token = localStorage.getItem('token')
    
            const res = await apiBackend.delete(
              `/addon/${id}/${name}`, {
    
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              },
            }
            )
    
            return res.data
          } catch (error) {
            console.error('Error:', errror)
          }
        })
  
        
    // -----------------------------
  
  
  
  
    
// export const addComponentAddon =
// createAsyncThunk('vector/addComponentAddon',
//   async ({ component, addon }) => {
//     try {
//       const token = localStorage.getItem('token')
//       const res = await apiBackend.post(
//         `/addon/component/public/add`,
//         {
//           component,
//           addon
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           },
//         }
//       );

//       console.log('res ---- component vector', res)

//       return res.data
//     } catch (error) {
//       console.error('Error:', error)
//     }

//   })


// export const fetchsComponentAddon =
// createAsyncThunk('vector/fetchsComponentAddon',
//   async ({ id, user }) => {
//     try {
//       const token = localStorage.getItem('token')
//       const res = await apiBackend.post(
//         `/addon/component/public/${id}`,
//         {
//           user
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           },
//         }
//       );

//       console.log('res ---- component vector', res)

//       return res.data
//     } catch (error) {
//       console.error('Error:', error)
//     }

//   })











// --------------------------------------------------------

export const visionAddon =
  createAsyncThunk('addon/vision',
    async (vision, { dispatch }) => {
      try {
        console.log('ree', vision)
        const tokenGPT = localStorage.getItem('token-gpt')
        const token = localStorage.getItem('token')
        const resp = await apiBackend.post(
          '/addon/vision',
          { 
            token: tokenGPT,
            vision 
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        console.log('111', resp)
        return resp;
      } catch (error) {
        throw error;
      }
    }
  );



export const imageAddon =
  createAsyncThunk('addon/image',
    async ({ prompt }, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const tokenGPT = localStorage.getItem('token-gpt')
        const resp = await apiBackend.post(
          '/addon/image',
          {
            token: tokenGPT,
            prompt,
          }, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
        );

        return resp.data
      } catch (error) {
        console.log('error', error)
        throw error;
      }
    }
  );




export const colorAddon =
  createAsyncThunk('addon/color',
    async ({ prompt }, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const tokenGPT = localStorage.getItem('token-gpt')
        const resp = await apiBackend.post(
          '/addon/color',
          {
            token: tokenGPT,
            prompt,
          }, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
        );

        // console.log('resp: ', resp)
        return resp.data
      } catch (error) {
        console.log('error', error)
        throw error;
      }
    }
  );






export const styleAddon =
  createAsyncThunk('addon/style',
    async ({ id, code, type, style }, { dispatch }) => {
      try {
        const token = localStorage.getItem('token')
        const tokenGPT = localStorage.getItem('token-gpt')


        const resp = await apiBackend.post(
          '/addon/style',
          {
            token: tokenGPT,
            code,
            type,
            style
          }, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
        );

        return resp.data
      } catch (error) {
        console.log('error', error)
        throw error;
      }
    }
  );


export const codeAddon =
  createAsyncThunk('addon/code',
    async ({ components }, { dispatch }) => {
      try {

        console.log('components', components)
        const token = localStorage.getItem('token')
        const tokenGPT = localStorage.getItem('token-gpt')

        const arrComponents = components.filter(component => component.code === '').map(component => {
          return {
            id: component.id,
            prompt: component.prompt
          }
        });

        console.log('arrComponents', arrComponents)
        const resp = await apiBackend.post(
          '/addon/code',
          {
            token: tokenGPT,
            components: arrComponents
          }, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
        );

        return resp.data
      } catch (error) {
        console.log('error', error)
        throw error;
      }
    }
  );




// 

export const fetchChatAddon =
  createAsyncThunk('addon/fetchChatAddon',
    async ({ addonId, componentId }, { dispatch }) => {
      try {
        console.log('edwed')
        const token = localStorage.getItem('token')
        const resp = await apiBackend.get(
          `/addon/chat/${addonId}/${componentId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        return resp.data;
      } catch (error) {
        throw error;
      }
    }
  );


export const addChatAddon =
  createAsyncThunk('addon/addChatAddon',
    async ({ addonId, componentId, chat }, { dispatch }) => {
      try {
        console.log('edwed')
        const token = localStorage.getItem('token')
        const resp = await apiBackend.post(
          '/addon/chat',
          {
            addonId,
            componentId,
            chat
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        );

        return resp.data;
      } catch (error) {
        throw error;
      }
    }
  );


