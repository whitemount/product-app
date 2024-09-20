import React, { useState, useEffect, useCallback } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Chip, 
  Pagination, 
  Box,
  Button,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const username ='admin';
  const password = 'admin';

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products?page=${currentPage}&limit=${pageSize}`);
      setProducts(response.data.items);
      setTotalPages(Math.ceil(response.data.total / pageSize));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const formatPrice = (price) => {
    const numPrice = Number(price);
    if (isNaN(numPrice)) {
      return price;
    }
    return new Intl.NumberFormat('de-AT',
      {
        style: 'currency',
        currency: 'EUR'
      }
    ).format(numPrice);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm('Are you sure you want to delete the product ' + name + '?')) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`, {
          auth: {
            username: username,
            password: password
          }
        });
        fetchProducts(); // Reload products after delete
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product.');
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Product List
      </Typography>
      <Button component={Link} to="/add" variant="contained" color="secondary" style={{ marginBottom: 20, marginLeft: 10 }}>
        Add New Product
      </Button>
      {products.length > 0 ? (
        <>
          <List>
            {products.map((product) => (
              <ListItem key={product.id} divider>
                <ListItemText
                  primary={product.name}
                  secondary={product.description}
                />
                <Typography variant="body1" style={{ marginRight: 16 }}>
                  {formatPrice(product.price)}
                </Typography>
                <Chip 
                  label={product.inStock ? 'In Stock' : 'Out of Stock'} 
                  color={product.inStock ? 'success' : 'error'} 
                  variant="outlined"
                  style={{ marginRight: 16 }}
                />
                <Button component={Link} to={`/edit/${product.id}`} style={{ marginRight: 8 }}>
                  Edit
                </Button>
                <IconButton 
                  edge="end" 
                  aria-label="delete" 
                  onClick={() => handleDelete(product.id, product.name)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination 
              count={totalPages} 
              page={currentPage} 
              onChange={handlePageChange} 
              color="primary" 
            />
          </Box>
        </>
      ) : (
        <Typography>No products found.</Typography>
      )}
    </Container>
  );
};

export default ProductList;