
export function randomGenerator(){
    let random=""
    let randomChar="1234567890zxcvbnmasdfghjklqwertyuipZXCVNMASDFHJLQWERYUIOP";
    let length=randomChar.length;
    for(let i=0;i<6;i++){
        random+=randomChar.charAt(Math.random()*length);
    }
    return random
}




let a=  (link)=>{
    let ch=link.match(/(http(s)?:\/\/.)/g)
    return (ch !== null)
}
export function  verifyLinkValidity(link){
   if(a(link)===true){
    return link
   }
   else{
    return ("http://"+link)
   }

}
