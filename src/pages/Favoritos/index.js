import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './favoritos.css';

export default function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    function handleDelete(id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id);
        })

        setFilmes(filtroFilmes);
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes));
        toast.success('Filme excluído com sucesso');

    }

    useEffect(() => {
        const listaSalvos = localStorage.getItem('filmes');
        setFilmes(JSON.parse(listaSalvos) || []);
    }, []);

    return(
        <div id="meus-filmes">
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <span>Você não possui nenhum filme salvo ainda</span>}
            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.nome}</span>
                            <div>
                                <Link to={`filme/${item.id}`}>Ver detalhe</Link>
                                <button onClick={ () => handleDelete(item.id) }>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}