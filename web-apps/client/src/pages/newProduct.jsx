import React, { useEffect, createElement } from 'react';
import Header from '../components/header';
import ProductForm from '../components/productForm';
import ProductStore from '../contexts/productStore';
import { makeStyles } from '@material-ui/core/styles';
import AlertDialog from '../components/alertDialog';

const useStyles = makeStyles(() => ({
  productForm: {
    position: 'relative',
    minHeight: '100%',
  },
}));

const NewProduct = () => {
  const classes = useStyles();
  useEffect(() => {
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerText = `
    html {
      font-size: calc(10px + 3.5vmin);
    }
    #root > div > * {
      width: 100%;
    }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
    @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap');
    * {
      font-family: 'Nanum Gothic';
    }
    `;
    console.log(css);
    const id = document.head.appendChild(css);
    return () => {
      document.head.removeChild(id);
    }
  }, []);

  return (
    <ProductStore>
      <Header />
      <ProductForm className={classes.productForm} />
      <AlertDialog />
    </ProductStore>
  );
};

export default NewProduct;
