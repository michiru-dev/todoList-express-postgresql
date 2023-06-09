import React from 'react'
import Button from './Button'
import { todoListBase } from '../App'

function ShowList({
  list,
  handleDeleteButtonClick,
  handleEditButtonClick,
  handleUpdatedItem,
  handleSaveButtonClick,
  editId,
  updatedItem,
}: {
  list: todoListBase[]
  handleDeleteButtonClick: (id: string) => void //eがない時はこれでok?
  handleEditButtonClick: (id: string) => void
  handleUpdatedItem: any
  handleSaveButtonClick: any
  editId: string
  updatedItem: string
}) {
  return (
    <div>
      {list.map((item: todoListBase) => (
        <div key={item.id}>
          {editId === item.id ? (
            <>
              <input
                value={updatedItem}
                type="text"
                onChange={(e) => handleUpdatedItem(e)}
              />
              <Button
                text={'保存'}
                onClick={() => handleSaveButtonClick(item.id, updatedItem)}
              />
            </>
          ) : (
            <li key={item.id}>
              {item.item}
              <Button
                text={'削除'}
                onClick={() => handleDeleteButtonClick(item.id)}
              />
              <Button
                text={'編集'}
                onClick={() => handleEditButtonClick(item.id)}
              />
            </li>
          )}
        </div>
      ))}
    </div>
  )
}

export default ShowList
