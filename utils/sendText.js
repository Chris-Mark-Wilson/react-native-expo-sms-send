import * as SMS from "expo-sms";

const text = () => {
    const numbersArray=["+447597852695"]
    return SMS.isAvailableAsync()
    .then((isAvailable) => {
      if (isAvailable) {
  
        return SMS.sendSMSAsync(numbersArray, `https://www.google.com/maps/@${lat},${long},16z?entry=ttuu`)
      }else{
          console.log("not available")
      }
  })
  .catch(err=>{
      console.log(err,"err in block")
      console.log("catch block error")
  })
  }  