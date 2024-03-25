import { EventSite, MapAnimation, MapBounce } from '../../assets';
import Lottie from 'lottie-react';
import {
  //   Box,
  Button,
  Card,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label:
      'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];

const SearchBar = () => {
  return (
    <Card className="searchbar-container" elevation={0}>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            style={{ color: '#3b3939', fontWeight: 500 }}
          >
            Find Walkathon <span style={{ color: '#6d6d6d' }}>Events</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 450, zIndex: 999 }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item style={{ position: 'absolute' }}>
          <Lottie
            animationData={MapAnimation}
            style={{
              position: 'relative',
              left: 450,
              height: '80px',
              top: '20px',
            }}
          />
        </Grid>
        <Grid item style={{ position: 'absolute' }}>
          <Button
            style={{
              background: '#2b2b2b',
              color: '#fff',
              position: 'relative',
              left: 530,
              top: 35,
            }}
            variant="contained"
            size="large"
          >
            Find Events
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

const FeaturedEvent = () => {
  return (
    <div
      style={{
        width: '100%',
        marginLeft: '14%',
        marginTop: '10%',
        color: '#6d6d6d',
        zIndex: 999,
      }}
    >
      <Typography variant="h5" style={{ fontWeight: 400 }}>
        Featured Event
      </Typography>
      <Typography variant="h1" style={{ fontWeight: 700, color: '#da261c' }}>
        Seneca Walkathon
      </Typography>
      <Link
        variant="subtitle1"
        href="https://www.google.com/maps/dir//Seneca+Polytechnic+Newnham+Campus,+1750+Finch+Ave+E,+North+York,+ON+M2J+2X5/@43.804272,-79.3985918,12.47z/data=!3m1!5s0x89d4d31af915afef:0x2efc9eac5a51be61!4m8!4m7!1m0!1m5!1m1!1s0x89d4d31babbf5ce7:0x5812aa25d9fb9912!2m2!1d-79.3485918!2d43.7960294?entry=ttu"
        underline="none"
      >
        <Stack direction="row" style={{ position: 'absolute' }}>
          <Lottie
            animationData={MapBounce}
            style={{
              height: '100px',
              top: '-35px',
              position: 'relative',
            }}
          ></Lottie>
          <Typography
            variant="subtitle1"
            style={{
              position: 'relative',
              left: '-40px',
              top: '1px',
            }}
          >
            1750 Finch Ave E, North York, ON &nbsp;&nbsp;&nbsp;
            <span style={{ color: '#6d6d6d' }}>
              <EventAvailableIcon style={{ color: '#fff' }} /> 24th March
            </span>
          </Typography>
        </Stack>
      </Link>
      <Typography variant="h5"></Typography>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="container">
      <Grid container>
        <Grid item xs={6}>
          <div
            style={{
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: '-10000px' }}>
              <svg viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#FFD6E8"
                  d="M57.9,-21.5C61.7,-7.4,42,11.7,22,25C2,38.2,-18.3,45.7,-36.2,36C-54.1,26.3,-69.6,-0.7,-63.2,-18.5C-56.7,-36.4,-28.4,-45.1,-0.6,-44.9C27.1,-44.7,54.2,-35.6,57.9,-21.5Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
            <div>
              <FeaturedEvent />
            </div>
          </div>
        </Grid>
        <Grid item xs={6} justifyContent="right">
          <Lottie animationData={EventSite} style={{ height: '600px' }} />
        </Grid>
      </Grid>
      <SearchBar />
    </div>
  );
};

export default Banner;
