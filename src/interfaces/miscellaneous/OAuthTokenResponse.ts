export default interface OAuthTokenResponse {
  access_token: string,
  token_type: "Bearer",
  expires_in: number,
}
