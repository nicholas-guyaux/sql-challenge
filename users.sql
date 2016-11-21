DROP DATABASE IF EXISTS sqlChallenge;
CREATE DATABASE sqlChallenge;

\c sqlChallenge;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR
);

INSERT INTO users (name, email, password)
  VALUES ('Nick', 'nick@demo.com', 'bobisgreat');
