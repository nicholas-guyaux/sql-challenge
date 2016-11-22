DROP DATABASE IF EXISTS blogsdata;
CREATE DATABASE blogsdata;

\c blogsdata;

CREATE TABLE blogs (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  blogdate VARCHAR,
  entry VARCHAR
);

INSERT INTO blogs (title, blogdate, entry)
  VALUES ('First entry', '21 Nov 2016', 'This is the first blog post');
