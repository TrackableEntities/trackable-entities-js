import { Product } from './models/product.spec';
import { TrackableSet } from './trackable-set';
import { TrackingState } from './tracking-state';

describe('TrackableEntity', () => {

  let product: Product;

  beforeEach(() => {
    product = new Product(1, 'Bacon', 1);
  });

  it('should be created', () => {
    expect(product).toBeTruthy();
  });

  it('should set entity TrackingState to Modified when tracking', (done) => {

    // Arrange
    product.tracking = true;

    // Act
    product.productName = 'Peas';

    // Assert
    expect(product.trackingState).toEqual(TrackingState.Modified);
    done();
  });

  it('should not set entity TrackingState to Modified when tracking but not changed', (done) => {

    // Arrange
    product.tracking = true;

    // Act
    product.productName = product.productName;

    // Assert
    expect(product.trackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should not set entity TrackingState to Modified when not tracking', (done) => {

    // Arrange
    product.tracking = true;

    // Act
    product.tracking = false;
    product.productName = 'Peas';

    // Assert
    expect(product.trackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should add to entity ModifiedProperties when tracking', (done) => {

    // Arrange
    product.tracking = true;

    // Act
    product.productName = 'Peas';
    product.unitPrice = 5;

    // Assert
    expect(product.trackingState).toEqual(TrackingState.Modified);
    expect(product.modifiedProperties.size).toEqual(2);
    expect(product.modifiedProperties.has('productName')).toBeTruthy();
    expect(product.modifiedProperties.has('unitPrice')).toBeTruthy();
    done();
  });
});
