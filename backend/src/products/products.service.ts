import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(page: number, limit: number): Promise<[Product[], number]> {
    const [items, total] = await this.productsRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    return [items, total];
  }

  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({ where: { id } });
  }

  create(product: Partial<Product>): Promise<Product> {
    const newProduct = this.productsRepository.create(product);
    return this.productsRepository.save(newProduct);
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    await this.productsRepository.update(id, product);
    return this.productsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}