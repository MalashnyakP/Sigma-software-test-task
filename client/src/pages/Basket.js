import { useEffect, useState } from 'react'

import ArtGallerySection from '../components/ArtGallerySection'
import {
  getArtPiecesFromBasket,
  removeArtPieceToBasket,
} from '../http/basketApi'

const Basket = () => {
  const [artPieces, setArtPieces] = useState([])
  useEffect(() => {
    const fetch = async () => {
      setArtPieces(await getArtPiecesFromBasket())
    }

    fetch()
  }, [artPieces])

  const removeArtFromBasket = async (art_id) => {
    await removeArtPieceToBasket(art_id)
    setArtPieces(await getArtPiecesFromBasket())
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
