import React, { Fragment } from 'react'
import RegistrarServicio from './RegistrarServicio'
import BuscarServicio from './BuscarServicio'
export const ModuloServicio = () => {


  return (
    
      <Fragment>
        <div>
        <RegistrarServicio/>
          <BuscarServicio/>
        </div>
      </Fragment>

  )
}