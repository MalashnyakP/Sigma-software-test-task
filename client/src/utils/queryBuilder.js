class QueryBuilder {
  perPage(_perPage) {
    this.perPage = _perPage
    return this
  }

  page(_page) {
    this.page = _page
    return this
  }

  sortBy(_sortBy) {
    this.sortBy = _sortBy
    return this
  }

  sortDir(_sortDir) {
    this.sortDir = _sortDir
    return this
  }

  priceGte(_priceGte) {
    this.priceGte = _priceGte
    return this
  }

  priceLte(_priceLte) {
    this.priceLte = _priceLte
    return this
  }

  yearGte(_yearGte) {
    this.yearGte = _yearGte
    return this
  }

  yearLte(_yearLte) {
    this.yearLte = _yearLte
    return this
  }

  build() {
    console.log(this)
    const query = Object.keys(this)
      .filter((key) => this[key])
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(this[key])}`,
      )
      .join('&')
    console.log(query)
    return `?${query}`
  }
}

export default QueryBuilder
