// src/products/dto/create-product.dto.ts
export class CreateProductDto {
    readonly name: string;
    readonly description: string;
    readonly sellingPrice: number;
    readonly actualPrice: number;
    readonly tags: string;
  }
  