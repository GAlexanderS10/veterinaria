import React, { Fragment } from 'react'
import BuscarMascota from './BuscarMascota'
import RegistrarMascota from './RegistrarMascota'

export const ModuloMascota = () => {


  return (
    
      <Fragment>
        <div>
          <RegistrarMascota/>
          <BuscarMascota/>
        </div>
      </Fragment>

  )
}