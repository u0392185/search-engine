const { AuthenticationError} = require('apollo-server-express');
const { User} = require('../models')
const { signToken } = require('../utils/auth')
var mongoose = require('mongoose');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {

            const foundUser = await User.findOne({
                $or: [{ _id: context.user?._id ? context.user._id : args.id }, { username: args.username }],
              })
                .select('-__v -password')

            return foundUser

            throw new AuthenticationError('Not logged in')
        },
        books: async () => {

            let found = Books.find()

            return found
        }
    },
    Mutation: {
        addUser: async (parent, args) => {

            const user = await User.create(args)

            if (!user) {
                throw new Error('Something is wrong creating user!');
            } 
            const token = signToken(user)
        
            return { token, user }
        },
        login: async (parent, { username, email, password }) => {

            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

            if(!user) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const correctPw = await user.isCorrectPassword(password)

            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user)

            return { token, user }
        },
        saveBook: async (parent, {username, input}) => {

            try {
              const updatedUser = await User.findOneAndUpdate(
                { username },
                { $addToSet: { savedBooks: input } },
                { new: true, runValidators: false }
              );

              return updatedUser;
            } catch (err) {
              console.log(err);

              throw new Error('Something is wrong saving a book!');
            }
        },
    }
  };
  

// const resolvers = {
//     Query: {
//         me: async (parent, args, context) => {
//             const foundUser = await User.findOne({
//                 $or: [{ _id: context.user?._id ? context.user._id : args.id }, { username: args.username }],
//               })
//                 .select('-__v -password')

//             throw new AuthenticationError('Not logged in')
            
//             return userData
//         },
//         books: async () => {

//             return Books.find()
//         }
//     },
//     Mutation: {
//         addUser: async (parent, args) => {
//             const user = await User.create(args)

//             if (!user) {
//                 throw new Error('Something is wrong creating user!');
//             } 
//             const token = signToken(user)
        
//             return { token, user }
//         },
//         login: async (parent, { username, email, password }) => {

//             const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

//             if(!user) {
//                 throw new AuthenticationError('Incorrect credentials')
//             }

//             const correctPw = await user.isCorrectPassword(password)

//             if(!correctPw){
//                 throw new AuthenticationError('Incorrect credentials')
//             }

//             const token = signToken(user)

//             return { token, user }
//         },
//         saveBook: async (parent, {id, body}) => {
//             console.log(user);
//             try {
//               const updatedUser = await User.findOneAndUpdate(
//                 { _id: id },
//                 { $addToSet: { savedBooks: body } },
//                 { new: true, runValidators: true }
//               );

//               return { updatedUser };
//             } catch (err) {
//               console.log(err);

//               throw new Error('Something is wrong saving a book!');
//             }
//         },
//         removeBook: async (parent, {user, args}) => {
//             const updatedUser = await User.findOneAndUpdate(
//                 { _id: user._id },
//                 { $pull: { savedBooks: { bookId: args.bookId } } },
//                 { new: true }
//             );

//             if (!updatedUser) {
//                 throw new Error('Something is wrong deleting book!');
//             }

//             return { updatedUser }
//         }
//     }
// }

module.exports = resolvers