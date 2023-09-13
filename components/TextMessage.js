import * as SMS from "expo-sms";

export const text = (params) => {
  return SMS.isAvailableAsync()
  .then((isAvailable) => {
    if (isAvailable) {
      // do your SMS stuff here
      return SMS.sendSMSAsync(["+447597852695"], "My sample HelloWorld message")
    }else{
        console.log("not available")
    }
})
.catch(err=>{
    console.log(err,"err in block")
    console.log("catch block error")
})
}  

