import React from 'react'

const ListarCliente = () => {
  return (
    <>
        <table className="table-cliente">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Dni</th>
              <th>Email</th>
              <th>Celular</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="celda-cliente"></td>
              <td className="celda-cliente"></td>
              <td className="celda-cliente"></td>
              <td className="celda-cliente"></td>
              <td className="celda-cliente"></td>
              <td className="celda-cliente"></td>
              <td>
                <button className="btn-editar-cliente"><i className='bx bx-edit'></i></button>
                <button className="btn-crear-mascota"><i className='bx bx-edit'></i></button>
              </td>
            </tr>
          </tbody>
        </table>
    </>
  )
}

export default ListarCliente