import { useState } from "react"

export default function DeleteButton({ onConfirm, confirmationText }: { onConfirm: () => void, confirmationText: string }) {
  const [deleteModal, setDeleteModal] = useState(false)
  return (
    <>
      <button className="bg-red-300 dark:bg-red-500 rounded px-3 py-2 cursor-pointer" onClick={() => setDeleteModal(prev => !prev)}>Delete</button>
      {deleteModal && (
        <div className="fixed inset-0 bg-neutral-900/40 grid place-items-center z-10">
          <div className="bg-slate-100 dark:bg-neutral-700 p-5 rounded-lg shadow-lg flex flex-col gap-3 z-30">
            <p className="text-center text-lg">{confirmationText}</p>
            <div className="flex justify-between gap-6">
              <button className=" cursor-pointer w-full  py-2 bg-neutral-100 dark:bg-neutral-600" onClick={onConfirm}>Yes</button>
              <button className=" cursor-pointer w-full  py-2 bg-neutral-100 dark:bg-neutral-600" onClick={() => setDeleteModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
