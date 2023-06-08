import React from 'react'
import Button from './Button'

function ShowList({ list }: { list: any }) {
  return (
    <div>
      {list.map((item: any) => (
        <li key={item.id}>
          {item.item}
          <Button text={'削除'} onClick={() => console.log('deleted')} />
          <Button text={'編集'} onClick={() => console.log('edited')} />
        </li>
      ))}
    </div>
  )
}

export default ShowList
