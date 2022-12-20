import { useState } from 'react';
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

function CardModel({ index,place, onExpandClick  }) {

  

  const [expanded, setExpanded] = useState(false);
  const router =  useRouter();


  const gotoEditMode = () =>{
    router.push(`/${place.idPlace}`)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
    onExpandClick(index);
  };



  return (
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
        <Typography variant="body2" color="text.secondary">
          {place.descPlace}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        <ExpandMore
          expand={expanded}
          onClick={e=>handleExpandClick(e)}
          aria-expanded={expanded}
          aria-label="show more"
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
          <IconButton aria-label="add to favorites">
            <DeleteIcon />
          </IconButton>

          <IconButton aria-label="share" onClick={gotoEditMode}>
            <EditIcon />
          </IconButton>
        </div>
        </CardContent>

      </Collapse>
                            </Card>
  )
}


export default function({data}) {
  const [expandedList, setExpandedList] = useState([]);
  
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
          onExpandClick={handleExpandClick}/>
        ))}

    </div>
    
    <div>

</div>
</>
  )
 }
}
