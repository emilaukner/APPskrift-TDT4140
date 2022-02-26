import React, { useEffect, useState } from "react";
import FullWidthImageHeader from "../../components/FullWidthImageHeader/FullWidthImageHeader";
import FloatingCreateRecipeButton from "../../components/FloatingCreateRecipeButton/FloatingCreateRecipeButton";
import Food from "../../assets/Food.png";
import SingleRecepieModule from "../../components/SingleRecipeModule/SingleRecipeModule";
import Dish from "../../assets/DishDeleteMe.png";
import axios from "axios";
import CreateUser from "../../components/CreateUser/CreateUser";
import { ToggleButtonGroup, ToggleButton, Paper } from "@mui/material";
import { Box, Grid, Divider, Typography } from "@mui/material";

const FrontPage = () => {
  //TODO make catogories a own component
  //===============Categories selection =======================//
  const [meal, setMeal] = useState();
  const [estimate, setEstimate] = useState();
  const [cousine, setCousine] = useState();
  const [otherCategories, setOtherCategories] = useState(() => []);

  const handleChangeMeal = (event, newMeal) => {
    if (newMeal !== null) {
      setMeal(newMeal);
    }
  };

  const handleChangeEstimate = (event, newEstimate) => {
    if (newEstimate !== null) {
      setEstimate(newEstimate);
    }
  };

  const handleChangeCousine = (event, newCouisine) => {
    if (newCouisine !== null) {
      setCousine(newCouisine);
    }
  };

  const handleChangeOtherCategories = (event, newOtherCategories) => {
    setOtherCategories(newOtherCategories);
  };
  //====================== Category end================================//

  const [recipeData, setRecipeData] = useState([]);
  const [recipeLikedData, setRecipeLikedData] = useState([]);
  const [recipeSavedData, setRecipeSavedData] = useState([]);

  //This function gets all liked recepies by current user
  const getRecipesLikedRequest = async () => {
    await axios
      .get(`/users/5791cd11-7f6a-4fc5-bbc3-bd09a289ca9d/favorites/`)
      .then((response) => {
        setRecipeLikedData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //This function gets all saved recepies by current user
  const getRecipesSavedRequest = async () => {
    await axios
      .get(`/users/5791cd11-7f6a-4fc5-bbc3-bd09a289ca9d/saved/`)
      .then((response) => {
        setRecipeSavedData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //This function gets all recepies in database
  const getRecipesRequest = async () => {
    await axios
      .get("/recipes/")
      .then((response) => {
        setRecipeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //On load of page these api requests is made to get data
  useEffect(() => {
    getRecipesLikedRequest();
    getRecipesSavedRequest();
    getRecipesRequest();
  }, []);

  const createRecipeModules = () => {
    console.log("Saved:", recipeSavedData);
    console.log("Liked:", recipeLikedData);
    const recipes = recipeData.map((recipe) => {
      return (
        <SingleRecepieModule
          recipeId={recipe.recipeId}
          title={recipe.title}
          image={Dish}
          meal="Dessert"
          cousine="European"
          timeEstimate={recipe.estimate}
          difficulty={recipe.difficulty}
          likedByUser={recipeLikedData.includes(recipe.recipeId) ? true : false}
          savedByUser={recipeSavedData.includes(recipe.recipeId) ? true : false}
          numberOfLikes={253}
        />
      );
    });
    return recipes;
  };

  return (
    <>
      <FullWidthImageHeader imgHeader={Food} />

      {/* TODO move category to own component*/}
      <Box
        sx={{
          marginTop: "2%",
        }}
        justifyContent="center"
      >
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Paper>
              <Grid container rowSpacing={1} sx={{ padding: "2%" }}>
                <Grid item xs={3}>
                  <Grid item>
                    <Typography variant="caption">Måltid</Typography>
                  </Grid>
                  <Grid item>
                    <ToggleButtonGroup
                      color="primary"
                      size="small"
                      value={meal}
                      onChange={handleChangeMeal}
                    >
                      <ToggleButton value="Frokost">Frokost</ToggleButton>
                      <ToggleButton value="Lunsj">Lunsj</ToggleButton>
                      <ToggleButton value="Middag">Middag</ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Grid item>
                    <Typography variant="caption">Kjøkken</Typography>
                  </Grid>
                  <Grid item>
                    <ToggleButtonGroup
                      color="primary"
                      size="small"
                      value={cousine}
                      onChange={handleChangeCousine}
                    >
                      <ToggleButton value="Europeisk">Europeisk</ToggleButton>
                      <ToggleButton value="Asiatisk">Asiatisk</ToggleButton>
                      <ToggleButton value="Fransk">Fransk</ToggleButton>
                      <ToggleButton value="Amerikansk">Amerikansk</ToggleButton>
                      <ToggleButton value="Indisk">Indisk</ToggleButton>
                      <ToggleButton value="Annet">Annet</ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <Grid item>
                    <Typography variant="caption">Tidsestimat</Typography>
                  </Grid>
                  <Grid item>
                    <ToggleButtonGroup
                      color="primary"
                      size="small"
                      value={estimate}
                      onChange={handleChangeEstimate}
                    >
                      <ToggleButton value="15 min">15 min</ToggleButton>
                      <ToggleButton value="30 min">30 min</ToggleButton>
                      <ToggleButton value="45 min">45 min</ToggleButton>
                      <ToggleButton value="1 time">1 time</ToggleButton>
                      <ToggleButton value="Over 1 time">
                        Over 1 time
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <Grid item>
                    <Typography variant="caption">Øvrige kategorier</Typography>
                  </Grid>
                  <Grid item>
                    <ToggleButtonGroup
                      color="primary"
                      size="small"
                      value={otherCategories}
                      onChange={handleChangeOtherCategories}
                    >
                      <ToggleButton value="Vegetar">Vegetar</ToggleButton>
                      <ToggleButton value="Glutenfri">Glutenfri</ToggleButton>
                      <ToggleButton value="Laktosefri">Laktosefri</ToggleButton>
                      <ToggleButton value="Sterkt">Sterkt</ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "10%",
          paddingBottom: "4%",
        }}
      >
        {createRecipeModules()}
      </div>
      <FloatingCreateRecipeButton showButton={true} />
    </>
  );
};

export default FrontPage;
