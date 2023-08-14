import { useEffect, useReducer, useState } from "react"
import Search from "../../Components/Search/Index"
import "./Styles.css"
import RecipeItem from "../../Components/recipe-item"
import FavouriteItem from "../../Components/favourite-item"

const reducer = (state, action) => {
    switch (action.type) {
        case 'filterFavorites':
            console.log(action);

            return {
                ...state,
                filteredValue: action.value
            }

        default:
            return state;
    }
}

const intialState = {
    filteredValue: ''
}

const Homepage = () => {

    //loading state
    const [loadingState, setloadingState] = useState(false)

    //save results that we receive from api
    const [recipes, setRecipes] = useState([])

    //favourites data state
    const [favourites, setfavourites] = useState([])

    //state for api is succesfull or not
    const [apisuccess, setapisuccess] = useState(false)

    //use reducer functionality
    const [filteredState, dispatch] = useReducer(reducer, intialState)

    const getDataFromSearchComponent = (getData) => {

        //keep the loading state as true before we are calling api
        setloadingState(true);

        //calling the api
        async function getReceipes() {
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=243d72e611d448f98601a2d9bd5bcaaf&query=${getData}`)
            const result = await apiResponse.json()
            const { results } = result

            if (results && results.length > 0) {
                //set the loading state as false again
                //set the receipes state

                setloadingState(false)
                setRecipes(results)
                setapisuccess(true)
            }

        }
        getReceipes()
    };

    const addToFavourites = (getCurrentRecipeItem) => {

        let cpyfavourites = [...favourites];

        const index = cpyfavourites.findIndex(item => item.id === getCurrentRecipeItem.id)

        if (index === -1) {
            cpyfavourites.push(getCurrentRecipeItem)
            setfavourites(cpyfavourites)
            //save the favourites in localstorage
            localStorage.setItem('favourites', JSON.stringify(cpyfavourites))

        }
        else {
            alert('item is already present!!')
        }



    }
    const removeFromFavourites = (getCurrentId) => {
        let cpyfavourites = [...favourites]
        cpyfavourites = cpyfavourites.filter(item => item.id !== getCurrentId)

        setfavourites(cpyfavourites)
        localStorage.setItem('favourites', JSON.stringify(cpyfavourites))
    }
    useEffect(() => {

        const extractFavouritesFromLocalStorageOnPageLoad = JSON.parse(localStorage.getItem('favourites'));
        setfavourites(extractFavouritesFromLocalStorageOnPageLoad)
    }, [])
    console.log(filteredState, 'filteredState');

    //filter the favorites
    const filteredFavoritesItem = favourites.filter(item =>
        item.title.toLowerCase().includes(filteredState.filteredValue)
    )



    return (
        <div className="homepage">
            <Search
                getDataFromSearchComponent={getDataFromSearchComponent}
                apisuccess={apisuccess}
                setapisuccess={setapisuccess}
            />

            {/* show favourites items */}
            <div className="favorites-wrapper">
                <h1 className="favorites-title">Favourites</h1>

                <div className="search-favorites">
                    <input
                        onChange={(event) => dispatch({ type: 'filterFavorites', value: event.target.value })}
                        value={filteredState.filteredValue}
                        name="searchfavorites" placeholder="Search Favorites" />
                </div>

                <div className="favorites">
                    {
                        filteredFavoritesItem && filteredFavoritesItem.length > 0 ?
                            filteredFavoritesItem.map(item => (
                                <FavouriteItem
                                    removeFromFavourites={() => removeFromFavourites(item.id)}
                                    id={item.id}
                                    image={item.image}
                                    title={item.title}
                                />
                            ))
                            : null
                    }
                </div>
            </div>
            {/* show favourites items */}

            {/* show loading state */}

            {
                loadingState && <div className="loading"> Loading recipes !! Please wait.</div>
            }

            {/* show loading state */}

            {/* map through all the recipes */}

            <div className="items">
                {
                    recipes && recipes.length > 0
                        ? recipes.map((item) =>
                            <RecipeItem
                                addToFavourites={() => addToFavourites(item)}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                            />)
                        : null
                }
            </div>



            {/* map through all the recipes */}

        </div>
    )
}
export default Homepage