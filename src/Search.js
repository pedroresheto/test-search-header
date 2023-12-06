import { useState, useEffect } from "react"
//import { useProducts } from "../../store/useProducts"

export default function Search(){
    const [search, setSearch] = useState('')
    const [items, setItems] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [filtered, setFiltered] = useState([])

    useEffect(()=>{
        const fetchData = async () =>{
            const res = await fetch('http://37.228.116.165/api/advantages/')
            const data = await res.json()
            setItems(data)
        }
        fetchData()
    }, [])

    const handleSearch = ()=>{
        const filteredItems = items.filter(item => {
            return item.first_raw.toLowerCase().includes(search.toLowerCase())})
            setFiltered(filteredItems)
    }
    return(
        <div className="search-container">
            <div className="search-bar">
                        <input type="text" placeholder='Поиск' name="search" id="search" 
                        onChange={(e)=> {
                            setSearch(e.target.value)
                            handleSearch()
                            setIsSearch(true)
                            if(e.target.value === ""){
                                setIsSearch(false)
                            }
                            }} value={search}/>
                            <label htmlFor="search"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                            <circle cx="4" cy="4" r="3.5" stroke="#2C3035" />
                            <path d="M6.5 7L10 11" stroke="#2C3035" />
                        </svg></label>
                        
            </div>
            {isSearch && <div className="search-results">
                <ul>
                     {filtered.map((item)=>{
                        return <li>
                            <div>
                                {item.first_raw}
                            </div>
                        </li>
                    })}
                </ul>
            </div>}
        </div>
    )
}