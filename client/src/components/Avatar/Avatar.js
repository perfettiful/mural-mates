import React from 'react'
import { Image } from 'semantic-ui-react'

const Avatar = props => (
  <div>
    <Image src='/images/wireframe/square-image.png' avatar />
    <span>{...props}</span>
  </div>
)

export default Avatar;