import { Art, ArtGallery, Auth, Gallery, User } from './pages'
import { routesEnum } from './configs'

export const authRoutes = [
  {
    path: routesEnum.USER_ROUTE + '/:user_id',
    Component: User,
  },
]

export const publicRoutes = [
  {
    path: routesEnum.LOG_IN_ROUTE,
    Component: Auth,
  },
  {
    path: routesEnum.REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: routesEnum.ART_ROUTE + '/:art_id',
    Component: Art,
  },
  {
    path: routesEnum.ART_GALLERY_ROUTE,
    Component: ArtGallery,
  },
  {
    path: routesEnum.GALLERY_ROUTE + '/:galery_id',
    Component: Gallery,
  },
]
