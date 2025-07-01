export const GET_PRODUCT_QUERY = `
  query GetProduct($id: ID!) {
  product(id: $id) {
    id
    sku
    name
    type
    parentId
    attributeFamilyId
    productNumber
    shortDescription
    description
    urlKey
    shareURL
    new
    featured
    status
    guestCheckout
    visibleIndividually
    metaTitle
    metaKeywords
    averageRating
    metaDescription
    price
    specialPrice
    specialPriceFrom
    specialPriceTo
    weight
    createdAt
    inventories {
      qty
    }
    reviews {
      id
      name
      comment
      name
      title
      rating
      createdAt
    }
    specialPrice
    specialPriceTo
    specialPriceFrom
    updatedAt
    priceHtml {
      formattedFinalPrice
    }
    images {
      url
    }
    videos {
      url
    }
    additionalData {
      id
      value
      code
      value
      label
    }
    crossSells {
      id
      name
      urlKey
      images {
        url
      }
      price
    }
    upSells {
      id
      name
      urlKey
      images {
        url
      }
      price
    }
    relatedProducts {
      id
      name
      urlKey
      images {
        url
      }
      price
    }
    downloadableLinks {
      id
      title
      price
    }
    downloadableSamples {
      id
      url
      fileUrl
      file
      fileName
    }
    booking {
      id
      type
      qty
      location
      showLocation
      availableEveryWeek
      availableFrom
      availableTo
      productId
       tableSlot {
        id
        priceType
        guestLimit
        duration
        breakTime
        preventSchedulingBefore
        sameSlotAllDays
        slots {
          id
          day
          from
          to
        }
        bookingProductId
      }
      defaultSlot {
        id
        bookingType
        duration
        breakTime
      }
      appointmentSlot {
        id
        duration
      }
      eventTickets {
        id
        price
      }
      rentalSlot {
        id
        rentingType
      }
    }
  }
}
`;
