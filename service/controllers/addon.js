const { catchedAsync, response } = require('../utils/err')

const { Environment, FileSystemLoader } = require('nunjucks');

const nunjucksEnv = new Environment(new FileSystemLoader('.'));


const fs = require('fs').promises
const path = require('path')
const { promisify } = require('util');

const uuidv4 = require('uuid').v4;


const express = require('express');
const app = express();


const {
  visionGPT,
  styleGPT,
  codeGPT,
  imageGPT,
  colorGPT
} = require('../services/gpt')



const {
  addVector,
  updateVector,
  getVector,
  deleteVector,
  removeVector,
} = require('../services/lancedb')


const ID = 'test/test'


const encodeVector = (id) => {
  const str = `${id}`
  const base64Str = btoa(str)
  return base64Str
}





const _fetchs = async (req, res) => {
  try {
    const pathAddon = encodeVector(ID)
    const data = await getVector(pathAddon, 'addons')

    if (Array.isArray(data)) {
      return res.status(200).send(data)
    }

    return res.status(200).send([])
  } catch (err) {
    return res.status(200).send([])
  }
}


const _fetch = async (req, res) => {
  try {
    const { user } = req
    const { id } = req.params
    const pathAddon = encodeVector(ID)

    const options = [
      { field: 'id', operator: '==', value: id },
    ];

    const respAddon = await getVector(pathAddon, 'addons', [0, 0], options)

    console.log('add', respAddon)
    if (respAddon.length == 0) {
      return res.status(404).send('Not exist')
    }

    // -----------------------------
    let global = JSON.parse(respAddon[0].global)

    if (global.length > 0) {
      const pathEmbeedGlobal = `../../data/vector/components/${id}/global`
      try {
        const respFile = await fs.readFile(path.resolve(__dirname, `${pathEmbeedGlobal}.json`), 'utf8');
        global = JSON.parse(respFile);
      } catch (err) {
        console.log('err', err)
        global = global.map(c => ({
          id: c,
          type: "js",
          name: "index",
          data: "",
          size: 0,
          date: new Date(),
        }))
      }
    }

    // -----------------------------
    const addon = {
      ...respAddon[0],
      global: global,
      nodes: JSON.parse(respAddon[0].nodes),
      edges: JSON.parse(respAddon[0].edges)
    }

    console.log('addon', addon)

    let templates = []
    for (var i = 0; i < addon.nodes.length; i++) {
      const node = addon.nodes[i]
      // console.log('`addon/${addon.id}/${node.id}`', `addon/${addon.id}/${node.id}`)
      let id = encodeVector(`addon/${addon.id}/${node.id}`)

      const options = [
        { field: 'id', operator: '==', value: node.id },
      ];

      const respTemplate = await getVector(id, 'templates', [0, 0], options)

      console.log('respTemplate', respTemplate)
      if (respTemplate.length > 0) {
        templates[i] = {
          ...respTemplate[0],
          title: respTemplate[0].title,
          seo: JSON.parse(respTemplate[0].seo),
          path: JSON.parse(respTemplate[0].path),
          data: JSON.parse(respTemplate[0].data),
          position: JSON.parse(respTemplate[0].position),
        }

        for (var j = 0; j < templates[i].data.components.length; j++) {
          const pathEmbeed = `../../data/vector/components/${addon.id}/${node.id}/embeed/${templates[i].data.components[j].id}.json`

          const respFile = await fs.readFile(path.resolve(__dirname, pathEmbeed), 'utf8');

          if (!respFile) continue;

          const json = JSON.parse(respFile);
          console.log('pathEmbeed', pathEmbeed)
          console.log('json', json)
          templates[i].data.components[j] = {
            ...templates[i].data.components[j],
            html: json.html,
            css: json.css,
            script: json.script,
            matrix: json.matrix,
          }
        }
      }
    }

    return res.status(200).send({
      addon,
      templates: templates.filter(Boolean)
    })
  } catch (err) {
    console.log('err', err)
  }


}


const _delete = async (req, res) => {
  try {
    const { id } = req.body
    const pathAddon = encodeVector(ID)

    const options = [
      { field: 'id', operator: '==', value: id },
    ];

    const respAddon = await getVector(pathAddon, 'addons', [0, 0], options)
    const resp = await deleteVector(pathAddon, 'addons', { id })

    if (respAddon.length == 0) {
      return res.status(404).send('Not exist')
    }

    const addon = respAddon[0]
    const nodes = JSON.parse(addon.nodes)

    const vectors = []
    for (var i = 0; i < nodes.length; i++) {
      const node = nodes[i]

      let uri = encodeVector(`addon/${addon.id}/${node.id}`)
      await removeVector(uri, 'templates')
    }


    return res.status(200).send(id)
  } catch (err) {
    return res.status(200).send(id)
  }
}

const _add = async (req, res) => {
  try {
    console.log('111111111111')
    const { user } = req
    const { addon } = req.body
    const pathAddon = encodeVector(ID)

    console.log('eeeee', addon)
    const resp = await updateVector(pathAddon, 'addons', [0, 0], addon, { users: user })
    console.log('resp', resp)
    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}

const _fetchsTemplate = async (req, res) => {
  const { id, name } = req.params

  try {
    const query = await getVector(id, name, [0, 0])
    if (!query.length) {
      return res.status(200).send([])
    }

    return res.status(200).send(query)
  } catch (err) {
    return res.status(200).send([])
  }
}



const _addComponentTemplate = async (req, res) => {
  try {
    const { user } = req
    const { component, addon } = req.body

    const pathEmbeed = `../../data/vector/components/${user.id}/${addon.id}/embeed`
    try {
      await fs.access(path.resolve(__dirname, pathEmbeed));
    } catch (error) {
      console.log('err', error)
      try {
        await fs.mkdir(path.resolve(__dirname, pathEmbeed), { recursive: true });
      } catch (error) {
        console.log('!!!!!', error)
      }
    }

    const file = {
      html: component.html,
      css: component.css,
      script: component.script,
      matrix: component.matrix,
      global: component.global,
    }

    let _component = {
      ...component,
      html: {},
      css: [],
      script: [],
      matrix: [],
      global: [],
    }

    try {
      await fs.writeFile(path.resolve(__dirname, `${pathEmbeed}/${component.id}.json`), JSON.stringify(file, null, 2));
    } catch (error) {
      console.error(`Error al guardar el archivo JSON: ${error}`);
    }

    const pathComponent = encodeVector(`components/${user.id}`)
    const resp = await updateVector(pathComponent, 'components', [0, 0], _component, { addons: addon })

    return res.status(200).send(resp)
  } catch (err) {
    return res.status(500).send('Not verify user')
  }

}



const _fetchsComponentPublicTemplate = async (req, res) => {
  const respTemplate = await getVector(id, 'components', [0, 0], options)

  if (respTemplate.length > 0) {

    templates[i] = {
      ...respTemplate[0],
      title: respTemplate[0].title,
      seo: JSON.parse(respTemplate[0].seo),
      path: JSON.parse(respTemplate[0].path),
      data: JSON.parse(respTemplate[0].data),
      position: JSON.parse(respTemplate[0].position)
    }

    for (var j = 0; j < templates[i].data.components.length; j++) {
      const pathEmbeed = `../../data/vector/components/${addon.id}/${node.id}/embeed/${templates[i].data.components[j].id}.json`


      const respFile = await fs.readFile(path.resolve(__dirname, pathEmbeed), 'utf8');
      const json = JSON.parse(respFile);

      templates[i].data.components[j] = {
        ...templates[i].data.components[j],
        html: json.html,
        css: json.css,
        script: json.script,
        global: json.global,
        matrix: json.matrix,
      }
    }
  }
}


const cleanMatrixCode = (nunjucksTemplate) => {
  const scriptRegex = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
  const macroRegex = /{%\s*[\s\S]*?%}|{{\s*[\s\S]*?}}/gs;

  const scriptMatches = nunjucksTemplate.match(scriptRegex) || [];
  const templateWithoutScripts = nunjucksTemplate.replace(scriptRegex, '');

  const macroMatches = templateWithoutScripts.match(macroRegex) || [];
  const nonMacroAndScriptContent = templateWithoutScripts
    .split(macroRegex)
    .map(fragment => fragment.trim())
    .filter(fragment => fragment !== '');

  return {
    matrix_code: macroMatches,
    node_code: nonMacroAndScriptContent,
    script_code: scriptMatches
  };
};


const searchAddonTemplate = async (addonId, nodeId) => {
  const id = encodeVector(`addon/${addonId}/${nodeId}`)
  const respTemplate = await getVector(id, 'templates', [0, 0])
  if (!respTemplate.length) {
    return res.status(200).send([])
  }


  const template = respTemplate[0]


  const data = JSON.parse(template.data)
  let components = data.components


  const pathEmbeed = `../../data/vector/components/${addonId}/${nodeId}/embeed`
  for (var i = 0; i < components.length; i++) {
    let json
    try {
      const respFile = await fs.readFile(path.resolve(__dirname, `${pathEmbeed}/${components[i].id}.json`), 'utf8');
      json = JSON.parse(respFile);
    } catch (err) {
      console.log('err', err)
    }

    components[i] = {
      ...components[i],
      html: json.html,
      css: json.css,
      script: json.script,
      matrix: json.matrix,
    }
  }

  let html = ''
  let css = ''
  let matrix = ''
  let script = ''
  let node = ''
  components.map((component, index) => {
    html += `<div component-id="${component.id}">${component.html.data}</div>`
    component.css.map((item, index) => {
      css += item.data
    })
    component.matrix.map((item, index) => {
      const { matrix_code, node_code, script_code } = cleanMatrixCode(item.data)
      matrix += matrix_code.join('\n')
      script += script_code
      node += node_code
    })
  })

  console.log('mamamamam', matrix)


  const htmlContent = `<div><style>${css}</style>${html}</div>`
  // =================================================

  let _script = `try{
    const data = '1234'
    ${node}
    return data
  }catch(err){
    return err
  }`
  const fn_node = new Function(_script);
  const resp_node = await fn_node();

  let lng = 'es'
  const options = [
    { field: 'id', operator: '==', value: template.id },
  ];

  const pathI18 = encodeVector(`addon/addon/i18/${lng}/${template.id}`)
  const respI18 = await getVector(pathI18, 'templates_i18', [0, 0], options)

  let i18 = {}
  if (respI18.length > 0) {
    i18 = JSON.parse(respI18[0].map)
  }

  // ===============================================
  const pathEmbeedGlobal = `../../data/vector/components/${addonId}/global`
  let global_matrix = ``
  let global_node = ``
  let global_script = ``
  try {
    let global = await fs.readFile(path.resolve(__dirname, `${pathEmbeedGlobal}.json`), 'utf8');

    global = JSON.parse(global);
    global.map(item => {
      const { matrix_code, node_code, script_code } = cleanMatrixCode(item.data)
      global_matrix += matrix_code.join('\n')
      global_script += script_code
      global_node += node_code
    })

  } catch (err) {
    console.log('err', err)
  }



  let _global_script = `try{
    const data = '1234'
    ${global_node}
    return data
  }catch(err){
    return err
  }`

  const fn_global = new Function(_global_script);
  const resp_global = await fn_global();

  let macro = ['main', 'matrix', 'session']
  let data_matrix = ``

  for (var i = 0; i < macro.length; i++) {
    try {
      const html = await fs.readFile(`./service/controllers/addon/data/${macro[i]}.html`, 'utf-8');
      data_matrix += `\n${html}\n`
    } catch (e) { }
  }

  macro = ['data', 'form']
  let macro_matrix = ``

  for (var i = 0; i < macro.length; i++) {
    try {
      const html = await fs.readFile(`./service/controllers/addon/${macro[i]}.html`, 'utf-8');
      macro_matrix += `\n${html}\n`
    } catch (e) { }
  }

  // ===============================================
  macro = ['test', 'script']

  for (var i = 0; i < macro.length; i++) {
    try {
      const filterPath = path.resolve(__dirname, `../../service/controllers/addon/filter/${macro[i]}.js`);
      const filter = require(filterPath);
      nunjucksEnv.addFilter(macro[i], filter.default);
    } catch (e) {
      console.log('ee', e)
    }
  }


  // seo ====================================================================
  const seo = JSON.parse(template.seo)
  const seoContent =
    `<metaseo>
    <title>${template.title}</title>
    <meta name="author" content="${seo.author}">
    <meta name="keywords" content="${seo.keywords}">
    <meta name="description" content="${seo.description}">
  </metaseo>`

  try {
    const renderedHtml = nunjucksEnv.renderString(data_matrix + macro_matrix + global_matrix + matrix + seoContent + htmlContent + global_script + script,
      {
        name: 'John',
        workspaceId: addonId,
        projectId: nodeId,
        ...(i18 ? { t: i18 } : {})
      }
    );
    return renderedHtml
  } catch (error) {
    console.log('error 1234', error)
    const htmlError = await fs.readFile(`./service/controllers/addon/error.html`, 'utf-8');
    const message = error.message.split('Error:')[1]
    const renderedError = nunjucksEnv.renderString(htmlError,
      {
        data: message
      }
    );

    return renderedError
  }

}



const _fetchsPublicAddon = async (req, res) => {
  const { href, path: _path } = req.body

  try {
    const uri = encodeVector(ID)
    const options = [
      { field: "href", operator: "LIKE", value: `%${href}%` },
    ];

    const respAddon = await getVector(uri, 'addons', [0, 0], options)


    if (respAddon.length == 0) {
      return res.status(200).send('404')
    }

    const addon = respAddon[0]
    const nodes = JSON.parse(addon.nodes)
    const node = nodes.find(node => {
      return node.title == _path || node.path.some(item => item.value === _path);
    });

    if (!node) {
      return res.status(200).send('404')
    }


    /// -----------------------------------------

    const renderedHtml = await searchAddonTemplate(addon.id, node.id)
    res.set('Content-Type', 'text/html');
    res.send(renderedHtml);
  } catch (err) {
    console.log('ERR. ', err)
    return res.status(200).send(JSON.stringify(err.name))
  }
}





const _fetchsPublicTemplate = async (req, res) => {
  const { workspaceId, projectId } = req.body
  try {

    const renderedHtml = await searchAddonTemplate(workspaceId, projectId)
    res.set('Content-Type', 'text/html');
    res.send(renderedHtml);
  } catch (err) {
    return res.status(200).send([])
  }
}

const _fetchsMap = async (req, res) => {
  const { id } = req.body

  try {
    const pathAddon = encodeVector(ID)

    const options = [
      { field: 'id', operator: '==', value: id },
    ];

    const respAddon = await getVector(pathAddon, 'addons', [0, 0], options)


    if (respAddon.length == 0) {
      return res.status(404).send('Not exist')
    }

    const addon = respAddon[0]
    const nodes = JSON.parse(addon.nodes)

    let nodeMap = {}
    for (var i = 0; i < nodes.length; i++) {
      const node = nodes[i]

      const options = [
        { field: 'id', operator: '==', value: node.id },
      ];

      let pathTemplate = encodeVector(`addon/${id}/${node.id}`)

      const respTemplate = await getVector(pathTemplate, 'templates', [0, 0], options)

      if (respTemplate.length > 0) {
        const idTemplate = respTemplate[0].id
        const data = JSON.parse(respTemplate[0].data)
        for (var j = 0; j < data.components.length; j++) {
          const idComponent = data.components[j].id
          const options = [
            { field: 'id', operator: '==', value: idComponent },
          ];

          const pathMap = encodeVector(`addon/map/component/${idComponent}`)
          const respMap = await getVector(pathMap, 'templates_map', [0, 0], options)

          if (respMap.length > 0) {
            if (!nodeMap[idTemplate]) nodeMap[idTemplate] = {}
            if (!nodeMap[idTemplate][idComponent]) nodeMap[idTemplate][idComponent] = []
            nodeMap[idTemplate][idComponent] = JSON.parse(respMap[0].map)
          }
        }
      }
    }

    return res.status(200).send(nodeMap)
  } catch (err) {
    return res.status(200).send([])
  }
}

const _addMap = async (req, res) => {
  try {
    const { component, data } = req.body

    const vector = {
      id: component,
      map: data
    }

    const pathMap = encodeVector(`addon/map/component/${component}`)
    const resp = await updateVector(pathMap, 'templates_map', [0, 0], vector)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}



const _fetchsI18 = async (req, res) => {
  const { lng, template } = req.body

  console.log('ñl1lllknngngngngnglngng ', lng, template)

  try {

    const options = [
      { field: 'id', operator: '==', value: template },
    ];

    const pathI18 = encodeVector(`addon/addon/i18/${lng}/${template}`)
    const respI18 = await getVector(pathI18, 'templates_i18', [0, 0], options)

    if (respI18.length == 0) {
      const pathI18Store = encodeVector(`addon/addon/i18/es/${template}`)
      const respI18Store = await getVector(pathI18Store, 'templates_i18', [0, 0], options)
      console.log('store store store es', respI18Store)
      if (respI18Store.length == 0) {
        return res.status(200).send({})
      }

      const i18 = JSON.parse(respI18Store[0].map)
      return res.status(200).send({ store: i18 })
    }

    const i18 = JSON.parse(respI18[0].map)

    return res.status(200).send(i18)
  } catch (err) {
    return res.status(200).send([])
  }
}

const _addI18 = async (req, res) => {
  try {
    const { lng, template, data } = req.body

    const vector = {
      id: template,
      map: data
    }

    const pathAddon = encodeVector(`addon/addon/i18/${lng}/${template}`)
    const resp = await updateVector(pathAddon, 'templates_i18', [0, 0], vector)

    const i18 = JSON.parse(resp.map)
    return res.status(200).send(i18)
  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}

const _addTemplate = async (req, res) => {
  try {
    const { user } = req
    const { addon, vector } = req.body

    const pathEmbeed = `../../data/vector/components/${addon.id}/${vector.id}/embeed`
    try {
      await fs.access(path.resolve(__dirname, pathEmbeed));
      console.log('creadoo con exitoo')
    } catch (error) {
      try {
        await fs.mkdir(path.resolve(__dirname, pathEmbeed), { recursive: true });
      } catch (error) {
        console.log('!!!!!', error)
      }
    }

    console.log('33333333333333')

    let components = vector.data.components

    // console.log('compone', components)

    for (var i = 0; i < components.length; i++) {
      // for (var i = 0; i < 1; i++) {
      const file = {
        html: components[i].html,
        css: components[i].css,
        script: components[i].script,
        matrix: components[i].matrix,
      }

      components[i] = {
        ...components[i],
        html: {},
        css: [],
        script: [],
        matrix: [],
      }
      console.log('file', `${pathEmbeed}/${components[i].id}.json`)


      try {
        await fs.writeFile(path.resolve(__dirname, `${pathEmbeed}/${components[i].id}.json`), JSON.stringify(file, null, 2));
        console.log('bien escritp el JSON')
      } catch (err) {
        console.log(`Error al guardar el archivo JSON: ${err}`);
      }
    }

    let _vector = vector
    _vector.data.components = components

    // console.log('3444444444444444444444444444444444444444444')
    // console.log(`addon/${addon.id}/${vector.id}`)
    const pathTemplate = encodeVector(`addon/${addon.id}/${vector.id}`)
    const resp = await updateVector(pathTemplate, 'templates', [0, 0], _vector, { addons: addon })

    return res.status(200).send(resp)
  } catch (err) {
    console.log('uauaua', err)
    return res.status(500).send('Not verify user')
  }
}



const _deleteTemplate = async (req, res) => {
  try {
    // const { user } = req
    // const { addon, vector } = req.body


    // // console.log('eeee', resp)
    // return res.status(200).send(resp)

  } catch (err) {
    // console.log('errrrr!!!', err)
    return res.status(500).send('Not verify user')
  }
}



const _update = async (req, res) => {
  try {
    const { addon } = req.body
    const pathAddon = encodeVector(ID)

    const updateGlobal = [...addon.global || []]
    const pathEmbeedGlobal = `../../data/vector/components/${addon.id}/global`

    try {
      await fs.access(path.resolve(__dirname, pathEmbeedGlobal));
    } catch (error) {
      console.log('err global', error)
      try {
        await fs.mkdir(path.resolve(__dirname, pathEmbeedGlobal), { recursive: true }); // Crear la carpeta y sus padres si no existen
      } catch (error) {
        console.log('!!!!! global', error)
      }
    }

    if (updateGlobal.length > 0) {
      try {
        await fs.writeFile(path.resolve(__dirname, `${pathEmbeedGlobal}.json`), JSON.stringify(updateGlobal, null, 2));
      } catch (error) {
        console.log(`Error al guardar el archivo JSON: ${error}`);
      }
    }

    let vectorUpdateGlobal = updateGlobal.map(item => item.id);

    let updatedAddon = {
      ...addon,
      global: vectorUpdateGlobal
    }


    const resp = await updateVector(pathAddon, 'addons', [0, 0], updatedAddon)

    const respAddon = {
      ...resp,
      nodes: resp.nodes ? JSON.parse(resp.nodes) : [],
      edges: resp.nodes ? JSON.parse(resp.edges) : [],
      global: updateGlobal,
    }
    // console.log('11')
    // console.log('ll', respAddon)
    return res.status(200).send(respAddon)
    // return res.status(200).send({})

  } catch (err) {
    console.log('errr', err)
    return res.status(500).send('Not verify user')
  }
}


// -------------------------------------------------------------------------------------------------
const _vision = async (req, res) => {
  try {
    const { vision, token } = req.body


    // console.log('vision', vision.image)
    const response = await visionGPT(token, vision.image)
    // const path = encodeVector(ID)

    console.log('response', response)

    // const resp = await updateVector(path, 'addons', [0, 0], addon)

    return res.status(200).send(response)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}


const _style = async (req, res) => {
  try {
    const { token, code, type, style } = req.body
    const path = encodeVector(ID)

    const resp = await styleGPT(token, code, type, style)

    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}

const _code = async (req, res) => {
  try {
    const { token, components } = req.body
    const path = encodeVector(ID)

    console.log('token', components)
    const resp = await codeGPT(token, components)
    console.log('resp', resp)

    return res.status(200).send(resp[0])

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}



const _image = async (req, res) => {
  try {
    const { token, prompt } = req.body
    console.log('tokenee', token, prompt)
    const path = encodeVector(ID)

    const resp = await imageGPT(token, prompt)
    console.log('tokenee', resp)

    if (resp == 400) {
      return res.status(200).send({ error: true })
    }

    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}



const _color = async (req, res) => {
  try {
    const { token, prompt } = req.body
    console.log('tokenee', token, prompt)
    const path = encodeVector(ID)

    const resp = await colorGPT(token, prompt)
    console.log('tokenee', resp)

    if (resp == 400) {
      return res.status(200).send({ error: true })
    }

    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}



const _fetchChat = async (req, res) => {
  try {
    const { user } = req
    const { addonId, componentId } = req.params
    const path = encodeVector(`addon/${addonId}/chat/${componentId}`)

    const resp = await getVector(path, 'chat', [0, 0, 0])
    if (resp == 400) {
      return res.status(200).send([])
    }

    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }

}



const _addChat = async (req, res) => {
  try {
    const { user } = req

    const { addonId, componentId, chat } = req.body
    const path = encodeVector(`addon/${addonId}/chat/${componentId}`)

    const resp = await addVector(path, 'chat', [0, 0, 0], chat, { users: user })


    return res.status(200).send(resp[0])

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}



const _rpa = async (req, res) => {
  try {
    const { addon } = req.body
    const path = encodeVector(ID)


    const resp = await updateVector(path, 'addons', [0, 0], addon)
    return res.status(200).send(resp)

  } catch (err) {
    return res.status(500).send('Not verify user')
  }
}


// -----------------------------------------------------------
const addFigma = async (req, res) => {

  const { data } = req.body

  // create addon


  let addon = {
    id: uuidv4(),
    ispublic: true,
    isavailable: true,
    domain: [],
    title: 'figma-uuu',
    href: 'figma-uuu',
    description: 'lorem ipsum',
    tags: [],
    nodes: [],
    edges: [],
    global: [],
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }



  console.log('addonaddon', addon)

  // add template
  console.log('33333333333333')

  let template = {
    id: uuidv4(),
    type: 'selectorTemplate',
    sourcePosition: 'right',
    title: 'plugin-01',
    href: '',
    description: '',
    position: {x: 0, y: 0},
    tags: [],
    path: [],
    seo: {},
    date: new Date(),
    data: {
      components: [{
        id: uuidv4(),
        coins: 0,
        ispublic: true,
        isavailable: true,
        title: '',
        prompt: '',
        tags: [],
        html: {
          id: uuidv4(),
          type: 'html',
          name: 'index',
          data: '<div>hello figma</div>',
          size: 0,
          date: new Date(),
        },
        css: [],
        script: [],
        matrix: []
      }]
    }
  }



  const pathEmbeed = `../../data/vector/components/${addon.id}/${template.id}/embeed`
  try {
    await fs.access(path.resolve(__dirname, pathEmbeed));
    console.log('creadoo con exitoo')
  } catch (error) {
    try {
      await fs.mkdir(path.resolve(__dirname, pathEmbeed), { recursive: true });
    } catch (error) {
      console.log('!!!!!', error)
    }
  }



  for (var i = 0; i < template.data.components.length; i++) {
    const file = {
      html: template.data.components[i].html,
      css: template.data.components[i].css,
      script: template.data.components[i].script,
      matrix: template.data.components[i].matrix,
    }

    template.data.components[i] = {
      ...template.data.components[i],
      html: {},
      // css: [],
      // script: [],
      // matrix: [],
    }
    console.log('file', `${pathEmbeed}/${template.data.components[i].id}.json`)

    try {
      await fs.writeFile(path.resolve(__dirname, `${pathEmbeed}/${template.data.components[i].id}.json`), JSON.stringify(file, null, 2));
      console.log('bien escritp el JSON')
    } catch (err) {
      console.log(`Error al guardar el archivo JSON: ${err}`);
    }
  }


  addon.nodes = [template]

  const pathAddon = encodeVector(ID)
  addon = await updateVector(pathAddon, 'addons', [0, 0], addon)


  const pathTemplate = encodeVector(`addon/${addon.id}/${template.id}`)
  const response = await updateVector(pathTemplate, 'templates', [0, 0], template)



  // send email




  return res.status(200).send(response)
}

module.exports = {
  addFigma: catchedAsync(addFigma),

  fetchs: catchedAsync(_fetchs),
  fetch: catchedAsync(_fetch),
  delete: catchedAsync(_delete),
  add: catchedAsync(_add),
  update: catchedAsync(_update),

  addComponentTemplate: catchedAsync(_addComponentTemplate),
  fetchsComponentPublicTemplate: catchedAsync(_fetchsComponentPublicTemplate),

  fetchsPublicAddon: catchedAsync(_fetchsPublicAddon),
  fetchsPublicTemplate: catchedAsync(_fetchsPublicTemplate),

  fetchsMap: catchedAsync(_fetchsMap),
  addMap: catchedAsync(_addMap),
  fetchsI18: catchedAsync(_fetchsI18),
  addI18: catchedAsync(_addI18),

  fetchsTemplate: catchedAsync(_fetchsTemplate),
  addTemplate: catchedAsync(_addTemplate),
  deleteTemplate: catchedAsync(_deleteTemplate),

  vision: catchedAsync(_vision),
  code: catchedAsync(_code),
  style: catchedAsync(_style),
  color: catchedAsync(_color),
  image: catchedAsync(_image),
  rpa: catchedAsync(_rpa),

  fetchChat: catchedAsync(_fetchChat),
  addChat: catchedAsync(_addChat),

}