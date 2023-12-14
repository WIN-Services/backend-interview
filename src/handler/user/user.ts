import { user } from "../../modals/user"
import { create } from "../../service/user/userService"

export const signUp = async (ctx: any): Promise<any> => {
    try {
        const reqData = ctx.request.body
        const reqbody = user.parse(reqData)
        await create(reqbody)

            ctx.status = 201
            ctx.body = {
                message: 'Successfully signedUp'
            }
    }
    catch (err: any) {
        {
            ctx.status = 400
            ctx.body = {
                message: 'invalid user'
            }
        }
    }
}
