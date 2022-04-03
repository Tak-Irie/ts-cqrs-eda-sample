import { Readable } from "stream";

const readAllStream = async (stream: Readable) => {
  let data = "";
  for await (const chunk of stream) {
    data += chunk;
  }
  return data;
};

export { readAllStream };
