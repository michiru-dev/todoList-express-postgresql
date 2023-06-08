import React from 'react'
import Button from './Button'
import { todoListBase } from '../App'

function ShowList({
  list,
  handleDeleteButtonClick,
}: {
  list: todoListBase[]
  handleDeleteButtonClick: (arg: string) => void //eがない時はこれでok?
}) {
  return (
    <div>
      {list.map((item: todoListBase) => (
        <li key={item.id}>
          {item.item}
          <Button
            text={'削除'}
            onClick={() => handleDeleteButtonClick(item.id)}
          />
          <Button text={'編集'} onClick={() => console.log('edited')} />
        </li>
      ))}
    </div>
  )
}

export default ShowList
