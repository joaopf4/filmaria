import { useEffect, useState } from 'react';
import  { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api'
import './filme-info.css';

export default function Filme(){
    const { id } = useParams();
    const history = useHistory();
    const [filme, setFilme] = useState([])
    const [loading, setLoading] = useState(true);

    function salvaFilme(){
        const minhaLista = localStorage.getItem('filmes');
        
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id ); 
        // o .some devolve um true or false. Se os ids do filme do localStorage for igual
        // ao do que está sendo salvo, ele devolverá um true. 
        //o .some percorre o array silmesSalvos comparando o id de cada item do array com o do filme q está sendo salvo
        if(hasFilme){
            toast.info('Você já possui esse filme salvo');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Filme savo com sucesso!');
    }

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
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome} />
            <h3>Sinopse</h3>
            <p>{filme.sinopse}</p>
            <div className="botoes">
                <button onClick={salvaFilme}>
                    Salvar
                </button>
                <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                    <button onClick={() => {}}>
                            Trailer
                    </button>
                </a>
            </div>
        </div>
    )
}