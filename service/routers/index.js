const { Router } = require('express')
const mainRouter = Router()


const routerEmail = require('./email')
const routerTicket = require('./ticket')
const routerForm = require('./form')
const routerDashboard = require('./dashboard')
const routerIAM = require('./iam')
const routerAddon = require('./addon')
const routerAssets = require('./assets')
const routerVector = require('./vector')
const routerProject = require('./project')
const routerChatbot = require('./chatbot')
const routerSys = require('./sys')
const routerTwilio = require('./twilio')
const routerPixel = require('./pixel')
const routerContract = require('./contract')
const routerInvoice = require('./invoice')
const routerLogs = require('./logs')
const routerApi = require('./api')
const routerSession = require('./session')
const routerStripe = require('./stripe')
const routerChat = require('./chat')



mainRouter.use('/chat', routerChat)
mainRouter.use('/api', routerApi)
mainRouter.use('/session', routerSession)

mainRouter.use('/twilio', routerTwilio)
mainRouter.use('/email', routerEmail)
mainRouter.use('/ticket', routerTicket)
mainRouter.use('/form', routerForm)
mainRouter.use('/dashboard', routerDashboard)
mainRouter.use('/iam', routerIAM)
mainRouter.use('/logs', routerLogs)
mainRouter.use('/addon', routerAddon)
mainRouter.use('/assets', routerAssets)
mainRouter.use('/vector', routerVector)
mainRouter.use('/project', routerProject)
mainRouter.use('/chatbot', routerChatbot)
mainRouter.use('/sys', routerSys)
mainRouter.use('/stripe', routerStripe)
mainRouter.use('/pixel', routerPixel)
mainRouter.use('/contract', routerContract)
mainRouter.use('/invoice', routerInvoice)


module.exports = mainRouter

