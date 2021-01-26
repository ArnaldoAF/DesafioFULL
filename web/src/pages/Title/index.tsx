import React, { useState, FormEvent, useEffect } from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';

import Input from '../../components/Input';

import './styles.css';
import api from '../../services/api';
import Button from '../../components/Button';
import { isFunctionDeclaration } from 'typescript';

interface paramsProps {
    id?:string
}

const Title: React.FC = () => {
    const hisotry = useHistory();
    let params = useParams<paramsProps>();
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [interest, setInterest] = useState(0);
    const [penalty, setPenalty] = useState(0);
    const [parcels, setParcels] = useState<any[]>([
        {
            number: 0,
            due_date: '',
            value: 0
        }
    ]);
    const [isDisabled, setIsDisabled] = useState(false);
    
    
    

    function addParcels() {
        const newObj = {
            number: 0,
            due_date: '',
            value: 0
        };

        setParcels([...parcels, newObj]);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();
        
        //alert("submit");
        
        const data = {
            number,
            name,
            cpf,
            interest,
            penalty,
            parcels
        }
        
        api.post('title', data).then((response) => {
            alert("Inserido");
            hisotry.push('/');
        }).catch((e) => {
            alert(e);
        }) 
        

        

        console.log(data);
    }


    function setParcelItem(position: number, field: string, value: string) {
        const newArray = parcels.map((item, index) => {
            if(index===position) return { ...item, [field]: value};

            return item;
        });

        setParcels(newArray);
        console.log(newArray);
    }

    useEffect(() => {
        
        console.log(params);
        console.log(params.hasOwnProperty("id"));
        if(params.hasOwnProperty("id")) {
            console.log(params.id);
            const id = params.id;

            api.get('/title/'+id).then((response:any) => {
            const titleList = response.data;
            setNumber(titleList.number);
            setName(titleList.name);
            setCpf(titleList.cpf);
            setInterest(titleList.interest);
            setPenalty(titleList.penalty);
            setParcels(titleList.parcels);
            setIsDisabled(true);
            
            
        }).catch((response) => {
            console.log("catch", response);
        })


        }


    }, []);


    return (
        <div id="page-teacher-form" className="container">
            

            <main>
                <Link to="/" >
                    <Button>
                        VOLTAR
                    </Button>
                </Link>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Dados do Título</legend>

                        <Input
                            name="number"
                            label="Número do Título"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                            disabled={isDisabled}
                        />

                        <Input
                            name="name"
                            label="Nome do Devedor"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={isDisabled}
                        />

                        <Input
                            name="cpf"
                            label="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            required
                            disabled={isDisabled}
                        />

                        <Input
                            name="interest"
                            label="Juros"
                            value={interest}
                            type='number'
                            onChange={(e) => setInterest(parseFloat(e.target.value))}
                            required
                            disabled={isDisabled}
                        />

                        <Input
                            name="penalty"
                            label="Multa"
                            value={penalty}
                            type='number'
                            onChange={(e) => setPenalty(parseFloat(e.target.value))}
                            required
                            disabled={isDisabled}
                        />

                        
                    </fieldset>
                    <fieldset>
                            <legend>Parcelas</legend>
                            <Button onClick={addParcels} type="button">
                                + Nova Parcela
                            </Button>
                            {parcels.map((parcels: any, index: number) => {
                                return (
                                    <div key={parcels.week_day} className="schedule-item">
                                        
                                        <Input 
                                            name="parcelNumber" 
                                            label="Número" 
                                            type="number"
                                            value={parcels.number}
                                            onChange={(e) => setParcelItem(index, 'number', e.target.value)} 
                                            required
                                            disabled={isDisabled}
                                        />
                                        <Input 
                                            name="dueDate" 
                                            label="Data de Vencimento" 
                                            type="date"
                                            value={parcels.due_date}
                                            onChange={(e) => setParcelItem(index, 'due_date', e.target.value)} 
                                            required
                                            disabled={isDisabled}
                                        />
                                        <Input 
                                            name="value" 
                                            label="Valor da Parcela" 
                                            type="number"
                                            value={parcels.value}
                                            onChange={(e) => setParcelItem(index, 'value', e.target.value)} 
                                            required
                                            disabled={isDisabled}
                                        />
                                    </div>
                                )
                        })}

                    </fieldset>

                    
                    <footer>
                        <p>
                            
                        IMPORTANTE! <br />
                        Preencha todos os dados
                    </p>

                        <button type="submit" disabled={isDisabled}> Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>

    )
}

export default Title;