# Easy Eats - Simple Recipe App

Concept site: Home cooking, easy and quick recipes.

## Project Scope

On the landing page, viewers can immediately see recipe cards. No need to dig through long-winded ad copy to locate the desired recipe. When the user clicks on one of the recipe cards, it takes them to a detailed component page, with all the ingredients and recipe details.

New recipes can be added easily with the 'new recipe' component. Site viewers can see the completed cards and details to make Easy Eats recipes, - add login req'd for adding new recipes.

[Todo: add auth routes so only subscribed users can add recipes.]

The new recipes component will also feature an easy way to add ingredients to the recipe card.

There will also be a search recipes component, a light and dark mode option and a colour theme picker for the site. Using the Context API and reducers to make this possible.

The initial recipe data will be saved in a db.json file, for seeding a database later in Firestore, scalable NoSQL cloud database. During the early development stage I'll use json-server for development and testing.

### `Pages + Routes`

Site pages folder structured to keep pages with multiple components per page all in one folder, along with their style sheets.

React-router-dom v6 installed and base routes set up and tested.

### `Navbar Component`

Navbar component scaffolding set up as a separate component as it will be used on each page.

[TODO: Add Layout component]

### `Fetching Recipe Data`

Fetching recipe data using the `useFetch` custom hook I previously created for working with differect projects.

Added the hook and tested successfully mapping data to the homepage.

### `Recipe List Component`

Make a separate component to list out all recipes and nest this component on the homepage. I am setting up the `<RecipeList>` component this way for 2 reasons:
1. To keep the homepage component leaner and more modular
2. In order to re-use the recipe component elsewhere in the future

Added the component and tested. While testing found and fixed a routing. `<RecipeList>` component works as intended.

### `Fetch Single Recipe`

Fetched single recipe with the `<useParams>` hook to populate the Recipe page.

### `Recipe Details Template`

Built out the recipe details on the Recipe page. Mapped over the ingredients list and gave it a key, since the json db doesn't contain unique keys for these items.

### `Form for Creating Recipes`

Form for Creating Recipes. Created 3 different states for 3 different pieces of data (title, instructions and cooking time) using `<useState>` hook. Tested the form functionality in the console and added some basic styles.

### `Adding Ingredients Field`

Here, the user needs to be able to add multiple input items, which then need to go into an ingredients array, so coding this process is more involved.

To create this, I set up a useState for each single ingredient entered, and a useState array to hold all the ingredients values. Once the user enters an ingredient, a quick check for duplicates runs (we don't need duplicate ingredients) and then the new ingredient is added to the array along with any previous ingredients, if applicable.

The input field is then cleared, so that more entries can be made by the user. For this we use the `<useRef>` hook. We use the useRef hook to get a handle on the correct DOM element. Once we have that element, we can use the focus method on it to focus the field for better UI/UX.

[TODO: found a bug - duplicates check is not case sensitive. User can add 'eggs' and 'Eggs' for example.] *Solution:* to handle the duplicates, I've set the data entry field `toLowerCase()` for the ingredients so that the string comparison can easily catch duplicates. When the list is repopulated back to the DOM, it will be styled into title case for a better user experience.

Added a listing of ingredients already added underneath the input, to make it easier for the user to see preview what input they already included.

### `Making a POST Request`

Now it's time to create a `POST` request to add the new recipe information to our json file ('database'). JSON-Server allows us to do this, but requires some additional configuration inside the `<useFetch>` custom hook.

I added a default GET method to useFetch and created a postData function to save the input within a fetch options object in a JSON.stringify format. The next step is to trigger the fetch request with these options. This is because the POST fetch method here needs the options to have values prior to triggering.

Imported the newly configured useFetch into the Create recipe page. Added in the functionality and tested. The configuration works as intended.

[TODO: add 'edit' ability to recipe cards]

### `Redirect the User`

Redirect the user after they have submitted a new recipe (POST request). Because it takes time to send the POST request data to json-server, I need to make the redirect after the POST request submission is fully complete.

I added a `useEffect` to check if there was data, then added a 2 second timer to wait before invoking `useNavigate()` to redirect to the home page.

### `Add Searchbar`

Searchbar created as a form submission to send the user to a Search results page with their query. `useNavigate()` incorporated to redirect the user.

### `Search Results Page`

For the Search results page, I'm using `useLocation()` from react-router-dom and `URLSearchParams` from plain vanilla javascript to create a `new URLSearchParams` object based on the query string that we grab. This allows the use `GET method` on the search parameters.

### `Finishing Touches + TODOs`

Finishing Touches
- added a test for empty arrays in the SearchList that returns an indicator when there are no recipes matching a specific search query.
- TODO: add light and dark mode selector
- TODO: add theme changer selectors
- TODO: clear search item from search bar after search complete

### `Context API`

The Context API provider offers a way to manage props without having to do prop drilling. Just because we can use this global state, doesn't mean we always should. Using alot of global state can lead to unneccessary re-renders.

Any component that consumes a context will re-render anytime data in that context changes. A bit of prop drilling isn't a bad thing.

### `Creating a Context & Provider`
 Bundled custom <ThemeProvider> around the app. This is to allow the addition of custom logic. 

### `useContext`
The `useContext` hook accepts an object and returns the current context value for that context. When the context provider updates, this hook will trigger a r-erender with the latest context value.

The re-render will occur even if an ancestor uses React.memo or `shouldComponentUpdate`.

### `Custom Context Hook`
Created a custom `useTheme` hook to reduce the amount of code written in the components and to allow for additional functionality.

### `Reducers and useReducer`

When working with context and complex states and different ways of updating states, a reducer is a good option. It is a function that makes it easier to work with multiple bits of related state that can be updated in different ways.

As logic becomes more complex, reducers are also a great option. It is a single function that encapsulates all the logic we need to update state values in multiple ways.

Tested out useReducer by building a simple colour change state reducer.

### `Theme Color Selector`
Added color theme selector button and swatches component.

[TODO: build out theme arrays with primary color, secondary, etc and with different background patterns and font choices]

### `Light & Dark Modes`
Chose mode icons from google fonts icons and downloaded the svgs. In the themeContext I added a default mode and then created a `ToggleMode` component.

### `Light & Dark Mode Styles`

