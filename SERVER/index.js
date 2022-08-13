const { ApolloServer, gql } = require('apollo-server');
const typeDefs =require('./schema/schema');
const mongoose=require("mongoose");
const resolvers =require("./resolver");
const jwt = require('jsonwebtoken');
const {User, Admin} = require("./model/model");

const setHttpPlugin = {
    async requestDidStart() {
        return {
            async willSendResponse({ response }) {
                response.http.headers.set('Custom-Header', 'hello');
                if (response?.errors?.[0]?.message==="User already exists with that email") {
                    response.http.status = 408;
                }
            }
        };
    }
};

const app = new ApolloServer({
    typeDefs,
    resolvers,
    // plugins: [setHttpPlugin],
    context: async ({ req }) => {
        const token = req.headers.authorization.split('Bearer ')[1] || '';
        let user ;
        if(token){
            user = await jwt.verify(token, "akshay");
        }
        return {user};
    },
    dataSources:()=>{
        return {
            User: User,
            Admin: Admin,
        }
    },
});


app.listen().then(() => {
    console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `);
});

mongoose.connect("mongodb://localhost:27017",{useNewUrlParser: true});
let conn = mongoose.connection;
conn.on('connected', function () {
    console.log('database is connected successfully');
});
conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
});
conn.on('error', console.error.bind(console, 'connection error:'));

