const ArtPiece = require('../models/ArtPiece');

module.exports = {
    artPiecesSearchQuery: async (query) => {
        const {
            perPage = 20, page = 1, sortBy = 'createdAt', orderBy = 'asc', ...filters
        } = query;

        const searchQuery = {};
        const skip = perPage * (page - 1);
        const sortOrder = orderBy === 'asc' ? 1 : -1;

        const keys = Object.keys(filters);

        keys.forEach((key) => {
            switch (key) {
                case 'priceGte':
                    searchQuery.price = { ...searchQuery.price, $gte: Number(query[key]) };
                    break;

                case 'priceLte':
                    searchQuery.price = { ...searchQuery.price, $lte: Number(query[key]) };
                    break;

                case 'yearGte':
                    searchQuery.year = { ...searchQuery.year, $gte: Number(query[key]) };
                    break;

                case 'yearLte':
                    searchQuery.year = { ...searchQuery.year, $lte: Number(query[key]) };
                    break;

                default:
                    searchQuery[key] = query[key];
            }
        });

        const artPieces = await ArtPiece.find(searchQuery).limit(+perPage).skip(skip).sort({ [sortBy]: sortOrder });

        const countDocuments = await ArtPiece.countDocuments(searchQuery);

        return {
            data: artPieces,
            perPage,
            page,
            countDocuments,
            maxPages: Math.ceil(countDocuments / perPage)
        };
    }
};
