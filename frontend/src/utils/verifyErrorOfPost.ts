export function verificarErrorValidacao(errors: any) {

  const validationError = errors.response.data.details;
  
  if (validationError && validationError.length > 0) {
    validationError.forEach((error) => {
      console.log(error['message']);
    });

    return validationError[0].message;
  }


}
