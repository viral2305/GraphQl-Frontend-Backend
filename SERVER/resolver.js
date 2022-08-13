const jwt = require('jsonwebtoken');
const {AuthenticationError} = require("apollo-server-errors");

const resolvers = {
    Query: {
        users: async (_,{},context) => {
            if (!context.user) throw new AuthenticationError('you must be logged in','401');
            return context.dataSources.User.find()
        },
    },
    Mutation: {
        checkAdmin: async (_, {newAdmin}, context) => {
            if (!context.user) {
                console.log("newAdmin-->", newAdmin);
                const user = await context.dataSources.Admin.findOne({email: newAdmin.email});
                const data = {
                    email: newAdmin.email,
                    password: newAdmin.password,
                    token: await jwt.sign(newAdmin.email, 'akshay')
                };
                if (user) {
                    if(user.password===newAdmin.password){
                    return data
                    }else{
                        throw new AuthenticationError('Enter correct password!');
                    }
                } else {
                    throw new Error("Admin not found.")
                }
            }
        },
        createUser: async (_, {userNew}, context) => {
            if (context.user) {
                console.log("userNew-->", userNew);
                const user = await context.dataSources.User.findOne({email: userNew.email});
                if (user) {
                    throw new Error("User already exists with that email")
                }
                const newUser = new context.dataSources.User({
                    ...userNew
                });

                return newUser.save()
            }
        },
        deleteUser: async (_, {removeUser}, context) => {
            if (context.user) {
                console.log("removeUser-->", removeUser);
                const user = await context.dataSources.User.findById(removeUser.id);
                if (!user) {
                    throw new Error("User Not found!")
                }
                await context.dataSources.User.findByIdAndDelete(removeUser.id);
                return removeUser
            }
        },
    }
};

module.exports = resolvers;
