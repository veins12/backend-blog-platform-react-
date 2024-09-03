function checkForAuthenticaitonCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            next();xsz 
        }
        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch(error){
            req.user = null;
        }
        next();

        }
       
    }
module.exports ={
    checkForAuthenticaitonCookie,
}