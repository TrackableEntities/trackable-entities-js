import { TrackableEntity } from '../trackable-entitiy';
import { Product } from './product.spec';

export class Category extends TrackableEntity {
  categoryId: number;
  categoryName: string;
  products: Product[];

  constructor();
  constructor(categoryId: number, categoryName: string, ...products: Product[]);
  constructor(categoryId?: number, categoryName?: string, ...products: Product[]) {
    super();
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.products = products;
    return super.proxify(this);
  }
}
