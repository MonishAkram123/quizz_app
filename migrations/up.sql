CREATE DATABASE IF NOT EXISTS quiz;
CREATE USER IF NOT EXISTS 'quiz_admin'@'localhost' IDENTIFIED BY 'admin_pass';
GRANT ALL PRIVILEGES ON quiz.* TO 'quiz_admin'@'localhost';

USE quiz;

CREATE TABLE IF NOT EXISTS students(id SERIAL PRIMARY KEY, username VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL);

CREATE TABLE IF NOT EXISTS questions(id SERIAL PRIMARY KEY, subject VARCHAR(50) NOT NULL, question_title TEXT NOT NULL, options BLOB NOT NULL, answer VARCHAR(100) NOT NULL);


-- Add questions here make sure options is a proper json object.
INSERT INTO questions(subject, question_title, options, answer) VALUES('Physics', 'Who is "Newton"?', '["You", "Me", "God\'s Will"]', 'God\'s Will');