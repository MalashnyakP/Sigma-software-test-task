import { useEffect, useState } from 'react'

import { fetchUserGalleries } from '../http/userAPI'
import { addArtToGallery } from '../http/galleryAPI'

import './styles/AddArtPiece.css'

const AddArtPiece = () => {
  const [loading, setLoading] = useState(true)
  const [userGalleries, setUserGalleries] = useState()

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [year, setYear] = useState('')
  const [gallery_id, setGalleryId] = useState('')
  const [fileName, setFileName] = useState('')
  const [art, setArt] = useState('')

  useEffect(() => {
    fetchUserGalleries().then((galleries) => {
      setUserGalleries(galleries)
      setLoading(false)
    })
  }, [])

  const generateSelect = () => {
    return (
      <select onChange={(e) => setGalleryId(e.target.value)}>
        <option value="" selected disabled hidden>
          Choose from yours Galleries
        </option>
        {Object.values(userGalleries).map((gallery) => {
          return (
            <option value={gallery._id} key={gallery._id}>
              {gallery.name}
            </option>
          )
        })}
      </select>
    )
  }

  const addArtPieceClick = async () => {
    await addArtToGallery(name, price, year, art, gallery_id)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="addArtContainer">
      <label>Name</label>
      <input
        type="text"
        placeholder="Enter art piece name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Year</label>
      <input
        type="text"
        placeholder="Enter when art was made"
        name="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <label>Price</label>
      <input
        type="text"
        placeholder="Enter art's price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="file"
        placeholder="Select img for art"
        name="art"
        value={fileName}
        onChange={(e) => {
          setFileName(e.target.value)
          setArt(e.target.files[0])
        }}
        required
      />
      {generateSelect()}
      <button type="submit" onClick={addArtPieceClick} className="addArtBtn">
        Create
      </button>
    </div>
  )
}

export default AddArtPiece
