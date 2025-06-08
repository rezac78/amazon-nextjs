export const ADD_TO_WISHLIST_MUTATION = `
  mutation AddToWishlist($productId: ID!) {
    addToWishlist(productId: $productId) {
      success
      message
    }
  }
`;
export const REMOVE_FROM_WISHLIST_MUTATION = `
  mutation RemoveFromWishlist($productId: ID!) {
    removeFromWishlist(productId: $productId) {
      success
      message
    }
  }
`;
export const GET_WISHLIST_QUERY = `
 query {
  wishlists {
    data {
      product {
        id
        name
        price
        isInWishlist
        images {
          url
        }
      }
    }
  }
}

`;
