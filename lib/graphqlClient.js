import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://countries.trevorblades.com/graphql");
// Rick and Morty 
// const client = new GraphQLClient("https://rickandmortyapi.com/graphql");



export default client;