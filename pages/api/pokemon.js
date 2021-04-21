import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client'

const createApolloClient = () => {
    return new ApolloClient({
      link: new createHttpLink({
        uri: 'https://winter-tree.ap-south-1.aws.cloud.dgraph.io/graphql',
      }),
      cache: new InMemoryCache(),
    })
}
  

const apolloClient = createApolloClient();


const GET_POKEMONS = gql`
    query {
        queryPokemon {
        id
        name
        imgUrl
        pokemonTypes
        captured
        }
    }`; 
  

export default async function handler(req, res) {
    try {
        const { data } = await apolloClient.query({
            query: GET_POKEMONS,
        })

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({ data })

    } catch (error) {
        console.error(error);
        res.status(error.status || 500).end(error.message);
    }
}
