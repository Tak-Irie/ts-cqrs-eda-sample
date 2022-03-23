import { Message, MessageType } from "../../../shared/usecase/Message";


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