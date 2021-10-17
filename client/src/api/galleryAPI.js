import { $authHost, $host } from './index'

export const createGallery = async (name, location) => {
  try {
    const { data } = await $host.post(
      '/user/createGallery',
      { name, location },
      { headers: { Authorization: localStorage.getItem('access_token') } },
    )

    return data._id
  } catch (e) {
    console.log(e.response.data.message)
  }
}

export const fetchGallery = async (gallery_id) => {
  try {
    const { data } = await $host.get(`/gallery/${gallery_id}`, {
      params: { gallery_id },
    })

    return { data }
  } catch (e) {
    console.log(e.response.data.message)
  }
}

export const addArtToGallery = async (name, price, year, art, gallery) => {
  try {
    const formData = new FormData()
    formData.append('art', art)
    formData.append('name', name)
    formData.append('price', price)
    formData.append('year', year)
    formData.append('gallery', gallery)

    const { data } = await $host.post('user/addArtPiece', formData, {
      headers: {
        Authorization: localStorage.getItem('access_token'),
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  } catch (e) {
    console.log(e.response.data.message)
  }
}
