# trackable-entities-js

Base classes that track change state when properties are updated and objects are added or removed objects from collections.

[![Build Status](https://travis-ci.org/TrackableEntities/trackable-entities-js.svg)](https://travis-ci.org/TrackableEntities/trackable-entities-js)
[![npm version](https://badge.fury.io/js/trackable-entities.svg)](https://badge.fury.io/js/trackable-entities)

Docs: <https://trackableentities.github.io/trackable-entities-js>

Sample application: <https://github.com/TrackableEntities/trackable-entities-js-sample.git>

> Note: You must change the TypeScript compiler target to "es2015" in **ts.config.json**.
> - Apps using trackable-entities can support most modern browsers (Chrome, Firefox, Safari, Edge, etc), but they will not be able to support legacy browsers (Internet Explorer).

## Setup

Install **trackable-entities** as a runtime dependency from npm.

```
npm i --save trackable-entities
```

## Usage

To track property changes on an object, create a class that extends `TrackableEntity`. Then add a `constructor` that returns `super.proxify(this)`.  For example:

```js
export class Product extends TrackableEntity {
  productId: number;
  productName: string;
  unitPrice: number;

  constructor() {
    super();
    return super.proxify(this);
  }
}
```

Then set the `tracking` property to `true`.  Modifying property values will change the `trackingState` from `Unchanged` to `Modified` and will populate the `modifiedProperties` collection with the names of properties that were changed, so that partial updates (PATCH) may be performed by an API that knows how to apply changes to a persistence store such as a database.

```js
// Product extends TrackableEntity
product = new Product(1, 'Bacon', 1);

// Turn on change tracking
product.tracking = true;

// Modify a property
product.productName = 'Peas';

// Tracking state is set to Modified
expect(product.trackingState).toEqual(TrackingState.Modified);

// Name of modified properties are tracked
expect(product.modifiedProperties.has('productName')).toBeTruthy();
```

There are two collections that support change tracking: `TrackableSet` which extends `Set<T>`, and `TrackableMap` which extends `Map<K, V>`. When items are added their `trackingState` is set to `Added`, and when items are deleted their `trackingState` is set to `Deleted`.

```js
// Create a new TrackableSet of products
const products = [
  new Product(1, 'Bacon', 1),
  new Product(2, 'Lettuce', 2),
  new Product(3, 'Tomatoes', 3),
];
const trackableProducts = new TrackableSet<Product>(...products);

// Turn on change tracking
product.tracking = true;

// Add an entity
const addedProduct = new Product(4, 'Carrots', 4);
trackableProducts.add(addedProduct);

// Tracking state is set to Added
expect(addedProduct.trackingState).toEqual(TrackingState.Added);

// Remove an entity
const removedProduct = new Product(4, 'Carrots', 4);
trackableProducts.delete(removedProduct);

// Tracking state is set to Added
expect(removedProduct.trackingState).toEqual(TrackingState.Deleted);
```

## Persistence

Once the tracking state of entities have been set, you can pass them to a Web API where they can be persisted to a data store.  [Trackable Entities](http://trackableentities.github.io) has a server-side [NuGet package](https://www.nuget.org/packages/TrackableEntities.EF.6) for persisting changes to a relational data store using [Entity Framework](https://docs.microsoft.com/en-us/ef/). The current version supports the full .NET Framework with EF 6, and a future version will support [.NET Core](https://www.microsoft.com/net/core) and EF Core as a [NetStandard](https://docs.microsoft.com/en-us/dotnet/standard/net-standard) library.

## Roadmap

We are currently developing the full API for **trackable-entities**.  See the project [roadmap](https://github.com/TrackableEntities/trackable-entities-js/wiki/Roadmap) for more information.

## Contributing

If you'd like to help with this project, please contact @tonysneed via email (tony@tonysneed.com) or twitter (@tonysneed).