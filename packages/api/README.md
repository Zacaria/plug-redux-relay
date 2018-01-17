# Test API 

Go to http://localhost:3001/graphql

query:

  mutation {
    increment(input: { myId: "0", clientMutationId: "1"}) {
      count {
        value
        id
        myId
      }
    }
  }
  
output:

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
