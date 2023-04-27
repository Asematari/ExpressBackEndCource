const jwt = require ('jsonwebtoken');
const knex = require ('../../../DBConnection/DBConnection.js')
const {PERMISSIONS,GROUPS_PERMISSIONS,GROUPS_USERS} = require ('../../main/constant/constant')
//يستقبل code
const Authorized = (code) =>{
    //middleware next ما بتمشي الا تا تعمل 
    return async (req,res,next) => {
        //information to users
        const token = req.headers.token;
        if (token) {
            try {
                var user = jwt.verify(token,'mySecret');
                var user_id = user.userInfo.id;
                
                const group = await knex(GROUPS_USERS).where ('user_id',user_id) .returning('*');
                console.log(group)
                if(group.length > 0){
                    const permission= await knex(PERMISSIONS).where ('code',code) .returning('*');
                        if(permission.length >0 ){
                            const permission_id= permission[0].id;
                            const permissions = await knex(GROUPS_PERMISSIONS).where ('group_id',group[0].group_id) .returning('*');
                            let flag= false;
                                    for (let i=0 ;i<permissions.length;i++){
                        if(permissions[i].permission_id == permission_id ){
                            flag = true;
                            
                        }
                    }
                    if(flag){
                        next();
                    }
                    else{
                        res.json({
                            error :"do not permissions"
                        });
                    }
                } 
                else{
                    res.json({
                        error :"do not permissions"
                    });
                }
                    }
                else{
                    res.json({
                        error :"do not permissions"
                    });
                }
            }
            catch (err){
                res.json({
                    error :"invalid asem token"
                });
            }
        }
        else{
            res.json({
                error :"token does not exit"
            });
        }
    }
}
module.exports =Authorized;