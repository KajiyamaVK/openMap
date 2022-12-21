import { useState,forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import moment from 'moment';
import deletePlace from '../../scripts/deletePlace'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';




const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const modal= {
  transition:forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
  }),

  handleDialogYes:()=>{
      setModalOpenStatus(false);
      clearFields();
  },
  
  handleDialogNo : (answer) => {
      if(answer){
          router.push('/')
      }
      setModalOpenStatus(false);
  },


}

function CardModel({ index,place, expandedIndex, setExpandedIndex  }) {

  
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const router =  useRouter();

  const handleExpandClick = () => {
    if (index == expandedIndex) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const delPlace = () =>{
    
    const deleteStatus = deletePlace(place.idPlace);

    if(deleteStatus){
      router.reload(window.location.pathname)
    }  

    handleCloseModal();

  }

  const handleOpenModal = () => {
    setModalOpenStatus(true);
  };

  const handleCloseModal = () => {
    setModalOpenStatus(false);
  };

  const expanded = index == expandedIndex;
  const gotoEditMode = () =>{
    router.push(`/${place.idPlace}`)
  }



  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  //   onExpandClick(index);
  // };



  return (
    <>
    <Card key={place.idPlace} sx={{ minWidth: 345,maxWidth: 345,margin:5 }}>
      <CardHeader
        title={place.namePlace}
      />

      <CardMedia
        component="img"
        height="194"
        src={place.photoUrl}
      /> 
      <CardContent>
        {expanded ? (
          <Typography variant="body2">{place.descPlace}</Typography>
        ) : (
          <Typography variant="body2" >
            {place.descPlace.length > 300
              ? `${place.descPlace.substring(0, 300).trim()}...`
              : place.descPlace}
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Mostrar mais"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        
        <CardContent 
        sx={{
          display:"flex",
          flexDirection:"column"
        }}>

        <hr style={{height:"1px", width:'90%', backgroundColor:'#e2e7e3', marginBottom:'10px'}}/>
        <div>
          <b>Localidade:</b>{place.nameCity} - {place.nameUf}<br/>
          <b>Data de cadastro:</b>{moment(place.dateUpdated).format('DD/MM/YYYY HH:mm')}<br/>
          <b>Data de atualização:</b>{moment(place.dateUpdated).format('DD/MM/YYYY HH:mm')}
        </div>
        <div style={{position:'relative', left:230, top:15}}>
          <IconButton onClick={handleOpenModal}>
            <DeleteIcon />
          </IconButton>

          <IconButton aria-label="share" onClick={gotoEditMode}>
            <EditIcon />
          </IconButton>
        </div>
        </CardContent>

      </Collapse>
                            </Card>

                            <Dialog
            open={modalOpenStatus}
            TransitionComponent={modal.transition}
            keepMounted
            onClose={handleCloseModal}
        >
            <DialogTitle>{"Novo Cadastro"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Tem certeza que deseja apagar este ponto turístico? 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={delPlace}>Sim</Button>
                <Button onClick={handleCloseModal}>Não</Button>
            </DialogActions>
        </Dialog>
                            </>
      
  )
}


export default function({data}) {
  const [expandedList, setExpandedList] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  
  const handleExpandClick = (index) => {
    const newExpandedList = [...expandedList];
    newExpandedList[index] = !newExpandedList[index];
    setExpandedList(newExpandedList);
  };




  if(data){
  return (
    <>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
      {data.map((place,index) => (
        
        <CardModel
          key={place.idPlace}
          index={index}
          place={place}
          expandedIndex={expandedIndex}
          setExpandedIndex={setExpandedIndex}
          // onExpandClick={handleExpandClick}
        />
        ))}

    </div>
    
    <div>
    

</div>
</>
  )
 }
}
