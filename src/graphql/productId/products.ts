export const GET_PRODUCT_QUERY = `
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      isInWishlist
      shareURL
      price
       relatedProducts {
      id
      images {
        id
        url
      }
      price
      name
    }
       upSells {
      id
      name
       images {
        id
        url
      }
      price
    }

    crossSells {
      id
      name
       images {
        id
        url
      }
      price
    }
      images {
        url
      }
        videos {
     id
    url
   }
      categories {
        id
        name
      }
    }
  }
`;
