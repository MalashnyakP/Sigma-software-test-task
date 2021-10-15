import Auth from './pages/Auth'
import Art from './pages/Art'
import ArtGallery from './pages/ArtGallery'
import {
  ART_ROUTE,
  ART_GALLERY_ROUTE,
  REGISTRATION_ROUTE,
  LOG_IN_ROUTE,
  GALLERY_ROUTE,
  USER_ROUTE,
} from './configs/routes.enum'
import Gallery from './pages/Gallery'
import User from './pages/User'

export const routes = [
  {
    path: USER_ROUTE,
    Component: User,
  },
  {
    path: LOG_IN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: ART_ROUTE + '/:art_id',
    Component: Art,
  },
  {
    path: ART_GALLERY_ROUTE,
    Component: ArtGallery,
  },
  {
    path: GALLERY_ROUTE + '/:galery_id',
    Component: Gallery,
  },
]
