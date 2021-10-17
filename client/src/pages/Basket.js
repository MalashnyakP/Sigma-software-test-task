import { useEffect, useState } from 'react'

import ArtGallerySection from '../components/ArtGallerySection'
import {
  getArtPiecesFromBasket,
  removeArtPieceToBasket,
} from '../http/basketApi'

const Basket = () => {
  const [artPieces, setArtPieces] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const artPiecesFromBasket = await getArtPiecesFromBasket()

      setArtPieces(artPiecesFromBasket)
    }
    setLoading(false)
    fetch()
  }, [artPieces])

  const removeArtFromBasket = async (art_id) => {
    await removeArtPieceToBasket(art_id)
    setArtPieces(await getArtPiecesFromBasket())
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <ArtGallerySection
        artPieces={artPieces}
        buttonClick={removeArtFromBasket}
        buttonText="Remove"
      ></ArtGallerySection>
    </div>
  )
}

export default Basket
