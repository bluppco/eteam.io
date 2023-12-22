export const endpointFetch = ( environment ) => {

    return environment === "staging" ? "https://staging.api.bellmanagency.blupp.co" : "https://api.bellmanagency.blupp.co"

}
