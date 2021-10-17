import { $host } from '.'

export const getArtPiecesQuery = async (query) => {
  try {
    const { data } = await $host.get(`/art${query}`)

    return data
  } catch (e) {
    console.log(e.response.data.message)
  }
}
