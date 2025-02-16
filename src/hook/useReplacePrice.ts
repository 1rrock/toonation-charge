const useReplacePrice = (number: number): string => {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export default useReplacePrice;