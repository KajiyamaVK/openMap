import * as React from 'react';
import style from './stylesheet.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


import { TextField, Box, Button, FormLabel, CircularProgress, MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


import getPlaces from '../../scripts/getPlaces.js'
import insertPlace from '../../scripts/insertPlace';
import updatePlace from '../../scripts/updatePlace';

import {checkRequiredInputs} from '../../scripts/projectLibrary'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function ({idPlace}){
    const router = useRouter();
    const [backLoading, setBackLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    const [alertOpenStatus, setalertOpenStatus] = useState(false);
    const [alertErrorOpenState, setAlertErrorOpenState] = useState(false);

    const [modalOpenStatus, setModalOpenStatus] = useState(false);
    
    const [inputName,setInputName] = useState('');
    const [inputCitiesStatus, setinputCitiesStatus] = useState(true);
    const [inputCitiesList,setCitiesList] = useState([]);
    const [inputCityValue,setCityValue] = useState('');
    const [inputUFIdValue,setInputUFIdValue] = useState('');
    const [inputDesc,setInputDesc] = useState('');
    const [inputUrl,setInputUrl] = useState('');
    const [alertErrorMessage, setAlertErrorMessage] = useState('');
    
    

    const listOfUfs = [
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

    const getUfIdByKey = (key, value) => {
        const ufObject = listOfUfs.find(uf => uf[key] === value);
        return ufObject ? (key === 'label' ? ufObject.value : ufObject.label) : null;
    }

    const clearFields = () => {

        setInputName('');
        setCitiesList([]);
        setCityValue('');
        setInputUFIdValue('');
        setInputDesc('');
        setInputUrl('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }    
    
    const handleBackButton = () =>{
        setBackLoading(true);
        router.push('/')
    }

    const formValues = {
        "idPlace":idPlace,
        "nameUf": getUfIdByKey('value',inputUFIdValue) ,
        "nameCity": inputCityValue,
        "namePlace": inputName,
        "descPlace": inputDesc,
        "photoUrl": inputUrl
    }

    const handleSave = () => {

        if(isNaN(idPlace)){
            if(checkRequiredInputs()){
                async function addPlace(){
    
                    const requestSitSuccess = await insertPlace(formValues);
    
                    if(requestSitSuccess){
                        //setalertOpenStatus(true)
                        setModalOpenStatus(true);
                        // setModalMode('AfterSave')
                        
                    } else {
                        setAlertErrorOpenState(true);
                        setAlertErrorMessage('Houve um cenário não previsto. Entre em contato com o suporte.')
                    }
                }
                addPlace();
            } else {
                setAlertErrorOpenState(true);
                setAlertErrorMessage('Verifique os campos com asteriscos ( * ) pois eles são obrigatórios. ')
            }
        } else {

            async function changePlace(){
    
                const requestSitSuccess = await updatePlace(formValues);;

                if(requestSitSuccess){
                    setalertOpenStatus(true)
                    router.push('/');
                } else {
                    setAlertErrorOpenState(true);
                    setAlertErrorMessage('Houve um cenário não previsto. Entre em contato com o suporte.')
                }
            }
            changePlace();

            
            // setalertOpenStatus(true)
        } 


        
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setalertOpenStatus(false)
        setAlertErrorOpenState(false);
    };
     

    const modal= {
        transition:React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        }),

        handleDialogYes:()=>{
            setModalOpenStatus(false);
            router.reload(window.location.pathname)
            clearFields();
        },
        
        handleDialogNo : (answer) => {
            if(answer){
                router.push('/')
            }
            setModalOpenStatus(false);
        },

        handleClose : () => {
            document.querySelector('div[role="presentation"]').style.display = 'none';
        },

        handleOpen: () =>{
            document.querySelector('div[role="presentation"]').style.display = 'block';
        }


    }


    useEffect( ()=>{

        async function fetchDataInEditMode() {

            if(!isNaN(idPlace)){
                const result = await getPlaces(idPlace,null,1);
                const ufId = getUfIdByKey('label',result['nameUf']);

                setinputCitiesStatus(false);
                setInputUFIdValue(ufId);
                setInputDesc(result['descPlace']);
                setInputUrl(result['photoUrl'])
                setInputName(result['namePlace'])

                async function fetchCitiesList(){
                    await fetchCities(ufId)
                    setCityValue(result['nameCity']);
                }
                fetchCitiesList()
            }
        }
        fetchDataInEditMode();
    },[])





 

    const fetchCities = async (e) => {
        setinputCitiesStatus(false);
        const inputValue = isNaN(e) ? e.target.value : e;
        setCitiesList([]);
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${inputValue}/municipios`;
        const response = await fetch(url);
        const data = await response.json();

        const result = data.map((ufData)=>{
            return ufData.nome;
        })
        setCitiesList(result);
    }

   

    return(
        <div id={style.main}>
            <Box id={style.formContainer} component="form" noValidate sx={{ mt: 1 }}>
                <TextField 
                    label="Digite o nome do ponto turístico"
                    sx={{
                        width:"100%",
                    }}
                    value={inputName}
                    onChange={e=>setInputName(e.target.value)}
                    required
                />

                
                

                <div id={style.localizationContainer}>
                    <FormLabel 
                        component="legend"
                        sx={{
                            marginBottom:'10px'
                        }}
                    >Localização</FormLabel>

                    <TextField
                        name='ID_UF_FK'
                        id="ID_UF_FK"
                        select
                        label="UF"
                        sx={{
                            width:"17%",
                        }}
                        required
                        value={inputUFIdValue}
                        onChange={e=>{setInputUFIdValue(e.target.value); fetchCities(e);}}
                    >   
                        {listOfUfs.map((option) => (
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
                    label="URL da Imagem"
                    sx={{
                        width:"100%",
                        marginTop:'20px'
                    }}
                    id="IdinputUrl"
                    value={inputUrl}
                    onChange={e=>setInputUrl(e.target.value)}
                />

                <TextField
                    id="outlined-multiline-static"
                    label="Descrição"
                    multiline
                    rows={4}
                    sx={{
                        marginTop:'20px'
                    }}
                    value={inputDesc}
                    onChange={e=>setInputDesc(e.target.value)}
                    required
                />

                <div id={style.buttonsContainer}>
                    <Button 
                        variant='contained'
                        onClick={handleBackButton}>
                        {backLoading ? <CircularProgress 
                                    size={24} 
                                    style ={{color:'white'}}
                                    /> : 'Voltar'}
                    </Button>

                    <Button 
                        variant='contained'
                        onClick={handleSave}> 
                        {saveLoading ? <CircularProgress 
                                    size={24} 
                                    style ={{color:'white'}}
                                    /> : 'Salvar'}
                         
                    </Button>
                </div>

                

            </Box>





        <Dialog
            open={modalOpenStatus}
            TransitionComponent={modal.transition}
        >
            <DialogTitle>{"Novo Cadastro"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Gostaria de fazer um cadastro de um novo ponto turístico?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={modal.handleDialogYes}>Sim</Button>
                <Button onClick={modal.handleDialogNo}>Não</Button>
            </DialogActions>
        </Dialog>


        <Snackbar open={alertOpenStatus} autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert severity="success" sx={{ width: '100%' }} onClose={handleAlertClose}>
                Ponto turístico gravado/atualizado com sucesso!
            </Alert>
        </Snackbar>

        <Snackbar open={alertErrorOpenState} autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert severity="error" sx={{ width: '100%' }} onClose={handleAlertClose}>
                {alertErrorMessage}
            </Alert>
        </Snackbar>

            
        </div>
    )
}