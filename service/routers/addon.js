const { Router } = require('express')
const routesRouter = Router()

const { authenticateToken } = require('../middlewares/auth/auth');



const {
    addFigma,
    //
    fetchs,
    fetch,
    delete: _delete,
    add,
    update,

    fetchsPublicAddon,
    fetchsPublicTemplate,
    
    fetchsTemplate,
    deleteTemplate,
    addTemplate,

    fetchsMap,
    addMap,
    fetchsI18,
    addI18,

    style,
    code,
    image,
    color,
    vision,
    rpa,

    fetchChat,
    addChat,
} = require('../controllers/addon');




routesRouter
    .post('/figma', addFigma)

    //
    .get('/', authenticateToken, fetchs)
    .get('/:id', authenticateToken, fetch)
    .delete('/', authenticateToken, _delete)
    .post('/', authenticateToken, add)
    .put('/', authenticateToken, update)

    // unique
    .post('/public/href', fetchsPublicAddon)
    .post('/public', fetchsPublicTemplate)

    .post('/public/map', authenticateToken, fetchsMap)
    .post('/map', authenticateToken, addMap)
    .post('/public/i18', authenticateToken, fetchsI18)
    .post('/i18', authenticateToken, addI18)

    .post('/:id/:name', authenticateToken, fetchsTemplate)
    .delete('/:id/:name', authenticateToken, deleteTemplate)
    .post('/add', authenticateToken, addTemplate)

    .post('/style', authenticateToken, style)
    .post('/code', authenticateToken, code)
    .post('/image', authenticateToken, image)
    .post('/color', authenticateToken, color)
    .post('/vision', authenticateToken, vision)
    .post('/rpa', authenticateToken, rpa)

//
routesRouter.get('/chat/:addonId/:componentId', authenticateToken, fetchChat)
routesRouter.post('/chat', authenticateToken, addChat)

module.exports = routesRouter
