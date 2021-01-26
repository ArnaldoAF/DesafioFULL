import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import './styles.css';


import api from '../../services/api';
import Button from '../../components/Button';

const List: React.FC = () => {
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        api.get('/titles').then((response:any) => {
            const titleList = response.data;
            
            setTitles(titleList);
        }).catch((response) => {
            console.log("catch", response);
        })

    },[])

    return (
        <>
        <div id="page-teacher-list" className="container">

            <main>
            <Link to="/title" >
                <Button>
                
                    ADICIONAR TITULO EM ATRASO
                </Button>
            </Link>
            <table >
                        <tr>
                            <th>Título</th>
                            <th>Devedor</th>
                            <th>Qtde de parcelas</th>
                            <th>Valor Original</th>
                            <th>Dias em Atraso</th>
                            <th>Valor Atualizado</th>
                            <th>👁️</th>
                        </tr>
                        {titles.map((title:any) => {
                            return (
                                <tr>
                                    <td>{title.number}</td>
                                    <td>{title.name}</td>
                                    <td>{title.parcels.length}</td>
                                    <td>{title.original_value}</td>
                                    <td>{title.delayed_days}</td>
                                    <td>{title.total}</td>
                                    <td>
                                        <Link to={"/title/"+title.id} >
                                            <Button>👁️</Button>
                                        </Link>
                                    </td>

                                </tr>
                                
                            )
                        })}
                </table>
                
                
                
            </main>
        </div>
        </>
    )
}

export default List;