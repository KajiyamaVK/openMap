
function checkRequiredInputs() {
    const requiredInputs = document.querySelectorAll('input[required]');
    for (const input of requiredInputs) {
      if (!input.value) {
        return false;
      }
    }
    return true;
  };


export {checkRequiredInputs};





