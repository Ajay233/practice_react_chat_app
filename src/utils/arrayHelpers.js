export const arrayObjContains = (id, arr) => {
  let arrayIncludesId = false
  arr.forEach((obj, i) => {
    console.log(obj.id)
    console.log(id)
    if(obj.id === id){
      arrayIncludesId = true
    }
  });
  console.log(arrayIncludesId)
  return arrayIncludesId
}
