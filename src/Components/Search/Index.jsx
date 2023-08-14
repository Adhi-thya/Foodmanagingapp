import { useEffect, useState } from "react"
import "./Styles.css"
const Search = (props) => {
    console.log(props)

    const { getDataFromSearchComponent, apisuccess, setapisuccess } = props;

    const [inputvalue, setinputvalue] = useState('')
    const handleInputvalue = (event) => {
        const { value } = event.target;
        //set the updated state
        setinputvalue(value)
    }
    console.log(inputvalue)
    const handleSubmit = (event) => {
        event.preventDefault()
        getDataFromSearchComponent(inputvalue)
    }
    useEffect(() => {

        if (apisuccess) {
            setinputvalue('')
            setapisuccess(false)
        }
    }, [apisuccess])
    return (
        <form onSubmit={handleSubmit} className="Search">
            <input name="search" onChange={handleInputvalue} value={inputvalue} placeholder="Search Recipes" id="search" />
            <button type="submit">Search</button>
        </form>
    )
}
export default Search