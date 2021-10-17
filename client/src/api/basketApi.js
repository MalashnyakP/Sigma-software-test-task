import { $host } from '.'

export const addArtPieceToBasket = async (art_id) => {
  try {
    const { data } = await $host.put(
      '/basket/add',
      { art_id },
      { headers: { Authorization: localStorage.getItem('access_token') } },
    )

    return data
  } catch (e) {
    console.log(e.response.data.message)
  }
}

export const removeArtPieceToBasket = async (art_id) => {
  try {
    const { data } = await $host.put(
      '/basket/remove',
      { art_id },
      { headers: { Authorization: localStorage.getItem('access_token') } },
    )

    return data
  } catch (e) {
    console.log(e.response.data.message)
  }
}

export const createUserBasket = async () => {
  try {
    const { data } = await $host.post(
      '/basket',
      {},
      { headers: { Authorization: localStorage.getItem('access_token') } },
    )

    return data
  } catch (e) {
    console.log(e.response.data.message)
  }
}

export const getUserBasket = async () => {
  try {
    const { data } = await $host.get('/basket', {
      headers: { Authorization: localStorage.getItem('access_token') },
    })

    return data
  } catch (e) {
    console.log(e.response.data.message)
  }
}

export const getArtPiecesFromBasket = async () => {
  try {
    const { data } = await $host.get('/art/art_from_basket', {
      headers: { Authorization: localStorage.getItem('access_token') },
    })

    return data
  } catch (e) {
    console.log(e.response.data.message)
  }
}
