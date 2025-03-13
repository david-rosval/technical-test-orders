import { useState } from "react"

export default function DeleteButton({ onConfirm, confirmationText }: { onConfirm: () => void, confirmationText: string }) {
  const [deleteModal, setDeleteModal] = useState(false)
  return (
    <>
      <button className="bg-red-300 dark:bg-red-500 rounded px-3 py-2 cursor-pointer" onClick={() => setDeleteModal(prev => !prev)}>Delete</button>
      {deleteModal && (
        <div>
          <p>{confirmationText}</p>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={() => setDeleteModal(false)}>No</button>
        </div>
      )}
    </>
  )
}
