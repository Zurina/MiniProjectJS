import graphqlHTTP from 'express-graphql';
import { schema } from '../../graphqlData/schema';
import { resolvers } from '../../graphqlData/resolvers';
var express = require('express');
var graphiqlRouter = express.Router();

const root = resolvers;

graphiqlRouter.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

module.exports = graphiqlRouter