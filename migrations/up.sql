CREATE DATABASE IF NOT EXISTS quiz;
CREATE USER IF NOT EXISTS 'quiz_admin'@'localhost' IDENTIFIED BY 'admin_pass';
GRANT ALL PRIVILEGES ON quiz.* TO 'quiz_admin'@'localhost';

USE quiz;

CREATE TABLE IF NOT EXISTS students(id SERIAL PRIMARY KEY, username VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL);

CREATE TABLE IF NOT EXISTS questions(id SERIAL PRIMARY KEY, subject VARCHAR(50) NOT NULL, question_title TEXT NOT NULL, options BLOB NOT NULL, answer VARCHAR(100) NOT NULL);


-- Add questions here make sure options is a proper json object.
INSERT INTO questions(subject, question_title, options, answer) VALUES('Physics', 'The speed of light(in mps) is?', '["3 x 10^5", "3 x 10^7", "3 x 10^8"]', '3 x 10^8');
INSERT INTO questions(subject, question_title, options, answer) VALUES('Physics', 'The value of Gravitational accelaration (in meter per second square) is?', '["10", "8.9", "9.8", "9"]', '9.8');
INSERT INTO questions(subject, question_title, options, answer) VALUES('Physics', 'Which of the following represents Ohm\'s Law', '["I = VR", "V = IR"]', 'V = IR');
INSERT INTO questions(subject, question_title, options, answer) VALUES('Physics', 'The speed of light will be minimum while passing through', '["Glass", "Air", "Water", "Vaccum"]', 'Glass');
INSERT INTO questions(subject, question_title, options, answer) VALUES('Physics', 'The speed of light will be maximum while passing through', '["Glass", "Air", "Water", "Vaccum"]', 'Vaccum');
