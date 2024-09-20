import { Controller, Get, Query, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from '../auth/basic-auth.guard';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    const [items, total] = await this.productsService.findAll(+page, +limit);
    return {
      items,
      total,
      page: +page,
      limit: +limit
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Post()
  @UseGuards(BasicAuthGuard)
  create(@Body() product: Partial<Product>): Promise<Product> {
    return this.productsService.create(product);
  }

  @Put(':id')
  @UseGuards(BasicAuthGuard)
  update(@Param('id') id: string, @Body() product: Partial<Product>): Promise<Product> {
    return this.productsService.update(+id, product);
  }

  @Delete(':id')
  @UseGuards(BasicAuthGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }
}