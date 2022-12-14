import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import { StyledProfilePopup } from "./style";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Profileimg from "../../assets/headshot.png";
import axios from "axios";

const UserProfileComponent = ({onLogOut, onClose, show, userId}) => {

    const [userID, setUserID] = useState();
    const [userImage, setImage] = useState();
    const [userName, setUserName] = useState();
    const [profileImage, setProfileImage] = useState();
    const [email, setemail] = useState();

    const getUser = async () => {
        await axios
        .get(`/users/${userId}`)
        .then((res) => {
            console.log(res.data.userId);
            setUserID(res.data.userId);
            setUserName(res.data.username);
            setemail(res.data.email);
            setProfileImage(res.data.image);
        })
        .catch((err) => {
			console.log(err)
		})
    };
    useEffect(() => {
		getUser();
    }, [show]);
    
  return (
    <>
    <StyledProfilePopup show={show}>
    <Box sx={{ width: "30%", top: "5%", left: "37.5%", position: "fixed" }}>
        <Paper sx={{padding: "7%"}}>
            <Grid container
            justifyContent="right">
            <Grid xs={1}>
                        <CloseIcon 
                            style={{
                                fill: "red",
                                cursor: "pointer",
                            }}
                            onClick={onClose}
                            />
                </Grid>
            </Grid>  
          <Grid
              container spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
              >
                    <Grid item xs={12}>
                        <img alt="profilePicture" src={profileImage} height="200" width="200" style={{borderRadius:"50%"}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                        {userName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            {email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="text" onClick={onLogOut}>Logg ut</Button>
                    </Grid>
                    {/*<Grid item xs={12}>
                        <Button variant="text">Slett konto</Button>
                        </Grid>*/}
                </Grid>
              </Paper>
          </Box>
      </StyledProfilePopup>
    </>
  );
};

export default UserProfileComponent;