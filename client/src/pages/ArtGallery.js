import { useEffect, useState } from 'react'

import { getArtPiecesQuery } from '../http/artPieceApi'
import { QueryBuilder } from '../utils/queryBuilder'
import ArtGallerySection from '../components/ArtGallerySection'

const ArtGallery = () => {
  const [loading, setLoading] = useState(true)
  const [artPieces, setArtPieces] = useState([])
  const [maxPage, setMaxPage] = useState('')
  const [page, setPage] = useState('')
  const [perPage, setPerPage] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const queryResult = await getArtPiecesQuery(query)
      console.log(queryResult)
      setArtPieces(queryResult.data)
      setMaxPage(queryResult.maxPages)
      setPage(queryResult.page)
      setPerPage(queryResult.perPage)

      setLoading(false)
    }

    fetch()
  }, [page, query])

  if (loading) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <ArtGallerySection artPieces={artPieces}></ArtGallerySection>
    </div>
  )
}

export default ArtGallery
