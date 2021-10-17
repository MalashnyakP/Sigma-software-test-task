import { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'

import { LOG_IN_ROUTE } from '../configs/routes.enum'
import {
  addArtPieceToBasket,
  createUserBasket,
  getUserBasket,
} from '../http/basketApi'
import { getArtPiecesQuery } from '../http/artPieceApi'
import QueryBuilder from '../utils/queryBuilder'
import ArtGallerySection from '../components/ArtGallerySection'

import './styles/ArtGallery.css'
import { Context } from '..'

const ArtGallery = () => {
  const { user } = useContext(Context)
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [artPieces, setArtPieces] = useState([])
  const [maxPage, setMaxPage] = useState('')
  const [page, setPage] = useState('')

  const [yearGte, setYearGte] = useState('')
  const [yearLte, setYearLte] = useState('')
  const [priceGte, setPriceGte] = useState('')
  const [priceLte, setPriceLte] = useState('')

  const [perPage, setPerPage] = useState('5')
  const [query, setQuery] = useState('')

  const queryBuilder = new QueryBuilder()

  const addArtToBasketClick = async (art_id) => {
    if (!user.isAuth) {
      history.push(LOG_IN_ROUTE)
      return
    }

    let basket = await getUserBasket()

    if (!basket.art_pieces) {
      console.log(art_id)

      basket = await createUserBasket()
    }

    await addArtPieceToBasket(art_id)
  }

  useEffect(() => {
    const fetch = async () => {
      const queryResult = await getArtPiecesQuery(query)

      setArtPieces(queryResult.data)
      setMaxPage(queryResult.maxPages)
      setPage(queryResult.page)
      setPerPage(queryResult.perPage)

      setLoading(false)
    }
    fetch()
  }, [query])

  if (loading) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <div className="queryContainer">
        <label>Price</label>
        <input
          type="number"
          name="priceGte"
          placeholder="from"
          min="0"
          onChange={(e) => {
            setPriceGte(e.target.value)
          }}
        />
        <input
          type="number"
          name="priceLte"
          placeholder="to"
          min="0"
          onChange={(e) => {
            setPriceLte(e.target.value)
          }}
        />

        <label>Year</label>
        <input
          type="number"
          name="yearGte"
          placeholder="from"
          min="0"
          onChange={(e) => {
            setYearGte(e.target.value)
          }}
        />
        <input
          type="number"
          name="yearLte"
          placeholder="to"
          min="0"
          onChange={(e) => {
            setYearLte(e.target.value)
          }}
        />
        <select
          onChange={(e) => {
            setPerPage(e.target.value)
          }}
        >
          <option disabled>Show per page</option>
          <option value="5">5</option>
          <option value="20" selected>
            20
          </option>
          <option value="50">50</option>
        </select>
        <button
          type="submit"
          className="searchBtn"
          onClick={() => {
            queryBuilder.priceLte(priceLte)
            queryBuilder.priceGte(priceGte)
            queryBuilder.perPage(perPage)
            queryBuilder.yearLte(yearLte)
            queryBuilder.yearGte(yearGte)

            setQuery(queryBuilder.build())
          }}
        >
          Search
        </button>
      </div>

      <ArtGallerySection
        artPieces={artPieces}
        buttonClick={addArtToBasketClick}
        buttonText="Buy"
      ></ArtGallerySection>
      <Pagination
        count={maxPage}
        size="small"
        onChange={(e, page) => {
          queryBuilder.priceLte(priceLte)
          queryBuilder.priceGte(priceGte)
          queryBuilder.perPage(perPage)
          queryBuilder.yearLte(yearLte)
          queryBuilder.yearGte(yearGte)
          setPage(page)
          queryBuilder.page(page)
          setQuery(queryBuilder.build())
        }}
      />
    </div>
  )
}

export default ArtGallery
