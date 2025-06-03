export const GET_PRODUCT_QUERY = `
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
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
