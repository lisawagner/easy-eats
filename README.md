# Easy Eats - :sparkles: Simple Recipe App :sparkles:

Concept site: Home cooking, easy and quick recipes.

### Features
- Users can view and create new recipe cards :heavy_check_mark:
- Dark and light mode toggle :heavy_check_mark:
- Theme selector buttons :heavy_check_mark:
- Search recipes component :heavy_check_mark:
- Basic CRUD functionality. Create recipes, read, delete, and update recipes set up. :heavy_check_mark:
- Custom hooks: `useFetch` for GET & POST data, `useTheme` for theme context :heavy_check_mark:

### Technology

- React 18
- React Router 6
- JSON Server: Initial dev server
- Google Firebase BaaS (Backend-as-a-Service): NoSQL database

## :sparkler: Project Scope :sparkler:

On the landing page, viewers can immediately see recipe cards. No need to dig through long-winded ad copy to locate the desired recipe. When user clicks a recipe card, they go to a detailed component page, containing ingredients and recipe details.

New recipes can be added easily with a 'new recipe' component. Site viewers can see the completed cards and details to make Easy Eats recipes.

[TODO: Add auth routes so only subscribed users can add recipes.]

There will also be a search recipes component, a light and dark mode option and a colour theme picker for the site. Using the Context API and reducers to make this possible.

Initial recipe data will be saved in a db.json file, for seeding a database later in Firestore, a scalable NoSQL cloud database. During early development stages I'll use json-server for development and testing.

### `Pages + Routes`

Site pages folder structured to keep pages with multiple components per page all in one folder, along with their style sheets.

React-router-dom v6 installed and base routes set up and tested. :heavy_check_mark:

### `Navbar Component`

Navbar component scaffolding set up as a separate component as it will be used on each page.

[TODO: Add Layout component]

### `Fetching Recipe Data`

Fetching recipe data using the `useFetch` custom hook I previously created for working on differect projects.

Added the hook and tested successfully mapping data to the homepage. :heavy_check_mark:

### `Recipe List Component`

Made a separate component to list out all recipes and nested this component on the homepage. I  set up the `<RecipeList>` component this way for 2 reasons:
1. To keep the homepage component leaner and more modular
2. In order to re-use the recipe component elsewhere in the app

Added the component and tested. While testing found and fixed a routing error. `<RecipeList>` component now works as intended. :heavy_check_mark:

### `Fetch Single Recipe`

Fetched single recipe with the `<useParams>` hook to populate the Recipe page.

### `Recipe Details Template`

Built out the recipe details on the Recipe page. Mapped over the ingredients list and gave it a key, since the initial json db doesn't contain unique keys for these items.

### `Form for Creating Recipes`

Form for Creating Recipes: Created 3 different states for 3 different pieces of data (title, instructions and cooking time) using `<useState>` hook. Tested form functionality in the console and added some basic styles.

### `Add Ingredients Field`

Here, the user needs to be able to add multiple items, which then need to go into an ingredients array, so coding this process was more involved.

To create this, I set up a `useState` for each ingredient entered, and a `useState` array to hold all the ingredients values. Once the user enters an ingredient, a quick check for duplicates runs and then the new (non-duplicate) ingredient is added to the array along with any previous ingredients, if applicable.

The input field is then cleared, so more entries can be made by the user. For this I added a `useRef` hook to get the correct DOM element and then used a focus method on it to focus the field for better UI/UX.

> [BUG :bug: - Duplicates check was not case sensitive. User could add 'eggs' and 'Eggs' for example.] *Solution:* To handle the duplicates, I set the data entry field `toLowerCase()` for ingredients so that the string comparison can catch duplicates. When the list is repopulated back to the DOM, it is styled into title case for a better user experience. :muscle:

*Additional Feature:* A list of ingredients already added placed under the input field, to make it easier for the user to preview input they already added.

### `Make a POST Request`

Created a `POST` request to add the new recipe information to the json file ('database'). JSON-Server allows POST methods, but requires additional configuration inside the `useFetch` custom hook.

I added a default GET method to `useFetch` and created a `postData()` function to save input within a fetch options object in JSON.stringify format. The next step was to trigger the fetch request with these options. This is because the POST fetch method here needed the options to have actual values prior to triggering.

Imported the newly configured `useFetch` into the Create recipe page. Added in the functionality and tested. The configuration worked as intended.

[TODO: Add 'edit' & 'delete' ability to recipe cards]

### `Redirect the User`

Redirect the user after new recipe (POST request) submission. Since it takes time to send POST request data to the json-server, I made the redirect after the POST request submission was fully complete.

I added a `useEffect` to check if there was data, then added a 2 second timer to wait before invoking `useNavigate()` to redirect to the home page.

### `Add Searchbar`

Searchbar created as a form submission to send the user to a Search results page with their query. `useNavigate()` incorporated to redirect the user.

### `Search Results Page`

For the Search results page, I used `useLocation()` from react-router-dom and `URLSearchParams` from plain vanilla javascript to create a `new URLSearchParams` object based on the query string entered. This allows the use `GET method` on the search parameters.

### `Finishing Touches + TODOs`

Finishing Touches
- Added a test for empty arrays in the SearchList that returns an indicator when there are no recipes matching the specific search query. :heavy_check_mark:
- ~~TODO: Add light and dark mode selector~~ :heavy_check_mark:
- ~~TODO: Add theme change selectors~~ :heavy_check_mark:
- TODO: Clear search item from search bar after search complete

### `Context API`

The Context API provider offers a way to manage props without having to do prop drilling. Any component that consumes a context will re-render data anytime the context changes.

Apply this sparingly because it makes component reuse more difficult. *A bit of prop drilling isn't a bad thing.* See [React Context](https://reactjs.org/docs/context.html) for details.

### `Creating a Context & Provider`
Bundled a custom `<ThemeProvider>` component around the app. This is to allow the addition of custom logic. 

### `useContext`
The `useContext` hook accepts an object and returns the current context value. When the context provider updates, this hook will trigger a re-render with the latest context value.

*The re-render will occur even if an ancestor uses React.memo or `shouldComponentUpdate`.*

### `Custom Context Hook`
Created a custom `useTheme` hook to reduce the amount of code written in the components and to allow for additional functionality.

### `Reducers and useReducer`
When working with context and complex states, a reducer is a good option. It is a single function that encapsulates all the logic needed to update state values in multiple ways.

Tested out `useReducer` by building a simple colour change state reducer. :heavy_check_mark:

### `Theme Color Selector`
Added color theme selector button and swatches component. :heavy_check_mark:

[TODO: build out theme arrays with primary color, secondary, etc and with different background patterns and font choices]

### `Light & Dark Modes`
Chose mode icons from google fonts icons and downloaded the svgs. In the `themeContext` I added a default mode and then created a `ToggleMode` component.

### `Light & Dark Mode Styles`
Added some simplified dark/light mode styles by adding 'dark' selectors and css. 

[TODO: Consider converting dark/light mode changes better via global variables or another theme methodology.]

## :fire: Firebase :fire:
Firebase is a Backend-as-a-Service (BaaS). Built on Google's infrastructure, Firebase is a NoSQL database program. Key Features:
    1. Authentication
    2. Realtime database
    3. Hosting
    4. Test lab
    5. Notifications

The JSON-Server setup worked well for the initial phase of prototyping for Easy Eats. Firebase provides a more robust solution as the prototype grows to using my data. Additionally, Firebase simplifies the development process and works easily as a real-time database.

Cost-wise, Firebase is also great when your userbase is under 10,000. Once your userbase grows beyond 10k, it's time to look at migrating to PHP/MySQL(DDOS concerns, SQL injections), Postgres or MongoDB.

### `Firestore Database`
Set up:
  - Initialized a *test mode* database
  - Created 'recipes' collection
  - Seeded initial document model/schema

### `Connect to Firestore`
Connect the Frontend application with the Backend Firebase cloud database.
  1. Install local firebase package into project
  2. Create hidden firebase config file and connect to firebase firestore

### `Fetch Firestore Collection`
Remove the local json-server database references and replace with Cloud Firebase. Successfully fetched the firestore recipes collection from the cloud to the frontend Homepage.

~~[TODO: Update UI to titlecase for the results from 'title']~~ :heavy_check_mark:

### `Fetch a Firestore Document`
Single documents fetched via `{ doc, getDoc }` to get results from firestore collection based on single doc id.

### `Add Firestore Document`
Creating a new recipe is very easy with Firestore. You can use `async await` so it is no longer necessary to have `useEffect` check the data before redirecting the user to the home page.

### `Delete Documents`
Added a delete icon from google icons and coded in basic funtionality using `deleteDoc` from Firestore/Firebase :heavy_check_mark:

### `Realtime Collection Data`
To improve user experience with the delete process, I added in realtime functionality with `onSnapshot`. The basic delete function didn't refresh the UI, so the user could still see the deleted recipe, even though it was removed from the database.

Using `onSnapshot` created a need for a clean up function in `useEffect`. I added an `unsubscribe` and returned the unsubscribe function to unmount the `onSnapshot` listener when the user leaves the page.

### `Update Documents`
Successfully updated the title using the `updateDoc()` function from firebase. :heavy_check_mark:

### `Realtime Document Data`
Same issue occured with updating as with deleting documents. It needed realtime functionality added to refresh the UI and an unsubscribe to unmount the listener.

### `TODO's`
  1. Build out the update/edit UI and its functionality
  2. Create a useCollection custom hook
  3. User authorization
  4. Adjust delete button appearance