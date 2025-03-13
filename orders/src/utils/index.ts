export function todaysDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') 
  const day = String(today.getDate()).padStart(2, '0') 
  
  return `${year}-${month}-${day}`
}

export function formatDate(isoString: string) {
  const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Asegurar 2 dígitos
    const day = String(date.getDate()).padStart(2, '0'); // Asegurar 2 dígitos

    return `${year}-${month}-${day}`;
}