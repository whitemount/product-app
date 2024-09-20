import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Switch, 
  FormControlLabel, 
  Box 
} from '@mui/material';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    inStock: false
  });

  // NOT FOR PRODUCTION
  const username ='admin';
  const password = 'admin';

  const fetchProduct = useCallback(async () => {
    if (id) {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'price') {
      // Format Dot instead comma
      const numericValue = value.replace(',', '.');
      setProduct(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: name === 'inStock' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        auth: {
          username: username,
          password: password
        }
      };

      if (id) {
        await axios.put(`http://localhost:3000/products/${id}`, product, config);
      } else {
        await axios.post('http://localhost:3000/products', product, config);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? 'Edit Product' : 'Add New Product'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="description"
          label="Description"
          multiline
          rows={4}
          value={product.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="price"
          label="Price"
          type="number"
          value={product.price}
          onChange={handleChange}
          required
        />
        <FormControlLabel
          control={
            <Switch
              checked={product.inStock}
              onChange={handleChange}
              name="inStock"
            />
          }
          label="In Stock"
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Save Product
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ProductForm;
