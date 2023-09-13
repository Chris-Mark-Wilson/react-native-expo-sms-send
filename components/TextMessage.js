import * as SMS from "expo-sms";

export const text = (params) => {
  return SMS.isAvailableAsync()
  .then((isAvailable) => {
    if (isAvailable) {
      // do your SMS stuff here
      return SMS.sendSMSAsync(["+447597852695"], "https://www.google.com/maps/@52.5738339,-0.2561723,16z?entry=ttuu")
    }else{
        console.log("not available")
    }
})
.catch(err=>{
    console.log(err,"err in block")
    console.log("catch block error")
})
}  

