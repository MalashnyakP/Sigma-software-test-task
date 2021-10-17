import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { createGallery } from '../http/galleryAPI'
import { Context } from '..'
import { GALLERY_ROUTE } from '../configs/routes.enum'

import './styles/CreateGallery.css'

const CreateGallery = () => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const history = useHistory()
  const { gallery } = useContext(Context)

  const createGalleryClick = async () => {
    const gallery_id = await createGallery(name, location)

    gallery.setGalleryId(gallery_id)

    history.push(GALLERY_ROUTE)
  }

  return (
    <div className="addGallContainer">
      <label>Name</label>
      <input
        type="text"
        placeholder="Enter gallery name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      ></input>
      <label>Location</label>
      <input
        type="text"
        placeholder="Enter gallery location"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      ></input>
      <button type="submit" onClick={createGalleryClick} className="addGalBtn">
        Create
      </button>
    </div>
  )
}

export default CreateGallery
