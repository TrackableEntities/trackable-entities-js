import { Product } from './models/product.spec';
import { TrackableSet } from './trackable-set';
import { TrackingState } from './tracking-state';

describe('TrackableSet', () => {

  let trackableSet: TrackableSet<Product>;

  beforeEach(() => {
    const foods = [
      new Product(1, 'Bacon', 1),
      new Product(2, 'Lettuce', 2),
      new Product(3, 'Tomatoes', 3),
    ];
    trackableSet = new TrackableSet<Product>(...foods);
  });

  it('should be created', () => {
    expect(trackableSet).toBeTruthy();
  });

  it('should contain items', () => {
    expect(trackableSet.size).toBe(3);
  });

  it('should set entity TrackingState to Added when tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = new Product(4, 'Carrots', 4);

    // Act
    trackableSet.add(food);

    // Assert
    expect(food.trackingState).toEqual(TrackingState.Added);
    done();
  });

  it('should not set entity TrackingState to Added when not tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = new Product(4, 'Carrots', 4);

    // Act
    trackableSet.tracking = false;
    trackableSet.add(food);

    // Assert
    expect(food.trackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should set entity TrackingState to Deleted when tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    trackableSet.delete(food);

    // Assert
    expect(food.trackingState).toEqual(TrackingState.Deleted);
    done();
  });

  it('should not set entity TrackingState to Deleted when not tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    trackableSet.tracking = false;
    trackableSet.delete(food);

    // Assert
    expect(food.trackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should cache Deleted entities when tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    trackableSet.delete(food);

    // Assert
    expect(food.trackingState).toEqual(TrackingState.Deleted);
    const deletedEntities = [...(trackableSet as any).deletedEntities];
    expect(deletedEntities[0]).toBe(food);
    done();
  });

  it('should clear Deleted entities when not tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    trackableSet.delete(food);
    trackableSet.tracking = false;

    // Assert
    expect(food.trackingState).toEqual(TrackingState.Deleted);
    const deletedEntities = [...(trackableSet as any).deletedEntities];
    expect(deletedEntities.length).toEqual(0);
    done();
  });

  it('should set entity TrackingState to Modified when tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    food.productName = 'Peas';

    // Assert
    expect(food.trackingState).toEqual(TrackingState.Modified);
    done();
  });

  it('should not set entity TrackingState to Modified when tracking but not changed', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    food.productName = food.productName;

    // Assert
    expect(food.trackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should not set entity TrackingState to Modified when not tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    trackableSet.tracking = false;
    food.productName = 'Peas';

    // Assert
    expect(food.trackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should add to entity ModifiedProperties when tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    food.productName = 'Peas';
    food.unitPrice = 5;

    // Assert
    expect(food.trackingState).toEqual(TrackingState.Modified);
    expect(food.modifiedProperties.size).toEqual(2);
    expect(food.modifiedProperties.has('productName')).toBeTruthy();
    expect(food.modifiedProperties.has('unitPrice')).toBeTruthy();
    done();
  });
});
