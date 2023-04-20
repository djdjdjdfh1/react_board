import React from 'react'
import { useContext, useState } from 'react';
import DataContext from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();

    const [writer, setWriter] = useState();

    // 객체의 구조 분해를 통해서 원하는 속성만 가져옴(action)
    const {action} = useContext(DataContext);

    // 로그인 메소드
    const onLogin = () => {
        // 1. user의 객체를 만듦
        const newUser = {
            writer : writer,
            login : true
        }
        // 2. set메소드를 통해서 수정 >> DataContext값 가져옴
        action.setUser(newUser);

        // home 또는 boardlist 이동
        navigate('/')
    }

  return (
    <div>
        <h3>LoginForm</h3>
        <label htmlFor="">id를 입력해주세요</label>
        <input type="text" 
            onChange={(e) =>{setWriter(e.target.value)}}
        />
        <button
            onClick={onLogin}
        >
            로그인
        </button>
    </div>
  )
}
