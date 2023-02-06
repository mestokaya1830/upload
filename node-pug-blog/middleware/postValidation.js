const formValidate = (title='', category='', mainimage ='noimage.jpg') => {
  const errors = []
  if(title === '' || category === ''){
    errors.push({message:'Please fill all field'})
  }else if(title.length < 3){
    errors.push({message:'Name must be less 4 charecters!'})
  }
  return errors
}

module.exports = formValidate