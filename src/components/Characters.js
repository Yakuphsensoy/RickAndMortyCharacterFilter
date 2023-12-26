import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Characters() {
    const [characters, setCharacters] = useState([])
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [species, setSpecies] = useState('')//o zaman bunun da defaultu string olmicak mı 
    const [gender, setGender] = useState('')// üç seçenekten biri seçilerek bu değişkene atanacak. 


    // Bu fonksiyona html elementleri içinden erişebilirsin
    function resetValues() {
        setCurrentPage(0)
        setTotalPage(1)
        setName('')
        setStatus('')
        setSpecies('')
        setGender('')
    }



    useEffect(
        () => {
            async function fetchCharacters() {
                try {
                    const result = await axios
                        .get(
                            'https://rickandmortyapi.com/api/character',
                            {
                                params: {
                                    page: currentPage,
                                    name: name,
                                    status: status,
                                    species: species,
                                    gender: gender,
                                }
                            }
                        )

                    setCharacters(result.data.results)
                    setTotalPage(result.data.info.pages)
                } catch (err) {
                    setCharacters([])
                    setTotalPage(1)
                }
            };

            fetchCharacters()



        },
        [currentPage, name, status, species, gender]
    )


    return (
        <div className="App">
            <div className='mainMenuBtn'>
                <button onClick={() => navigate('/')}>Ana Menüye Dönmek İçin Tıkla</button>
            </div>
            <div className='inputArea'>
                <input type="text" onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="filter1">
                <button onClick={() => resetValues()}>Sıfırla</button>
                <button onClick={() => setStatus('Alive')}>Canlı</button>
                <button onClick={() => setStatus('Dead')}>Ölü</button>
                <button onClick={() => setStatus('Unknown')}>Belirsiz</button>
            </div>
            <div id="filter2">
                <select name="Tür" id="tur" multiple size={"3"}>
                    <option value={'human'} onClick={() => setSpecies('Human')}>İnsan</option>
                    <option value={'alien'} onClick={() => setSpecies('Alien')}>Uzaylı</option>
                    <option value={'humanoid'} onClick={() => setSpecies('Humanoid')}>İnsansı Robot</option>
                </select>
            </div>
            <select name="gender" id="gender" multiple size={"4"}>
                <option value={'Male'} onClick={() => setGender('Male')}>Erkek</option>
                <option value={'female'} onClick={() => setGender('Female')}>Kadın</option>
                <option value={'Genderless'} onClick={() => setGender('Genderlerss')}>Cinsiyetsiz</option>
                <option value={'Unknown'} onClick={() => setGender('Unknown')}>Belirsiz</option>
            </select>
            {
                characters.map(character => (
                    <div onClick={() => navigate('/character/' + character.id)}>{character.name}</div>
                ))
            }
            <div className="navigatePage">
                {
                    // [null, null, null, null.....] 42 tane null
                    new Array(totalPage).fill().map((_, i) => (
                        <button type="button" id='page' onClick={() => setCurrentPage(i)}>{i + 1}</button>
                    ))
                }
            </div>
        </div >

    );
}