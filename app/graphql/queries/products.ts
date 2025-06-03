export const PRODUCTS_QUERY = `
  query Products($page: Int!, $limit: Int!) {
    products(input: { page: $page, limit: $limit }) {
      paginatorInfo {
        count
        total
        currentPage
        lastPage
      }
      data {
        id
        name
        price
        images {
          id
          url
        }
        status
        averageRating
      }
    }
  }
`;
