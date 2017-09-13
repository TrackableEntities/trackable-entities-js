import { Product } from './models/product.spec';
import { TrackableMap } from './trackable-map';
import { TrackingState } from './tracking-state';

describe('TrackableMap', () => {

  let trackableMap: TrackableMap<string, Product>;

  beforeEach(() => {
    const entries: [string, Product][] = [
      ['Bacon', new Product(1, 'Bacon', 1)],
      ['Lettuce', new Product(2, 'Lettuce', 2)],
      ['Tomatoes', new Product(3, 'Tomatoes', 3)],
    ];
    trackableMap = new TrackableMap<string, Product>(...entries);
  });

  it('should be created', () => {
    expect(trackableMap).toBeTruthy();
  });

  it('should contain items', () => {
    expect(trackableMap.size).toBe(3);
  });

  it('should set entity TrackingState to Added when tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const food = new Product(4, 'Carrots', 4);

    // Act
    trackableMap.add(food.productName, food);

    // Assert
    expect(food.trackingState).toEqual(TrackingState.Added);
    done();
  });

  it('should not set entity TrackingState to Added when not tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const food = new Product(5, 'Carrots', 4);

    // Act
    trackableMap.tracking = false;
    trackableMap.add(food.productName, food);

    // Assert
    expect(food.trackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should set entity TrackingState to Deleted when tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    trackableMap.delete(entry[0]);

    // Assert
    expect(entry[1].trackingState).toEqual(TrackingState.Deleted);
    done();
  });

  it('should not set entity TrackingState to Deleted when not tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    trackableMap.tracking = false;
    trackableMap.delete(entry[0]);

    // Assert
    expect(entry[1].trackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should cache Deleted entities when tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    trackableMap.delete(entry[0]);

    // Assert
    expect(entry[1].trackingState).toEqual(TrackingState.Deleted);
    const deletedEntities = [...(trackableMap as any).deletedEntities];
    expect(deletedEntities[0][0]).toBe(entry[0]);
    expect(deletedEntities[0][1]).toBe(entry[1]);
    done();
  });

  it('should clear Deleted entities when not tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    trackableMap.delete(entry[0]);
    trackableMap.tracking = false;

    // Assert
    expect(entry[1].trackingState).toEqual(TrackingState.Deleted);
    const deletedEntities = [...(trackableMap as any).deletedEntities];
    expect(deletedEntities.length).toEqual(0);
    done();
  });

  it('should set entity TrackingState to Modified when tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    entry[1].productName = 'Peas';

    // Assert
    expect(entry[1].trackingState).toEqual(TrackingState.Modified);
    done();
  });

  it('should not set entity TrackingState to Modified when tracking but not changed', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    entry[1].productName = entry[1].productName;

    // Assert
    expect(entry[1].trackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should not set entity TrackingState to Modified when not tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    trackableMap.tracking = false;
    entry[1].productName = 'Peas';

    // Assert
    expect(entry[1].trackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should add to entity ModifiedProperties when tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    entry[1].productName = 'Peas';
    entry[1].unitPrice = 5;

    // Assert
    expect(entry[1].trackingState).toEqual(TrackingState.Modified);
    expect(entry[1].modifiedProperties.size).toEqual(2);
    expect(entry[1].modifiedProperties.has('productName')).toBeTruthy();
    expect(entry[1].modifiedProperties.has('unitPrice')).toBeTruthy();
    done();
  });
});
