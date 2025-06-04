export const REGISTER_CUSTOMER = `
  mutation RegisterCustomer($input: SignUpInput!) {
    customerSignUp(input: $input) {
      success
      message
      accessToken
      tokenType
      expiresIn
    }
  }
`;
