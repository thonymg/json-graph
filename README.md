# json-graph

Language inspired by the syntax and structure of GraphQL, one can efficiently create and structure JSON objects, providing a more intuitive and streamlined approach to handling and manipulating data in the JSON format.

Example: 
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
