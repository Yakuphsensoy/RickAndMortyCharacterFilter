import axios from "axios"
import { useLoaderData, useNavigate } from "react-router-dom"

export async function characterLoader({ params }) {
    const result = await axios.get('https://rickandmortyapi.com/api/character/' + params.id)
    return result.data
}

export default function Character() {
    const character = useLoaderData()
    const navigate = useNavigate()

    return (
        <div>
            <button onClick={() => navigate('/characters')}>Karakter Listesine Dön</button>
            <div>CHARACTER: {character.name}</div>
            <img src={character.image} alt={character.name} />
        </div>
    )
}