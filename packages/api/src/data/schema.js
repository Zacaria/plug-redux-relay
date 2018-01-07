import { GraphQLInt, GraphQLObjectType, GraphQLSchema } from 'graphql';

import {
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    return {
      id: 2,
      value: 10,
    };
  },
  obj => {
    return GraphQLCount;
  }
);

const GraphQLCount = new GraphQLObjectType({
  name: 'Count',
  fields: {
    id: globalIdField('Count'),
    value: {
      type: GraphQLInt,
      resolve: () => 12,
    },
  },
  interfaces: [nodeInterface],
});

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLCount,
      resolve: () => ({
        count: 0,
      }),
    },
    counter: nodeField,
  },
});

const GraphQLIncrementMutation = new mutationWithClientMutationId({
  name: 'Increment',
  outputFields: {
    count: {
      type: GraphQLCount,
      resolve: () => ({
        value: 0,
      }),
    },
  },
  mutateAndGetPayload: () => {
    return ({
      value: 1,
    });
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    increment: GraphQLIncrementMutation,
    //decrement: GraphQLDecrementMutation,
  },
});

const schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation,
});

export default schema;
