import { Message, MessageType } from "../../../shared/usecase/_Message";


type CreateUserArgs = {
  typeName: "CreateUser"
  data:{
    email:string
    password:string
    userName:string
  }
  metadata:"NONE"
}

const CreateUserCommand = Message.createMessage<CreateUserArgs>

// type CreateUserCommandType = ReturnType<typeof CreateUserCommand>