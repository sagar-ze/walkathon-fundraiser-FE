import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { EventBanner } from '../../assets';
import DonateDialog from '../Donation/DonateDialog';

const EventCard = () => {
  return (
    <Card style={{ width: 430 }} className="gradient-card-body" elevation={0}>
      <CardMedia
        sx={{ height: 140 }}
        image={EventBanner}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Participate</Button>
        <DonateDialog />
      </CardActions>
    </Card>
  );
};

export default EventCard;
