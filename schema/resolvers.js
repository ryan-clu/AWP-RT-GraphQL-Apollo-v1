const { UserList, MovieList } = require("../FakeData");
const _ = require('lodash');

const resolvers = {
    Query: {
        // USER RESOLVERS
        users: (parent, args) => {
            return UserList;
        },

        user: (parent, args) => {
            const id = args.id;
            const user = _.find(UserList, {id: Number(id)});
            return user;
            // * Code below functions same as above! *
            // const user = UserList.find(user => user.id === Number(args.id))
            // return user;
        },

        // MOVIE RESOLVERS
        movies: (parent, args) => {
            return MovieList;
        },

        movie: (parent, args) => {
            const movieName = args.name;
            const movie = _.find(MovieList, {name: movieName});
            return movie
        }
    },

    User: {
        favoriteMovies: () => {
          return _.filter(
            MovieList,
            (movie) =>
              movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
          );
        },
    },

    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            // const lastId = UserList[UserList.length - 1].id;
            // user.id = lastId + 1;
            user.id = UserList.length + 1;
            UserList.push(user);
            return user;
        },

        updateUsername: (parent, args) => {
            const { id, newUsername } = args.input;
            let updUser;
            UserList.forEach((user) => {
                if(user.id === Number(id)){
                    user.username = newUsername
                    updUser = user;
                }
            });
            return updUser;
        },

        deleteUser: (parent, args) => {
            const id = args.id;
            _.remove(UserList, (user) => user.id === Number(id));
            return null;
        }
    },
};

module.exports = { resolvers };

// Ryan's notes below...

/*

Functions that exist inside our API. All the functions 
that make calls to databases, functions that decide what 
we return to the front end, all the functions that do something inside our API will exist
in this resolvers object.

*/