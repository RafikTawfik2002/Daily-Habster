#!/bin/zsh

#Shell script to run both the backend and the frontend with one command

echo "\n**************DEV****************DEV*********\n"

cd backend
npm run dev &
cd ..
cd frontend
npm run dev

echo "\n**************DEV****************DEV*********\n"