import { useState } from "react"

export default function DeleteButton({ onConfirm, confirmationText }: { onConfirm: () => void, confirmationText: string }) {
  const [deleteModal, setDeleteModal] = useState(false)
  return (
    <>
      <button onClick={() => setDeleteModal(prev => !prev)}>Delete</button>
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
