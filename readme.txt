I used a slightly (few months older) version of chakra ui for this since there was a really good tutorial on yt showing how to use it
Because of this when you install chakra ui you have to use the following commands to specify the older version:

(also all of this is done in the frontend folder)


//the . at the end is important as it creates makes everything in the current directory

\SportHive\frontend> npm create vite@latest . 
select React framework
select Javascript

npm i @chakra-ui/react@v2.10.3 @emotion/react @emotion/styled framer-motion
npm i @chakra-ui/icons@v2.1.1

npm i react-router-dom

npm i react-icons