import React from 'react'
import {Card, Image} from 'semantic-ui-react'

function DogCard({name, breed, weight, age, image}) {

  return (
    <Card>
        <Image src={image} wrapped ui={false} />
        <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>Born in {2023-age}</Card.Meta>
        <Card.Description>
            Breed: {breed}
        </Card.Description>
        <Card.Description>
            Weight: {weight} lbs
        </Card.Description>
        {/* <Card.Description>
            Parks Visited: {dog_parks}
        </Card.Description> */}
        </Card.Content>
    </Card>
  )
}

export default DogCard