import {
    setErrorType,
    setProductsList,
    setSubscription,
    setPaymentCard,
    setBillingDetail,
    setCardDetail,
    setStateCardDetail,
    setGrafic,
    setBarChart,
    setPremiumState,
    setCurrentFreelancer,
    setSubscriptionSearched,
    setPaymentSucceeded,
    setAccountLink,
    setConnectedAccountPrice,
    setCurrentAccount,
    setClientSecret,
    setCurrentFreelancerPayment,
    setLoader
  } from '@/slices/new/stripeSlice'
  import apiBackend from '@/utils/apiBackend'
  // import { createAsyncThunk } from '@reduxjs/toolkit'
  
  export const createPayment = (payload) => async (dispatch) => {
    try {
      console.log('entra al action del creación de pago', payload)
      const { data } = await apiBackend.post('/v1/stripe', payload)
      if (data.data.success) {
        dispatch(setErrorType(false))
        console.log('respuesta del backend en enviar token', data)
      }
    } catch ({ response }) {
      dispatch(setErrorType(response.data.message))
      console.log(response)
    }
  }
  
  // export const getProductsList = () => async (dispatch) => {
  //   console.log('entra al action')
  //   try {
  //     const { data } = await apiBackend.get('/v1/stripe/get-products-list')
  //     console.log(data)
  //     dispatch(setProductsList(data.data.client_secret))
  //   } catch ({ error }) {
  //     console.log(error.message)
  //   }
  // }
  
  export const enviarTokenDePago = (payload) => async (dispatch) => {
    try {
      console.log('entra al action del proceso de pago', payload)
      const { data } = await apiBackend.post('/v1/stripe/procesar-pago', payload)
      if (data.data.success) {
        dispatch(setErrorType(false))
        console.log('respuesta del backend en enviar token', data)
      }
    } catch ({ response }) {
      dispatch(setErrorType(response.data.message))
      console.log(response)
    }
  }
  
  export const changeSubscription = (payload) => async (dispatch) => {
    try {
      dispatch(setSubscription(payload))
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const setErrorPayment = (payload) => async (dispatch) => {
    console.log('entra al action de setErrorPayment', payload)
    try {
      dispatch(setErrorType(payload))
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const enviarDatosTarjeta = (payload) => async () => {
    console.log('entra al action de enviarDatosTarjeta', payload)
  
    try {
      const { data } = await apiBackend.post(
        '/v1/stripe/create-payment-card',
        payload
      )
      console.log(data)
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const getPaymentCard = (payload) => async (dispatch) => {
    console.log('entra al action de obtener datos Tarjeta', payload)
  
    const { data } = await apiBackend.get(
      `/v1/stripe/get-payment-card/?userToolId=${payload}`
    )
    console.log(data.data)
    try {
      dispatch(setPaymentCard(data.data))
    } catch (error) {
      throw new Error(error)
    }
  }
  
  const secretKey =
    'sk_test_51NpepIEePFf1Q2ZMpcbdSTNp1lHtSr6bTYj1lRlzrRxx2KoAg7Lgt7BJbO2dKYt4DSmd0DslCFyxUWMGCg9I4KUe00g4NLQeBh'
  
  export const getBillingDetail = (payload) => async (dispatch) => {
    console.log('entra al action de obtener datos billing detail', payload)
  
    let paymentListId, finalBillingDetail
  
    try {
      if (payload && payload.id) {
        paymentListId = await apiBackend.get(
          `/v1/stripe/get-payment-intent-list?id=${payload.id}`
        )
  
        console.log(
          'esto es lo que sale de la nueva ruta',
          paymentListId.data.data.billingDetail
        )
      } else {
        const { data } = await apiBackend.get(
          payload && payload.amount
            ? `https://api.stripe.com/v1/payment_intents/search?limit=30&query=amount=${
                payload.amount * 100
              }`
            : // : payload && payload.id
              // ? `https://api.stripe.com/v1/payment_intents/search?limit=20&query=metadata['id']:'${payload.id}'`
              payload && payload.email
              ? `https://api.stripe.com/v1/payment_intents/search?limit=30&query=metadata['email']:'${payload.email}'`
              : payload && payload.date
                ? `https://api.stripe.com/v1/payment_intents/search?limit=30&query=created<${payload.date}`
                : `https://api.stripe.com/v1/payment_intents?limit=${
                    payload && payload.limit ? payload.limit : '30'
                  }${
                    payload && payload.next
                      ? '&starting_after=' + payload.next
                      : payload && payload.previous
                        ? '&ending_before=' + payload.previous
                        : ''
                  }
        `,
          {
            headers: {
              Authorization: `Bearer ${secretKey}`
            }
          }
        )
        console.log(data, 'esto es lo que vuelve de la consulta a stripe')
  
        const finalBillingDetailPromises = data.data.map(async (e) => {
          const result = await apiBackend.get(
            `/v1/stripe/get-card-detail/?token=${e.payment_method}`
          )
          return { ...e, ...result.data.data }
        })
  
        finalBillingDetail = await Promise.all(finalBillingDetailPromises)
      }
  
      if (payload && payload.id)
        finalBillingDetail = paymentListId.data.data.billingDetail
  
      dispatch(setBillingDetail(finalBillingDetail))
      dispatch(setStateCardDetail(true))
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const getCardDetail = (payload) => async (dispatch) => {
    console.log('entra al action de obtener detalle de tarjeta')
    if (payload === 'clear') {
      dispatch(setCardDetail(payload))
    } else {
      dispatch(setStateCardDetail(false))
      const { data } = await apiBackend.get(
        `/v1/stripe/get-card-detail/?token=${payload}`
      )
      try {
        dispatch(setCardDetail(data.data))
      } catch (error) {
        throw new Error(error)
      }
    }
  }
  
  export const getGrafic = (payload) => async (dispatch) => {
    console.log('entra al action de obtener grafico', payload)
  
    let hasMore = true
    let desde = false
    while (hasMore) {
      try {
        const { data } = await apiBackend.get(
          `/v1/stripe/create-grafic/?desde=${desde}`
        )
        console.log(data.data, 'esto es lo que va grafic')
        hasMore = data.data.hasMore
        desde = data.data.endDate
        const transactions = data.data.transactions
        dispatch(setGrafic(transactions))
        dispatch(setBarChart(data.data.revenue))
      } catch (error) {
        throw new Error(error)
      }
    }
  }
  
  export const sendProductData = (payload) => (dispatch) => {
    console.log('entra al action de sendProductData', payload)
  
    apiBackend
      .post('/v1/stripe/create-product', payload)
      .then((response1) => {
        console.log(response1.data.data)
  
        // Ejecutar el segundo POST después del primero
        return apiBackend.post('/v1/stripe/create-price', response1.data.data)
      })
      .then((response2) => {
        console.log(response2.data)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
  
  export const getProductsList = (payload) => async (dispatch) => {
    console.log('entra al action de obtener lista de productos', payload)
  
    try {
      const { data } = await apiBackend.get('/v1/stripe/get-products-list')
      console.log(data.data, 'esto es lo que va a productList')
  
      dispatch(setProductsList(data.data))
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const sendUpdateProduct = (payload) => async (dispatch) => {
    console.log('entra al action de update product', payload)
  
    try {
      const { data } = await apiBackend.post('/v1/stripe/update-product', payload)
      console.log(data)
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const sendDeleteProduct = (payload) => async (dispatch) => {
    console.log('entra al action de delete product', payload)
  
    try {
      const { data } = await apiBackend.post('/v1/stripe/delete-product', payload)
      console.log(data)
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const sendCustomerData = (payload) => async () => {
    console.log('entra al action de enviar datos de cliente', payload)
  
    try {
      const { data } = await apiBackend.post(
        '/v1/stripe/create-customer',
        payload
      )
      console.log(data)
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const sendSubscriptionType = (payload) => async () => {
    console.log('entra al action de enviar typo de subscripcion', payload)
  
    try {
      const { data } = await apiBackend.post(
        '/v1/stripe/create-subscription',
        payload
      )
      console.log(data)
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const getPremiumState = (payload) => async (dispatch) => {
    // console.log('entra al action de obtener premium state', payload)
  
    try {
      const { data } = await apiBackend.get(
        `/v1/stripe/get-premium-state/?id=${payload}`,
        payload
      )
      // console.log(data)
      dispatch(setPremiumState(data.data))
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const sendCurrentFreelancer = (payload) => async (dispatch) => {
    console.log(
      'entra a la action para enviar el id del freelancer actual',
      payload
    )
  
    try {
      dispatch(setCurrentFreelancer(payload))
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const sendTokenCard = (payload) => async () => {
    console.log('entra al action para enviar datos para el token card', payload)
  
    try {
      const { data } = await apiBackend.post(
        '/v1/stripe/create-token-card',
        payload
      )
      console.log(data)
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const sendSubscriptionSearch = (payload) => async (dispatch) => {
    console.log('entra al action busqueda de subscripcion', payload)
  
    try {
      const { data } = await apiBackend.get(
        `/v1/stripe-subscription?userToolId=${payload}`
      )
      console.log(data)
      dispatch(setSubscriptionSearched(data.data))
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const sendSubscriptionDelete = (payload) => async () => {
    console.log('entra al action eliminación de subscripcion', payload)
  
    try {
      const { data } = await apiBackend.delete(
        `/v1/stripe-subscription?subscriptionId=${payload}`
      )
      console.log(data)
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const sendPaymentDomain = (payload) => async (dispatch) => {
    console.log('entra al action pago de dominio', payload)
  
    try {
      const { data } = await apiBackend.post('/v1/stripe-payment', payload)
      console.log(data)
      if (data.data.status === 'succeeded') {
        console.log('entra al if para poner payment succeeded true')
        dispatch(setPaymentSucceeded(true))
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const sendAccountData = (payload) => async (dispatch) => {
    console.log('entra al action enviar datos para crear account', payload)
  
    try {
      const { data } = await apiBackend.post(
        '/v1/stripe-connected-account',
        payload
      )
      console.log(data.data.accountLink.url)
      dispatch(setAccountLink(data.data.accountLink.url))
      dispatch(setCurrentAccount(data.data.account))
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const sendProductAndPriceData = (payload) => async (dispatch) => {
    console.log('entra al action crear producto y precio', payload)
  
    try {
      const { data } = await apiBackend.post('/v1/stripe/create-product', payload)
      console.log(data.data)
  
      const priceData = await apiBackend.post('/v1/stripe/create-price', {
        product: data.data.product,
        ...payload
      })
      console.log('Price Data!!! --->>> ', priceData.data)
  
      if (payload.mode === 'subscription') {
        const subscriptionData = await apiBackend.post(
          '/v1/stripe/create-subscription',
          {
            product: data.data.product,
            priceObject: priceData.data.data,
            ...payload
          }
        )
  
        console.log('esto es subscription data', subscriptionData)
      } else {
        const freelancerPayment = await apiBackend.post(
          '/v1/stripe-connected-account/create-freelancer-payment',
          {
            product: data.data.product,
            priceObject: priceData.data.data,
            ...payload
          }
        )
  
        console.log(freelancerPayment.data.data)
  
        dispatch(setConnectedAccountPrice(priceData.data.data))
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const sendPaymentForConnectedAccount = (payload) => async (dispatch) => {
    console.log(
      'entra al action pagar producto creado por la cuenta conectada',
      payload
    )
  
    try {
      const { data } = await apiBackend.post(
        '/v1/stripe-connected-account/create-session',
        payload
      )
      console.log(data.data)
  
      dispatch(setClientSecret(data.data.client_secret))
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const getFreelancerPayment = (payload) => async (dispatch) => {
    console.log('entra al action busqueda de pagos de freelancers', payload)
  
    try {
      const { data } = await apiBackend.get(
        `/v1/stripe-connected-account/get-freelancer-payment?userId=${payload.userId}`
      )
  
      console.log(data.data.freelancerPayment)
  
      dispatch(setCurrentFreelancerPayment(data.data.freelancerPayment))
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const sendItemOfSubscriptionDelete = (payload) => async () => {
    console.log('entra al action eliminación de items de subscripcion', payload)
  
    try {
      const { data } = await apiBackend.delete(
        `/v1/stripe-subscription/delete-items-subscription?itemId=${payload}`
      )
      console.log(data)
    } catch (error) {
      throw new Error(error)
    }
  }
  
  export const sendCreateCapture = (payload) => async (dispatch) => {
    console.log('entra al action crear capura', payload)
  
    try {
      const { data } = await apiBackend.post(
        '/v1/stripe-connected-account/create-capture',
        payload
      )
      console.log(data.data)
      if (data.data) {
        dispatch(setLoader(true))
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  