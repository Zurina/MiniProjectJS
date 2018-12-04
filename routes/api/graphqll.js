import graphqlHTTP from 'express-graphql';
import { schema } from '../../graphqlData/schema';
import { resolvers } from '../../graphqlData/resolvers';
var express = require('express');
var graphqlRouter = express.Router();

const root = resolvers;

graphqlRouter.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

module.exports = graphqlRouter
