import React from 'react'
import data from '../data/dummy.json'

import {useState} from 'react'
export default function Home() {
  const[dataList, setDataList] = useState(data);
  return (
    <div>
        Home
        {
            dataList.map((data)=>(
                <li key={data.id}>{data.id}</li>
            ))
        }
    </div>
  )
}
