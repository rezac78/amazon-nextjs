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
export const ADD_TO_COMPARE_MUTATION = `
mutation AddToCompare($productId: ID!) {
    addToCompare(productId: $productId) {
      success
      message
    }
  }
`;
export const LIST_COMPARE_QUERY = `
  query GetCompareProducts($page: Int, $first: Int) {
    compareProducts(page: $page, first: $first) {
      data {
        product {
      id
        name
        description
        price
        weight
        images {
          id
          url
        }
      }
      }
      paginatorInfo {
        currentPage
        lastPage
        total
        hasMorePages
      }
    }
  }
`;
export const REMOVE_FROM_COMPARE_MUTATION = `
  mutation RemoveProductFromCompare($productId: ID!) {
    removeFromCompareProduct(productId: $productId) {
      success
      message
    }
  }
`;
export const REMOVE_ALL_COMPARE_MUTATION = `
  mutation {
    removeAllCompareProducts {
      success
      message
    }
  }
`;
