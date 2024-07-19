import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, Outlet, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'

import Home from './views/web'
import Search from './views/app/pages/Search'
import NotFound from './views/pages/NotFound'




const DynamicRoute = () => {
  return (
    <Routes>
      <Route path="/*" element={<Outlet />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path=":componentName" element={<DynamicComponentLoader />} />
      </Route>
    </Routes>
  );
};

export default DynamicRoute;


import {
  fetchAddon
} from '@/actions/addon'



const DynamicComponentLoader = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { addon, templates } = useSelector((state) => state.addon)

const [html, setHtml] = useState(null);
const [fetchsItemCompleted, setFetchsItemCompleted] = useState(false);


  
useEffect(() => {
  const fetchsItem = async () => {
    await dispatch(fetchAddon(id))
    setFetchsItemCompleted(true);
  }

  if (Object.keys(addon).length === 0) {
    fetchsItem()
  } else {
    setFetchsItemCompleted(true);
  }
}, [])




useEffect(() => {
  console.log('vv', templates)
  
  if(templates.length > 0){
    console.log('status active', templates)
    setHtml(templates[0].code)
  }
}, [templates])


  try {    
    return (
      <Suspense fallback={<div>Cargando...</div>}>
        <Component html={html}/>
      </Suspense>
    );
  } catch (error) {
    return <NotFound />;
  }
};



const Component = ({html}) => {
  return(
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}
