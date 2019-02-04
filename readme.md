# Typescript Fluent Object

[![Build Status](https://travis-ci.org/stefanoruth/support-fluent.svg?branch=master)](https://travis-ci.org/stefanoruth/support-fluent)

## Usage

Example.ts

```typescript
import { Fluent } from 'support-fluent'

const obj = Fluent({ name: 'John' })

obj.age(25)

obj.name // John
obj.last = 'Doe'

obj.toJson() // {name: 'John', age: 25, last: 'Doe'}
```
