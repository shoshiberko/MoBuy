import React, { useContext } from "react";
import ProductItem from "./ProductItem";
//import { ProductsContext } from "../../contexts/ProductsContext";
//import styles from './ProductsGrid.module.scss';
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const ProductsGrid = () => {
  const classes = useStyles();

  //const { products } = useContext(ProductsContext);
  const [products, productsSet] = React.useState([]);
  const [productsToShow, productsToShowSet] = React.useState([]);
  //const [productsNamesAndIds, productsNamesAndIdsSet] = React.useState([]);
  const [sort, setSort] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");

  const handleChangeSort = (event) => {
    setSort(event.target.value);
    console.log(event.target.value);
    switch (event.target.value) {
      case 0: //high to low
        productsToShow.sort(function(a, b) {
          return parseInt(b.price) - parseInt(a.price);
        });
        break;
      case 1: //low to high
        productsToShow.sort(function(a, b) {
          return parseInt(a.price) - parseInt(b.price);
        });
        break;
      default:
        break;
    }
  };

  const handleSearchChange = (event, newInputValue) => {
    setSearchValue(newInputValue);
    console.log(newInputValue);
    if (newInputValue !== "" && newInputValue !== null) {
      let index = products.findIndex((item) => {
        return item.name === newInputValue;
      });
      console.log(index);
      if (index !== -1) {
        productsToShowSet([products[index]]);
        console.log("change", products);
      }
    } else {
      productsToShowSet(products);
    }
  };

  React.useEffect(() => {
    async function fetchProducts() {
      const fullResponse = await fetch(
        "/Products?userEmail=" + sessionStorage.getItem("userEmail")
      );
      const responseJson = await fullResponse.json();
      productsSet(responseJson);
      productsToShowSet(responseJson);
    }

    fetchProducts();
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <br />
      <br />
      <br />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <div style={{ width: 300 }}>
                    <Autocomplete
                      value={searchValue}
                      onChange={handleSearchChange}
                      options={products.map((option) => option.name)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Sort
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      defaultValue={0}
                      value={sort}
                      onChange={handleChangeSort}
                      autoWidth
                    >
                      <MenuItem value={0}>Price high to low</MenuItem>
                      <MenuItem value={1}>Price low to high</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}

          <Grid container spacing={4}>
            {productsToShow !== undefined &&
              productsToShow.map((product, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <ProductItem key={index} product={product} />
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
      <br />
      <br />
      <br />
    </React.Fragment>
  );
};

export default ProductsGrid;
