import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"

import { Provider } from "react-redux"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { createRoot } from "react-dom/client"

import store from "@/utils/store"
import generateColors from "@/utils/colors"

import AddonView from "./views/app/pages/Addon/view"
import AddonApp from "./app.jsx"
import Test from "./test"

import Home from "./views/web"

const root = createRoot(document.getElementById("app"))

const Layout = () => {
  // ----------------------------------------------------------
  const [colorsLight, setColorsLight] = useState([])
  const [colorsDark, setColorsDark] = useState([])

  useEffect(() => {
    const color = localStorage.getItem("themeColor")
    let colors
    if (color) {
      colors = generateColors(color)
      setColorsLight(colors.light)
      setColorsDark(colors.dark)
    }
  }, [])

  return (
    <div>
      {colorsLight.length > 0 && (
        <style>
          {`
          :root{
            ${colorsLight.map((color, index) => `--color-primary-${index}: ${color};`).join("\n")}
          }
          body.dark-mode{
            ${colorsDark.map((color, index) => `--color-primary-${index}: ${color};`).join("\n")}
          }
        `}
        </style>
      )}

      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path={`/test`} element={<Test />} />
              <Route path={`/:lng/*`} element={<AddonApp />} />
              <Route path="/" element={<Home />} />

              <Route
                path="/addon/:addonId/:templateId/*"
                element={<AddonView />}
              />
            </Routes>
          </BrowserRouter>
        </Provider>
      </DndProvider>
    </div>
  )
}

root.render(<Layout />)
