import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import DataContext from '../context/DataContext'

export default function NavHeader() {
  const {state} = useContext(DataContext);

  return (
    <div>
        <Link to='/'> HOME |</Link>
        <Link to='/boardlist'> BOARD |</Link>
        <Link to='/boardwriteform'> WRITE |</Link>
        <Link to='/image'> IMAGE |</Link>
        {/* state의 user의 login이 false 일때 Link
          true 일때 : user의 writer 출력
        */}
        
        {
          state.user.login ? <span> {state.user.writer} </span>
          : <Link to='/loginform'> LOGIN </Link>
        }
    </div>
  )
}
