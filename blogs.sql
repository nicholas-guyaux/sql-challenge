DROP DATABASE IF EXISTS sqlChallenge;
CREATE DATABASE sqlChallenge;

\c sqlChallenge;

CREATE TABLE blogs (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  date VARCHAR,
  entry VARCHAR
);

INSERT INTO blogs (title, date, entry)
  VALUES ('First entry', '21 Nov 2016', 'This is the first blog post');
