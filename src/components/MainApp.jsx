import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScaleLoader from 'react-spinners/ScaleLoader'
import { Container, TextField, Card, CardContent, CardMedia, Typography, Stack, Grid } from '@mui/material';

const MainApp = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.punkapi.com/v2/beers');
        setBeers(response.data);
        setLoading(false)
        console.log('API Data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1>Punk API Beers</h1>
      <TextField
        label="Search beers..."
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <ScaleLoader color="#36d7b7" />}


      {!loading && (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {filteredBeers.map((beer) => (
          <Card key={beer.id} sx={{ maxWidth: 300, margin: 2, paddingX: 2, paddingY: 4}}>
            <CardMedia
              component="img"
              alt={beer.name}
              height="140"
              image={beer.image_url}
            />
            <CardContent>
              <Stack gap={1}>
              <Typography gutterBottom variant="h6" component="div">
                {beer.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {beer.tagline}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'start'}}>
                {beer.description}
              </Typography>
              <Grid container justifyContent="space-between" sx={{ paddingTop: 3}}>
                <Typography variant='body2' sx={{ fontWeight: 400, fontStyle: 'italic'}}>Alcohol By Volume</Typography>
                <Typography variant='body2' color="text.secondary">{beer.abv}</Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography variant='body2' sx={{ fontWeight: 400, fontStyle: 'italic'}}>International Bitterness Unit</Typography>
                <Typography variant='body2' color="text.secondary">{beer.ibu}</Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography variant='body2' sx={{ fontWeight: 400, fontStyle: 'italic'}}>Final gravity</Typography>
                <Typography variant='body2' color="text.secondary">{beer.target_fg}</Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography variant='body2' sx={{ fontWeight: 400, fontStyle: 'italic'}}>Original gravity</Typography>
                <Typography variant='body2' color="text.secondary">{beer.target_og}</Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography variant='body2' sx={{ fontWeight: 400, fontStyle: 'italic'}}>European Brewery Convention</Typography>
                <Typography variant='body2' color="text.secondary">{beer.ebc}</Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography variant='body2' sx={{ fontWeight: 400, fontStyle: 'italic'}}>Standard Reference Method</Typography>
                <Typography variant='body2' color="text.secondary">{beer.srm}</Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography variant='body2' sx={{ fontWeight: 400, fontStyle: 'italic'}}>PH Level</Typography>
                <Typography variant='body2' color="text.secondary">{beer.ph}</Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography variant='body2' sx={{ fontWeight: 400, fontStyle: 'italic'}}>Attenuation level</Typography>
                <Typography variant='body2' color="text.secondary">{beer.attenuation_level}</Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography variant='body2' sx={{ fontWeight: 400, fontStyle: 'italic'}}>Volume</Typography>
                <Typography variant='body2' color="text.secondary">{beer.volume.value}{" "}{beer.volume.unit}</Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography variant='body2' sx={{ fontWeight: 400, fontStyle: 'italic'}}>Boil Volume</Typography>
                <Typography variant='body2' color="text.secondary">{beer.boil_volume.value}{" "}{beer.boil_volume.unit}</Typography>
              </Grid>

              <Typography variant='body1' sx={{ fontWeight: 400, fontStyle: 'italic', paddingTop: 2}}>Mash Temperature</Typography>
              <Grid container justifyContent="space-between">
                <Typography variant='body2' sx={{ fontWeight: 400, fontStyle: 'italic'}}>Temperature</Typography>
                <Typography variant='body2' color="text.secondary">{beer.method.mash_temp[0].temp.value}{" "}{beer.method.mash_temp[0].temp.unit}</Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography variant='body2' sx={{ fontWeight: 400, fontStyle: 'italic'}}>Duration</Typography>
                <Typography variant='body2' color="text.secondary">{beer.method.mash_temp[0].duration} minutes</Typography>
              </Grid>


              <Typography variant='body1' sx={{ fontWeight: 400, fontStyle: 'italic', paddingTop: 2}}>Fermentation</Typography>
              <Grid container justifyContent="space-between">
                <Typography variant='body2' sx={{ fontWeight: 400, fontStyle: 'italic'}}>Temperature</Typography>
                <Typography variant='body2' color="text.secondary">{beer.method.fermentation.temp.value}{" "}{beer.method.fermentation.temp.unit}</Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Typography variant='body2' sx={{ fontWeight: 400, fontStyle: 'italic'}}>Twist</Typography>
                <Typography variant='body2' color="text.secondary">{beer.method.twist}</Typography>
              </Grid>


              <Typography variant='body1' sx={{ fontWeight: 400, fontStyle: 'italic', paddingTop: 2}}>Ingredients</Typography>
              {beer.ingredients.malt.map((malt) => (
                <Grid key={malt.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='body2' color="text.secondary">{malt.name}</Typography>
                  <Typography variant='body2' color="text.secondary">{`${malt.amount.value} ${malt.amount.unit}`}</Typography>
                </Grid>
              ))}



              {beer.ingredients.hops.map((hop, index) => (
                <div key={index}>
                  <Grid container justifyContent="space-between">
                  <Typography variant='body2' color="text.secondary">{`${hop.name}`}</Typography>
                  <Typography variant='body2' color="text.secondary">{`${hop.amount.value} ${hop.amount.unit}`}</Typography>
                  </Grid>

                  <Grid container justifyContent="space-between">
                  <Typography variant='body2' color="text.secondary">Add</Typography>
                  <Typography variant='body2' color="text.secondary">{`${hop.add}`}</Typography>
                  </Grid>


                  <Grid container justifyContent="space-between">
                  <Typography variant='body2' color="text.secondary">Attribute</Typography>
                  <Typography variant='body2' color="text.secondary">{`${hop.attribute}`}</Typography>
                  </Grid>
                </div>
              ))}


              <Grid container justifyContent="space-between">
                <Typography variant='body2' color="text.secondary">Yeast</Typography>
                <Typography variant='body2' color="text.secondary">{beer.ingredients.yeast}</Typography>
              </Grid>

              <Grid container justifyContent="space-between" paddingTop={2}>
                <Typography variant='body2' style={{ display: 'flex', justifyContent: 'space-between' }}>Food Pairing</Typography>
                <Typography variant='body2' color="text.secondary">{beer.food_pairing}</Typography>
              </Grid>

              <Grid container justifyContent="space-between" paddingTop={2}>
                <Typography variant='body2' style={{ display: 'flex', justifyContent: 'space-between' }}>Brewers Tips</Typography>
                <Typography variant='body2' color="text.secondary">{beer.brewers_tips}</Typography>
              </Grid>


              <Grid container justifyContent="space-between" paddingTop={2}>
                <Typography variant='body2' style={{ display: 'flex', justifyContent: 'space-between' }}>Contributed By</Typography>
                <Typography variant='body2' color="text.secondary">{beer.contributed_by}</Typography>
              </Grid>
              

              </Stack>
            </CardContent>
          </Card>
        ))}
      </div>
      )}
    </Container>
  );
}

export default MainApp;
