# Section 5 Group 7

## Overview
We created the admin dashboard for the LibraLite web application using:
Typescript - Frontend
Firebase - Database
Express + Node - Backednd

## Tasks:
For our tasks we had to create a dashboard that allowed the following:
1. Allow for administrators to delete existing users, or accept/decline applicants
2. System metric overiew where administrators can see key metrics
3. Give a list of all the overdue books and the users who signed them out

## Installation and how to run the app
1. Clone the repository:
```bash
git clone https://github.com/RyanKhuu/CPS714-Section5.git
```
2. Intall the dependancies:
```bash
npm install
```
To run the app you have to make sure that the current working directory is the frontend folder.
```bash
cd frontend

npm run dev
```
## Web Pages Directory
All the webpages are located in Pages directory

## Components Directory
Files in the components are reusable components that can be used by other webpages

## Firebase Directory
Contains files that directly communicate with the Firebase database and their related functions

## Types Directory 
Holds the file that specifies the database table structure stored in firebase