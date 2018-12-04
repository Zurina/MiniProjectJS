import { resolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import { buildSchema } from 'graphql';

const schema = buildSchema(`

    scalar DateTime
    scalar ObjectID

    type User {
        username: String!
        password: String
        firstname: String
        lastname: String
        email: String
        created: DateTime
        lastUpdated: DateTime
        jobs: [Job]
    }

    input UserInput {
        username: String!
        password: String!
        firstname: String!
        lastname: String
        email: String!
        created: DateTime
        lastUpdated: DateTime
        jobs: [JobInput]
    }

    type Job {
        type: String
        company: String
        companyUrl: String
    }

    input JobInput {
        type: String
        company: String
        companyUrl: String
    }

    type LocationBlog {
        info: String
        pos: Location
        author: ObjectID
        likedBy: [ObjectID]
        created: DateTime
    }

    input LocationBlogInput {
        info: String!
        pos: LocationInput!
        author: ObjectID!
        likedBy: [ObjectID]
        created: DateTime
    }

    type Location {
        longitude: Int
        latitude: Int
    }

    input LocationInput {
        longitude: Int
        latitude: Int
    }

    type PositionLocation {
        coordinates: [Int]
    }

    type Position {
        user: ObjectID
        created: DateTime
        loc: PositionLocation
    }

    type Query {
        findUserByUsername(username: String!): User
        getUsers: [User]
        getLocationBlogs: [LocationBlog]
        getPositions: [Position]
    }

    type Mutation {
        addUser(input: UserInput): User
        addLocationBlog(input: LocationBlogInput): LocationBlog
        likeLocationBlog(username: String, blogID: ObjectID): LocationBlog
    }
`);

// const schema = makeExecutableSchema({ typeDefs, resolvers});

export { schema };
