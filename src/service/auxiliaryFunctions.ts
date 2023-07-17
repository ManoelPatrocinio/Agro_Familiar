import icon_eye_open from "../assets/images/icon-visible-enable.png"
import icon_eye_close from "../assets/images/icon-visible-desable.png"

export function handlePasswordVisibility (inputId:string,imgId:string){
    const inputPassword = window.document.getElementById(inputId); 
    const iconEye:any = window.document.getElementById(imgId);

    const inputType = inputPassword?.getAttribute("type") 

    if(inputType === "password"){
      inputPassword?.setAttribute("type", "text")
      iconEye.src = icon_eye_close
    }else{
      inputPassword?.setAttribute("type", "password")
      iconEye.src = icon_eye_open
    }
   
  }