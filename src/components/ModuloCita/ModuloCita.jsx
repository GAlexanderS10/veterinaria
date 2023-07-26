import React, { Fragment } from 'react'
import BuscarCita from './BuscarCita'
import RegistrarCita from './RegistrarCita'
export const ModuloCita = () => {


  return (
    
      <Fragment>
        <div>

          <RegistrarCita/>
          <BuscarCita/>
        </div>
      </Fragment>

  )
}