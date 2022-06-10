import React, { useState } from "react";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      username
      age
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData, loading: movieLoading, error: movieError } = useQuery(QUERY_ALL_MOVIES);

  const [fetchMovie, { data: movieSearchedData, error: movieSearchedError }] = useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading && movieLoading) {
    return <h1> DATA IS LOADING... </h1>;
  }
  if (error) {
    console.log(error);
  }
  if (movieError) {
    console.log(movieError);
  }
  if (movieSearchedError) {
    console.log(movieSearchedError);
  }

  return (
    <div>
      <h1>List of Users</h1>
      <ol>
        {data && data.users.map((user) => {
          return (
            <li key={user.name}>
              <div>Name: {user.name}</div>
              <div>Username: {user.username}</div>
              <div>Age: {user.age}</div>
              <div>Nationality: {user.nationality}</div>
            </li>
          );
        })}
      </ol>
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Nationality"
          onChange={(event) => {
            setNationality(event.target.value.toUpperCase());
          }}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name: name, username: username, age: Number(age), nationality: nationality },
              },
            });

            refetch();
          }}
        >
          Create User
        </button>
      </div>

      <h1>List of Movies</h1>
      <ol>
        {movieData && movieData.movies.map((movie) => {
          return (
            <li>
              <div>Movie: {movie.name}</div>
            </li>
          );
        })}
      </ol>

      <h2>Find a movie</h2>
      <div>
        <input
          type="text"
          placeholder="Movie Title Here"
          onChange={(event) => {
            setMovieSearched(event.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            });
          }}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h1>MovieName: {movieSearchedData.movie.name}</h1>
              <h1>
                Year Of Publication: {movieSearchedData.movie.yearOfPublication}
              </h1>
              <h1>
                In Theaters: {movieSearchedData.movie.isInTheaters ? 'True':'False'}
              </h1>
            </div>
          )}
          {movieSearchedError && <h1> There was an error fetching the data</h1>}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
