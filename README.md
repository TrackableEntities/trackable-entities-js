# trackable-entities-js

Base classes that track change state when properties are updated and objects are added or removed objects from collections.

[![Build Status](https://travis-ci.org/TrackableEntities/trackable-entities-js.svg)](https://travis-ci.org/TrackableEntities/trackable-entities-js)
[![npm version](https://badge.fury.io/js/trackable-entities.svg)](https://badge.fury.io/js/trackable-entities)

Docs: <https://trackableentities.github.io/trackable-entities-js>

Sample application: <https://github.com/TrackableEntities/trackable-entities-js-sample.git>

## Setup

Install **trackable-entities** as a runtime dependency from npm.

```
npm i --save trackable-entities
```

## Usage

To track property changes on an object, create a class that extends `TrackableEntity`. Then add a `constructor` that returns `super.proxify(this)`.  For example

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