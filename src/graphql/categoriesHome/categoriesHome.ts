export const GET_CATEGORIESHOME_QUERY = `
   query {
          homeCategories(getCategoryTree: true) {
            id
            name
            slug
            description
            logoUrl
            bannerUrl
            position
            metaTitle
            metaDescription
            metaKeywords
            children {
              id
              name
              slug
            }
          }
        }
`;
