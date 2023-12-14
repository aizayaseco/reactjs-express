const admin = require('firebase-admin');

function authenticate(req, res, next) {
    const header = req.headers.authorization;
    //ensure headers are associated with request
    if (header==undefined || !header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Unauthorized Header. Access Denied' })
    }
    
    //get token from request
    const token = header?.substring(7, header.length)
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized Header. Access Denied' })
    }
    //reference => https://firebase.google.com/docs/auth/admin/manage-sessions
    
    admin.auth().verifyIdToken(token)
    .then(function (decodedToken) {
    
        //if (!decodedToken.email_verified){
        //    return res.status(401).json({ message: 'Your email needs to be verified.' })
        //}
    
        //attach uid to body for the route to use
        req.headers.uid = decodedToken.uid;
            next();
    })
    .catch(function (error) {
        console.log(error);
        res.status(401).json({message: 'Unauthorized Header. Access Denied'})
    });

}

module.exports = {
    authenticate
}