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

            if(!foundUser){

                throw new AuthenticationError('Not logged in')
            }

            return foundUser
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
        removeBook: async (parent, {username, bookId}) => {
            try{
                const updatedUser = await User.findOneAndUpdate(
                    { username },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );

                return updatedUser
            } catch (err) {
                throw new Error('Something is wrong deleting book!');
            }
        }
    }
  };

module.exports = resolvers