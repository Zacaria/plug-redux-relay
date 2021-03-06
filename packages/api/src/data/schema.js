import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

import {
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  getCounter,
  getCounters,
  incrementCounter,
  decrementCounter,
} from './data';

/**
 * We get the node interface and field from the relay library.
 *
 * The first method is the way we resolve an ID to its object. The second is the
 * way we resolve an object that implements node to its type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    // console.log('globale', globalId);
    const { type, id } = fromGlobalId(globalId);
    // console.log('TOTO', type, id);
    return getCounter(id);
  },
  obj => {
    // console.log('plop', obj);
    return GraphQLCount;
  }
);

const GraphQLCount = new GraphQLObjectType({
  name: 'Count',
  fields: () => ({
    id: globalIdField(),
    myId: {
      type: GraphQLString,
    },
    value: {
      type: GraphQLInt,
      resolve: (c, a, t) => {
        // console.log('PPPPPPP', c, a);
        return c.value;
      },
    },
    all: {
      type: new GraphQLList(GraphQLCount),
      resolve: () => getCounters(),
    },
  }),
  interfaces: [nodeInterface],
});

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    counters: {
      type: new GraphQLList(GraphQLCount),
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: (obj, args) => (args.id ? getCounter(args.id) : getCounters()),
    },
    node: nodeField,
  }),
});

const GraphQLIncrementMutation = new mutationWithClientMutationId({
  name: 'Increment',
  inputFields: {
    myId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    count: {
      type: new GraphQLList(GraphQLCount),
      resolve: mutated => getCounter(mutated[0].myId),
    },
  },
  mutateAndGetPayload: ({ myId }) =>
    incrementCounter(myId).filter(c => c.myId === myId),
});

const GraphQLDecrementMutation = new mutationWithClientMutationId({
  name: 'Decrement',
  inputFields: {
    myId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    count: {
      type: new GraphQLList(GraphQLCount),
      resolve: mutated => getCounter(mutated[0].myId),
    },
  },
  mutateAndGetPayload: ({ myId }) =>
    decrementCounter(myId).filter(c => c.myId === myId),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    increment: GraphQLIncrementMutation,
    decrement: GraphQLDecrementMutation,
  },
});

const schema = new GraphQLSchema({
  query: Root,
  mutation: Mutation,
});

export default schema;
