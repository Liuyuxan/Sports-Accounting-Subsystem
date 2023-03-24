export const downloadExcel = (UUID) => {
  console.log("UUID:", UUID)
  window.open(`http://10.0.6.17:8080/Excel/download/getExcel/${UUID}`)
}
