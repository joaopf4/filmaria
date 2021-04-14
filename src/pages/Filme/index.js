import { useEffect, useState } from 'react';
import  { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api'
import './filme-info.css';

export default function Filme(){
    const { id } = useParams();
    const history = useHistory();
    const [filme, setFilme] = useState([])
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);
            if(response.data.length === 0){
                //tentou acessar com id inexistente; será levado pra home
                history.replace('/');
                return;
            }
            setFilme(response.data);
            setLoading(false);
        }
        loadFilme();

        return () => {
            console.log('componente desmontado')
        }
    }, [id, history])

    if(loading){
        return(
        <div className="filme-info">
            <div class="balls">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        )
    }
    return(
        <div className="filme-info">
            <h1>
                {filme.nome}
            </h1>
            <img src={filme.foto} alt={filme.nome} />
            <h3>Sinopse</h3>
            <p>{filme.sinopse}</p>
            <div className="botoes">
                <button onClick={() => {}}>
                    Salvar
                </button>
                <button onClick={() => {}}>
                    <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}