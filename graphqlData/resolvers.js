import { DateTime } from '@okgrow/graphql-scalars';
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import { ObjectID } from 'mongodb'
const blogFacade = require('../facades/blogFacade')
const positionFacade = require('../facades/positionFacade')
const userFacade = require('../facades/userFacade')

export const resolvers = {

    DateTime,

    ObjectID: new GraphQLScalarType({ // GraphQL needs this to be able to handle the ObjectIDs' created from MongoDB
        name: 'ObjectID',
        description: 'The `ObjectID` scalar type represents a [`BSON`](https://en.wikipedia.org/wiki/BSON) ID commonly used in `mongodb`.',
        serialize (_id) {
          if (_id instanceof ObjectID) {
            return _id.toHexString()
          } else if (typeof _id === 'string') {
            return _id
          } else {
            throw new Error(`${Object.getPrototypeOf(_id).constructor.name} not convertible to `)
          }
        },
        parseValue (_id) {
          if (typeof _id === 'string') {
            return ObjectID.createFromHexString(_id)
          } else {
            throw new Error(`${typeof _id} not convertible to ObjectID`)
          }
        },
        parseLiteral (ast) {
          if (ast.kind === Kind.STRING) {
            return ObjectID.createFromHexString(ast.value)
          } else {
            throw new Error(`${ast.kind} not convertible to ObjectID`)
          }
        },
    }),
    
    // Queries
    getUsers: () => {
        return userFacade.getAllUsers()
    },
    getPositions: () => {
        return positionFacade.findAllPositions()
    },
    getLocationBlogs: () => {
        return blogFacade.getAllLocationBlogs();
    },
    findUserByUsername: ({username}) => {
        return userFacade.findByUserName(username)
    },

    // Mutations
    addUser: ({input}) => {
        return userFacade.addUser(input)
    },
    addLocationBlog: ({input}) => {
      console.log(input)
      return blogFacade.addLocationBlog(input)
    },
    likeLocationBlog: ({username, blogID}) => {
      return blogFacade.likeLocationBlogByID(username, blogID)
    }
};
