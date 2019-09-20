import { gql } from "apollo-boost";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
    selectedComponent: String
  }

  # extend type Pedal {
  #   selectedComponent: Knob
  # }

  extend type Mutation {
    updateSelectedComponent(id: String): String
  }
`;

export const resolvers = {
  Mutation: {
    updateSelectedComponent: (root, args, { cache }) => {
      cache.writeData({ data: { selectedComponent: args.id } });
    }
  }
};
