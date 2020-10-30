import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneSquare } from '@fortawesome/free-solid-svg-icons'

const CheckNumber = (props) => {
  //console.log(props)
  const check = () =>
    window.open(
      `'https://api.whatsapp.com/send/'?phone=${props.phone}&text=works`
    )

  return (
    <Button variant="info" onClick={() => check()}>
      <FontAwesomeIcon icon={faPhoneSquare} />
    </Button>
  )
}

export default CheckNumber
