import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query {
    countries {
      edges {
        node {
          name
          alpha3Code
          capital
          region
          population
          area
          timezones
          borders
          currencies {
            edges {
              node {
                name
                code
                symbol
              }
            }
          }
          languages {
            edges {
              node {
                name
              }
            }
          }
          flag
        }
      }
    }
  }
`;
