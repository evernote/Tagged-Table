# Tagged-Table

Tagged-Table allows you to write tables in JavaScript using ES2015 tagged templates that compile down to arrays of objects.

## Install

`npm i -S tagged-table`;

## Usage

This:

```javascript
import taggedTable from 'tagged-table';

const data = taggedTable`
  id   | name   | value      | date
  ${1} | first  | ${false}   | 1/1/1970
  ${2} | second | ${true}    | 1/1/2000
  ${3} | third  | ${false}   | 3/5/2005
`;
```

Will become this:

```javascript
[
  { id: 1, name: 'first', value: false, date: '1/1/1970' },
  { id: 2, name: 'second', value: true, date: '1/1/2000' },
  { id: 3, name: 'third', value: false, date: '3/5/2005' }
]
```

Strings don't need interpolation, but leaving a cell empty will have unintended results. Use `${undefined}` instead of an empty cell.
