# Test API 

Go to http://localhost:3001/graphql

Those queries should work

query:

  {
    counters {
      id
      myId
      value
    }
  }

  # output
  
  {
    "data": {
      "counters": [
        {
          "id": "Q291bnQ6",
          "myId": "0",
          "value": 0
        },
        {
          "id": "Q291bnQ6",
          "myId": "1",
          "value": 1
        },
        ...
      ]
    }
  }

mutation:

  mutation {
    increment(input: { myId: "0", clientMutationId: "1"}) {
      count {
        value
        id
        myId
      }
    }
  }

  # output
  
  {
    "data": {
      "increment": {
        "count": [
          {
            "value": 4,
            "id": "Q291bnQ6",
            "myId": "0"
          }
        ]
      }
    }
  }
