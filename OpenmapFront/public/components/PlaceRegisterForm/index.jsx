
import * as React from 'react';
import style from './stylesheet.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Box, Button, FormLabel, CircularProgress, MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useEffect } from 'react';

export default function ({idPlace}){

    const router = useRouter()

    const [loading, setLoading] = useState(false);
    const [inputCitiesStatus, setinputCitiesStatus] = useState(true);
    const [inputCitiesList,setCitiesList] = useState([]);
    const [inputCityValue,setCityValue] = useState('');
    const [inputUFValue,setInputUFValue] = useState('');
    const [modalOpenStatus, setModalOpenStatus] = useState(false);

    

    useEffect(()=>{
        console.log('teste')
    },[])

    const clearFields = () => {
        setModalOpenStatus(true);
        setCitiesList([]);
        setCityValue('');
        setInputUFValue('');
    }

    const modal= {
        transition:React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        }),

        handleClickOpen : () => {
            
        },
        
        handleClose : (answer) => {
            if(answer){
                clearFields();
            }
            setModalOpenStatus(false);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log('teste');
    }    
    
    function goToHomePage(){
        setLoading(true);
        router.push('/')
    }

    const selectDataUF = [
        {value:12,label:'AC'},
        {value:27,label:'AL'},
        {value:13,label:'AM'},
        {value:16,label:'AP'},
        {value:29,label:'BA'},
        {value:23,label:'CE'},
        {value:53,label:'DF'},
        {value:32,label:'ES'},
        {value:52,label:'GO'},
        {value:21,label:'MA'},
        {value:31,label:'MG'},
        {value:50,label:'MS'},
        {value:51,label:'MT'},
        {value:15,label:'PA'},
        {value:25,label:'PB'},
        {value:26,label:'PE'},
        {value:22,label:'PI'},
        {value:41,label:'PR'},
        {value:33,label:'RJ'},
        {value:24,label:'RN'},
        {value:11,label:'RO'},
        {value:14,label:'RR'},
        {value:43,label:'RS'},
        {value:42,label:'SC'},
        {value:28,label:'SE'},
        {value:35,label:'SP'},
        {value:17,label:'TO'}
];
      

async function fetchCities(e) {
    const inputValue = e.target.value;
    console.log(inputUFValue);
    setCitiesList([]);
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${inputValue}/municipios`;
    const response = await fetch(url);
    const data = await response.json();

    const result = data.map((ufData)=>{
        return ufData.nome;
    })
    setCitiesList(result);
    setinputCitiesStatus(false);
    console.log(result)
}

async function saveData() {
    setModalOpenStatus(true);
}
   

    return(
        <div id={style.main}>
            <Box id={style.formContainer} component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField 
                    label="Digite o nome do ponto turístico"
                    sx={{
                        width:"100%",
                    }}
                    required/>

                
                

                <div id={style.localizationContainer}>
                    <FormLabel 
                        component="legend"
                        sx={{
                            marginBottom:'10px'
                        }}
                    >Localização</FormLabel>

                    <TextField
                        name='ID_UF_FK'
                        id="outlined-select-currency"
                        select
                        label="UF"
                        sx={{
                            width:"17%",
                        }}
                        required
                        value={inputUFValue}
                        onChange={e=>{setInputUFValue(e.target.value); fetchCities(e);}}
                    >   
                        {selectDataUF.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField 
                        label="Cidade"
                        id='inputCity'
                        sx={{
                            width:'80%',
                            marginLeft:"3%"
                        }}
                        select
                        disabled={inputCitiesStatus}
                        value={inputCityValue}
                        onChange={e=>setCityValue(e.target.value)}>
                        <option />
                        {inputCitiesList.map((option,index) => (
                            <MenuItem key={index} value={option}>
                            {option}
                            </MenuItem>
                        ))}

                    </TextField>
                </div>

                <TextField
                    id="outlined-multiline-static"
                    label="Descrição"
                    multiline
                    rows={4}
                    sx={{
                        marginTop:'20px'
                    }}
                />

                <div id={style.buttonsContainer}>
                    <Button 
                        variant='contained'
                        onClick={goToHomePage}>
                        {loading ? <CircularProgress 
                                    size={24} 
                                    style ={{color:'white'}}
                                    /> : 'Voltar'}
                    </Button>

                    <Button 
                        variant='contained'
                        type='submit'
                        onClick={saveData}> 
                        
                        Salvar 
                    </Button>
                </div>

                

            </Box>





        <Dialog
            open={modalOpenStatus}
            TransitionComponent={modal.transition}
            keepMounted
            onClose={modal.handleClose}
        >
            <DialogTitle>{"Novo Cadastro"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Gostaria de fazer um cadastro de um novo ponto turístico?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={modal.handleClose}>Sim</Button>
                <Button onClick={modal.handleClose}>Não</Button>
            </DialogActions>
        </Dialog>

            
        </div>
    )
}