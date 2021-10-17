import Auth from '../pages/Auth'
import ArtGallery from '../pages/ArtGallery'
import {
  ART_GALLERY_ROUTE,
  CREATE_GALLERY,
  REGISTRATION_ROUTE,
  LOG_IN_ROUTE,
  GALLERY_ROUTE,
  USER_ROUTE,
  ADD_ART_PIECE,
  UPDATE_USER,
  BASKET,
} from '../configs/routes.enum'
import Gallery from '../pages/Gallery'
import User from '../pages/User'
import CreateGallery from '../pages/CreateGallery'
import AddArtPiece from '../pages/AddArtPiece'
import UpdateUser from '../pages/UpdateUser'
import Basket from '../pages/Basket'

export const authRoutes = [
  {
    path: BASKET,
    Component: Basket,
  },
  {
    path: UPDATE_USER,
    Component: UpdateUser,
  },
  {
    path: ADD_ART_PIECE,
    Component: AddArtPiece,
  },
  {
    path: CREATE_GALLERY,
    Component: CreateGallery,
  },
  {
    path: USER_ROUTE,
    Component: User,
  },
]

export const publicRoutes = [
  {
    path: LOG_IN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },

  {
    path: ART_GALLERY_ROUTE,
    Component: ArtGallery,
  },
  {
    path: GALLERY_ROUTE,
    Component: Gallery,
  },
]
