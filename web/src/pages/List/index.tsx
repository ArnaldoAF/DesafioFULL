import React, { useState, useEffect } from 'react';

import './styles.css';
import UserHeader from '../../components/UserHeader';


import api from '../../services/api';
import Button from '../../components/Button';

const TeacherList: React.FC = () => {
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
        <UserHeader />
        <div id="page-teacher-list" className="container">

            <main>
            <Button>ADICIONAR TITULO EM ATRASO</Button>
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
                                    <td><Button>👁️</Button></td>

                                </tr>
                                
                            )
                        })}
                </table>
                
                
                
            </main>
        </div>
        </>
    )
}

export default TeacherList;