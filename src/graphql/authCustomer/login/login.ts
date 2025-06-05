export const CUSTOMER_LOGIN = `
  mutation CustomerLogin($input: LoginInput!) {
    customerLogin(input: $input) {
      success
      message
      accessToken
      tokenType
      expiresIn
      customer {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
