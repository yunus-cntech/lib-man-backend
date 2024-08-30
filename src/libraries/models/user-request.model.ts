import { Request } from "express";
import { UserService } from "../../services/user.service";

interface UserRequestModel extends Request {
    userService: UserService
}

export default UserRequestModel