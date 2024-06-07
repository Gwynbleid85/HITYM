import { Box, Button, Grid, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import useWebsockets from "../hooks/usePosition";
import { ReadyState } from 'react-use-websocket';
import { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { CircleMarker } from "react-leaflet";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
let counter = 0;

const stringToColour = (str: string) => {
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour
}


export function Home() {
  
  const { sendJsonMessage, messages, readyState, positions, updatePositionRelative} = useWebsockets();

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  console.log("Component rendered", (counter += 1));

  const [clicks, setClicks] = useState(0);
  const handleClick = useCallback(() => {
    setClicks((clicks) => clicks + 1);
    updatePositionRelative(0.001, 0.001);
  }, [clicks, sendJsonMessage]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);


  return (
    <>
      <Typography component="p" variant="h5" color="secondary.main">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper variant="elevation" elevation={8} sx={{m:2}}>
              <Box display="flex" alignContent="center" flexDirection="column">
                <Box display="flex" justifyContent="center">
                  <Typography variant="h5" sx={{m:1}}>Messages</Typography>
                </Box>
                <Box m={1} sx={{color: readyState === ReadyState.OPEN? "green": "black"}} display="flex" justifyContent="center">
                  {readyState === ReadyState.CONNECTING && "( Connecting... )"}
                  {readyState === ReadyState.OPEN && "( Connected! )"}
                  {readyState === ReadyState.CLOSING && "( Closing... )"}
                  {readyState === ReadyState.CLOSED && "( Closed. )"}
                  {readyState === ReadyState.UNINSTANTIATED && "( Uninstantiated. )"}
                </Box>
              </Box>

              <Paper variant="elevation" style={{ height: "70vh", overflow: "auto", }}>
                {messages.map((message, index) => message?(
                  
                  <ListItem key={index}>
                    <ListItemText primary={message.event} secondary={message.sender} style={{color: stringToColour(message.sender)}}/>
                  </ListItem>
              ):"")}
              <div ref={messagesEndRef} />
              </Paper>


              <Grid container spacing={2}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained" 
                    onClick={() => updatePositionRelative(0.01, 0)}
                    sx={{ m:1 }}>
                      <KeyboardArrowUpIcon/>
                    </Button>
                </Grid>
                <Grid item xs={4}></Grid>
                
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained" 
                    onClick={() => updatePositionRelative(0, -0.01)}
                    sx={{ m:1 }}>
                      <KeyboardArrowLeftIcon/>
                    </Button>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                <Button
                    variant="contained" 
                    onClick={() => updatePositionRelative(0, 0.01)}
                    sx={{ m:1 }}>
                      <KeyboardArrowRightIcon/>
                    </Button>
                </Grid>
                <Grid item xs={2}></Grid>


                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                <Button
                    variant="contained" 
                    onClick={() => updatePositionRelative(-0.01, 0)}
                    sx={{ m:1 }}>
                      <KeyboardArrowDownIcon/>
                    </Button>
                </Grid>
                <Grid item xs={4}></Grid>

              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}
            style={{height: "100%", width: "100%"}}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {
                Object.entries(positions).map(([key, value]) => {
                  return (
                    <CircleMarker key={key} center={value} radius={10} color={stringToColour(key)} >
                      <Popup>
                        {key}
                      </Popup>
                    </CircleMarker>
                  )
                })
              }               
            </MapContainer>
          </Grid>
        </Grid>
      </Typography>
    </>
  );
}

export default Home;
