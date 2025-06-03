export const GET_PRODUCT_QUERY = `
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
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
