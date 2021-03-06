import '../styles/ArtGallerySection.css'

// eslint-disable-next-line react/prop-types
const ArtGallerySection = ({ artPieces, buttonClick, buttonText }) => {
  const createGrid = () => {
    if (!artPieces) {
      return <h4>Yours basket is empty</h4>
    }

    return Object.values(artPieces).map((artPiece) => {
      return (
        <article key={artPiece._id}>
          <div className="imageBorder">
            <img src={artPiece.art} />
          </div>
          <h2>{artPiece.name}</h2>
          <h5>{artPiece.year} year</h5>
          <h5>$ {artPiece.price}</h5>

          <button
            className="buyButton"
            onClick={() => buttonClick(artPiece._id)}
          >
            {buttonText}
          </button>
        </article>
      )
    })
  }

  return <div className="container">{createGrid()}</div>
}

export default ArtGallerySection
