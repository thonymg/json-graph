# json-graph

Language inspired by the syntax and structure of GraphQL, one can efficiently create and structure JSON objects, providing a more intuitive and streamlined approach to handling and manipulating data in the JSON format.
## Getting Started

To use the `json-graph` in your project, you will need to clone the repository and include it in your codebase. (npm package and deno package come soon)

Run the following command to clone the repository:

```bash
git https://github.com/thonymg/json-graph.git

```
### Installation
After cloning the repository, navigate to the project directory and install any necessary dependencies:

```bash
cd your-repository
npm install
npm run build
```

Import the `toJSON` function into your JavaScript or TypeScript file:
```js
const toJSON = require("./lib/index").toJSON;
```
### Basic Usage
The `toJSON` function accepts a template literal as an argument. The template should be structured with specific keywords like Root, Alias, Blocks, and Lambda.

#### Root

The `Root` keyword indicates the beginning of a new root structure in the template. It's followed by the name of the root structure and optionally additional properties in square brackets.

```graphql
// Input Root -------------------->
# comment
Root Register [title: "Register form"]{
  id: ID! [hidden: true]
  bookName: String! [french: "Nom du livre" |
                     english: "Book name" |
                     description: "The name of the book"]
  author: Author!
  # comment
  count: Count?
  bookFn: BookFunction
}

// Output Root -------------------->
{
  "Register": {
    "name": "Register",
    "id": "#uT0NPh",
    "type": "Root",
    "title": "Register form",
    "data": [
      {
        "name": "id",
        "type": "ID",
        "required": true,
        "hidden": true
      },
      {
        "name": "bookName",
        "type": "String",
        "required": true,
        "french": "Nom du livre",
        "english": "Book name",
        "description": "The name of the book"
      },
      ... block content
      ]
  }
}
```
This defines a root structure named 'Register' with a title property.

#### Alias

The `Alias` keyword is used to define an alias structure, which is a reusable component in the template.

```graphql
// Input Alias -------------------->

Alias Author {
  id: ID!
  name: String!
  age: Number!
}

// Output Alias -------------------->
 
 ...{
  "name": "author",
  "type": "Alias",
  "required": true,
  "data": {
    "id": {
      "name": "id",
      "type": "ID",
      "required": true
    },
    "name": {
      "name": "name",
      "type": "String",
      "required": true
    },
    "age": {
      "name": "age",
      "type": "Number",
      "required": true
    }
  }....
```
This creates an alias named 'Author'.

#### Blocks

The `Blocks` keyword defines a block of properties. Each block represents a group of related properties.

```graphql
// Input Blocks -------------------->

Blocks Count {
  title: String!
  count: Number!
}

// Output Alias -------------------->
 
...{
  "name": "count",
  "type": "Blocks",
  "optional": true,
  "data": {
    "title": {
      "name": "title",
      "type": "String",
      "required": true
    },
    "count": {
      "name": "count",
      "type": "Number",
      "required": true
    }
  }
},...
```
This defines a block named 'Count'.

#### Lambda

The `Lambda` keyword is used for defining a function or a lambda expression. We are two type of lambda. 

##### Declared only Lambda
```graphql
// Input Declared Only Lambda -------------------->

Lambda BookFunction {
  def (n) => {
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result = result * i;
    }
  }
  end
}

// Output Declared Only Lambda -------------------->
 
...{

  "name": "bookFn",
  "type": "Lambda",
  "data": {
    "name": "BookFunction",
    "type": "lambda",
    "func": "
      (n) => { 
        let result = 1; 
        for (let i = 1; i <= n; i++) {
          result = result * i; 
          } 
        }"
  }
},...
```


##### Executed Lambda (in Js/Ts context only) -WIP
```js
// Input Executed Lambda -------------------->

Lambda BookFunction do {
  def (n) => {
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result = result * i;
    }
  }
  end
}

// Output Executed Lambda -------------------->
 
...{
      name: 'bookExec',
      type: 'Lambda',
      data: {
        name: 'BookFunctionExec',
        type: 'lambda',
        func: '(n) => { let result = 1; for (let i = 1; i <= n; i++) { result = result * i; } }',
        funcExe: [Function (anonymous)] <---- Here
      }
  },...
```

### Full Exemple

```ts
const input = toJSON`
# comment
Root Register [title: "Register form"]{
  id: ID! [hidden: true]
  bookName: String! [french: "Nom du livre" |
                     english: "Book name" |
                     description: "The name of the book"]
  author: Author!
  # comment
  count: Count?
  bookFn: BookFunction
}

Alias Author {
  id: ID!
  name: String!
  age: Number!
}

Blocks Count {
  title: String!
  count: Number!
}

Lambda BookFunction {
  def (n) => {
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result = result * i;
    }
  }
  end
}

Lambda BookFunctionExec do {
  def (n) do => {
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result = result * i;
    }
  }
  end
}
`

```

Output: 
```ts
{
  "Register": {
    "name": "Register",
    "id": "#uT0NPh",
    "type": "Root",
    "title": "Register form",
    "data": [
      {
        "name": "id",
        "type": "ID",
        "required": true,
        "hidden": true
      },
      {
        "name": "bookName",
        "type": "String",
        "required": true,
        "french": "Nom du livre",
        "english": "Book name",
        "description": "The name of the book"
      },
      {
        "name": "author",
        "type": "Alias",
        "required": true,
        "data": {
          "id": {
            "name": "id",
            "type": "ID",
            "required": true
          },
          "name": {
            "name": "name",
            "type": "String",
            "required": true
          },
          "age": {
            "name": "age",
            "type": "Number",
            "required": true
          }
        }
      },
      {
        "name": "count",
        "type": "Blocks",
        "optional": true,
        "data": {
          "title": {
            "name": "title",
            "type": "String",
            "required": true
          },
          "count": {
            "name": "count",
            "type": "Number",
            "required": true
          }
        }
      },
      {
        "name": "bookFn",
        "type": "Lambda",
        "data": {
          "name": "BookFunction",
          "type": "lambda",
          "func": "(n) => { let result = 1; for (let i = 1; i <= n; i++) { result = result * i; } }"
        }
      }
    ]
  }
}
```
## Conclusion

`json-graph` simplifies parsing and manipulating complex structured data in JavaScript and TypeScript. For any questions or further information, contact the project maintainers.
