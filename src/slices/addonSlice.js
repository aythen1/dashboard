// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

import {
  fetchsAddon,
  fetchAddon,
  addAddon,
  updateAddon,
  deleteAddon,

  fetchsTemplate,
  addTemplate,
  codeAddon,

  fetchsMapAddon,

  addI18Addon,
  fetchsI18Addon

} from '@/actions/addon'

export const initialComponent = {
  id: '',
  owner: '',
  version: '',
  title: '',
  description: '',
  data: '',
  updatedAt: '',
  createdAt: ''
}

const addonSlice = createSlice({
  name: 'addons',
  initialState: {
    status: null,
    loading: false,

    code: null,

    element: null,

    // 
    i18: {},
    map: {},

    addon: {},
    addons: [],
    templates: [], //nodes
    connections: [], //edges
    components: [],

    infoResume: {
      template: 10,
      component: 10,
      management: 14,
      token: 20
    }
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },

    setAddon: (state, action) => {
      // console.log('update ueudwufrw9fr1pdate', state.addon, action.payload)
      state.addon = action.payload
    },
    setTemplates: (state, action) => {
      // console.log('====', action.payload)
      console.log('action', action.payload)
      state.templates = action.payload
    },
    setConnections: (state, action) => {
      // console.log('====', action.payload)
      console.log('action', action.payload)
      state.connections = action.payload
    },

    setElement: (state, action) => {
      state.element = action.payload
    },

    setCode: (state, action) => {
      state.code = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchsAddon.fulfilled, (state, action) => {
        state.addons = action.payload;
      })
      .addCase(fetchsAddon.rejected, (state, action) => {
        state.error = action.error.message;
      })


      .addCase(fetchAddon.fulfilled, (state, action) => {
        state.addon = action.payload.addon;
        state.templates = action.payload.templates;
        
        const { template, component, management, token } = resumeTemplate(action.payload.templates)
        console.log(')))))))))))))))))))))))))))))))))))))))))',
          template,
          component, management, token)

        state.infoResume = {
          template,
          component,
          management,
          token,
        }
      })
      .addCase(fetchAddon.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })


      .addCase(addAddon.fulfilled, (state, action) => {
        const newAddon = action.payload;
        const existingAddonIndex = state.addons.findIndex((existingAddon) => existingAddon.id === newAddon.id);

        if (existingAddonIndex !== -1) {
          state.addons[existingAddonIndex] = { ...state.addons[existingAddonIndex], ...newAddon };
        } else {
          state.addons.push(newAddon);
        }
      })

      .addCase(addAddon.rejected, (state, action) => {
        state.error = action.error.message;
      })


      .addCase(updateAddon.fulfilled, (state, action) => {
        state.addon = action.payload;
      })
      .addCase(updateAddon.rejected, (state, action) => {
        state.error = action.error.message;
      })


      .addCase(deleteAddon.fulfilled, (state, action) => {
        state.addons = state.addons.filter(addon => addon.id !== action.payload);
      })


      .addCase(fetchsTemplate.fulfilled, (state, action) => {
        // console.log('fetchsVectorAddon', action.payload)
        // state.vectors.push(action.payload)
      })
      .addCase(addTemplate.fulfilled, (state, action) => {
        // console.log('action.payload add vector', action.payload)

        // const existingIndex = state.vectors.findIndex(item => item.id == action.payload.id);

        // // Si el elemento no está presente, agregarlo
        // if (existingIndex === -1) {
        //   state.vectors.push(action.payload);
        // }

        // state.vectors.push(action.payload)
      })

      .addCase(fetchsMapAddon.fulfilled, (state, action) => {
        console.log('action map', action.payload)
        state.map = action.payload 
      })

      .addCase(fetchsI18Addon.fulfilled, (state, action) => {
        console.log('action i18', action.payload)
        // state.i18 = action.payload
        if(action.payload?.id){
          if(!action.payload.text.store){
            console.log('wwww', action.payload.text)
            state.i18[action.payload.id] = action.payload.text
          }
        } 
      })
      .addCase(addI18Addon.fulfilled, (state, action) => {
        console.log('action i18', action.payload)
        if(action.payload?.id){
        
          state.i18[action.payload.id] = action.payload.text
        } 
      })



      // .addCase(visionAddon.fulfilled, (state, action) => {
      //   // state.status = 'fulfilled';
      //   state.vision = action.payload;
      // })
      // .addCase(visionAddon.rejected, (state, action) => {
      //   // state.status = 'rejected';
      //   state.error = action.error.message;
      // })


      .addCase(codeAddon.fulfilled, (state, action) => {
        // state.status = 'fulfilled';
        // state.components = action.payload.components;
        // state.code = action.payload.components;
      })

  },
});

export const {
  setStatus,

  setAddon,
  setTemplates,
  setConnections,
  setElement,

  setCode,
} = addonSlice.actions;

export default addonSlice.reducer;







const resumeTemplate = (templates) => {
  console.log('tttt', templates)

  let component = 0
  let management = 0

  templates.map((template, index) => {
    const components = template.data.components
    component += components.length

    components.map((component, index) => {
      console.log('cc', component)
      if(component.html?.data){
        management += component.html.data.length
      }

      component.css?.map((css, index) => {
        management += css.data.length
      })
      component.script?.map((css, index) => {
        management += css.data.length
      })
      component.matrix?.map((matrix, index) => {
        management += matrix.data.length
      })
    })
  })


  return {
    template: templates.length,
    component: component,
    management: management,
    token: 0
  }
}



