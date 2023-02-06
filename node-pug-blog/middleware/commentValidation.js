const formValidate = (name='', email='', commenttext ='') => {
  const errors = []
  if(name === '' || email === '' || commenttext === ''){
    errors.push({message:'Please fill all field'})
  }else if(name.length < 3){
    errors.push({message:'Name must be less 4 charecters!'})
  }else if(commenttext.length < 10){
    errors.push({message:'Comment must be less 10 charecters!'})
  }
  return errors
}

module.exports = formValidate