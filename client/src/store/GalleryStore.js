import { makeAutoObservable } from 'mobx'

export default class GalleryStore {
  constructor() {
    this._galleryId = 0
    makeAutoObservable(this)
  }

  setGalleryId(id) {
    this._galleryId = id
  }

  get galleryId() {
    return this._galleryId
  }
}
