DROP DATABASE IF EXISTS blog;
CREATE DATABASE blog;

\c blog;

CREATE TABLE blogs (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  blogdate VARCHAR,
  entry VARCHAR
);

INSERT INTO blogs (title, blogdate, entry)
  VALUES ('First entry', '21 Nov 2016', 'This is the first blog post');
