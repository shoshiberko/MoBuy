import React, { useContext } from "react";
import Product from "../store/ProductItem";
import { ProductsContext } from "../../contexts/ProductsContext";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
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

  const [products, productsSet] = React.useState([]);
  React.useEffect(() => {
    async function fetchProducts() {
      const fullResponse = await fetch(
        "/Products?userEmail=" + sessionStorage.getItem("userEmail")
      );
      const responseJson = await fullResponse.json();
      productsSet(responseJson);
    }

    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Saved Items
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}

          <Grid container spacing={4}>
            {products
              .filter((product) => product.savedItem === true) //just the saved items
              .map((product, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Product
                    key={index}
                    product={product}
                    renderProductsGrid={(productId) => {
                      productsSet(
                        products.filter((item) => {
                          return item.id !== productId;
                        })
                      );
                    }}
                  />
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
