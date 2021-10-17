import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'

import { Context } from '..'
import { fetchGallery } from '../api/galleryAPI'

const Gallery = observer(() => {
  const [isLoading, setLoading] = useState(true)
  const [galleryState, setGalleryState] = useState()
  const { gallery } = useContext(Context)

  useEffect(() => {
    fetchGallery(gallery.galleryId).then((data) => {
      setGalleryState(data)
      setLoading(false)
    })
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const { name, location } = galleryState.data
  const owner = galleryState.data.user.name

  return (
    <div>
      <p>Name of Gallery: {`${name}`}</p>
      <p>Location: {`${location}`}</p>
      <p>Owner: {`${owner}`}</p>
    </div>
  )
})

export default Gallery
