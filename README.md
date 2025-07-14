
### ** UFO Sightings Dashboard Project **

   Built with  React + TypeScript + Vite and redux Toolkit
   The chart can navigate through weekly grouped sightings and to be view in bar char.


# Features

- Weekly grouped bar chart using Recharts
- Date range navigation (Previous / Next Week)
- State management with Redux Toolkit
- Unit tested with Vitest & Testing Library
- Styled with Tailwind CSS
- Graceful handling of missing data
- Component-based architecture

The Vite dev server is avaiable at http://localhost:5173/

Following as: 

# Installation
  cd ufo-dashboard
  npm install
  npm start

# Run tests: 
  npm test


## References:
 This project was built using a combination of modern frontend tools and carefully selected resources. Below are the key references that guided me to built of the UFO Sightings Dashboard:
# Tailwind CSS
  I decided to use Tailwind CSS for UFO Sightings Dashboard. It gives me a clean design and works beautifully with charting libraries and React components.
  [Tailwind Play ](https://play.tailwindcss.com/)
  [Install Tailwind CSS with Create React App - Tailwind CSS](https://v3.tailwindcss.com/docs/guides/create-react-app)  version 3.4.1

# React and Redux Toolkit
https://redux.js.org/introduction/installation/

# Recharts 

  I used Recharts to display the UFO sightings data in a bar chart format. Recharts is a React-based charting library that makes it easy to create responsive and customizable data visualizations.
  https://recharts.org/en-US/api/BarChart
  https://www.geeksforgeeks.org/reactjs/create-a-bar-chart-using-recharts-in-reactjs/

# Group sightings by week 
  I have used the date-fns library to format dates into a readable form, calculate the start and end of each week, 
  for a day = 24 * 60 * 60 * 1000 = 86,400,000 milliseconds 
  Adds 6 * 86,400,000 milliseconds (which = 6 days) to get Sunday of that week
  
  and group the UFO sightings by each day of the week to makes it easier to work with dates in JavaScript.
  https://date-fns.org/v4.1.0/docs/getSeconds

  I used for loop and push method in with ternanry operator to be able to get all days of the week, the days with data and without data.
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push

# Testing Unit & Component Tests
  Vitest and React Testing Library were used to test components like groupSightingsByWeek and WeekNavigator.
    Run tests: 
    npm test

# TypeScript Instead of JavaScript
  I have used TypeScript via --template typescript.
  Using TypeScript helped me catch bugs earlier and define types for fetched API responses and component props.

# Loading & Error States
  I have used loaders while fetching data, and show a message (“Failed to fetch sightings”) on failure.
  
# Responsive layout that works on smaller screens.
  This dashboard is fully responsive and optimized for different screen sizes.
  When the window is resized or minimized, the layout adjusts gracefully.
  Users can scroll vertically to access content (like charts and navigation) even on smaller screens.
  
# State and Navigation in Main App 
  Including the following features:

Fetching data using the useEffect hook to retrieve UFO sightings from the API
https://legacy.reactjs.org/docs/hooks-effect.html

Determining which week to show on the chart

Navigating between weeks using "Previous" and "Next" buttons
– Button disabling is managed using the currentWeekIndex
– The currentWeekStart state is updated to allow users to move between weeks
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toDateString
    

