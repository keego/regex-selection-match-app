import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { HighlighterPageV1, HighlighterPageV2 } from '~pages/highlighter-page'

import { routes } from './routes'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to={routes.v1} replace />} />
      <Route path={routes.v1} element={<HighlighterPageV1 />} />
      <Route path={routes.v2} element={<HighlighterPageV2 />} />
    </Route>
  )
)

export function AppRouter() {
  return (
    <RouterProvider router={router} />
  )
}
