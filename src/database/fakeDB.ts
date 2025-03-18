import { IPost, IUser } from "../shared/dtos";

export const db: IUser[] = [
  {
    id: 1,
    email: "john123@gmail.com",
    password: "123456",
  },
];

export const postsDb: IPost[] = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar:
      "https://morgancarter.com.au/assets/images/blog/encouraging-upload/thumbnail.png",
    text: "Hi everyone 👋. I'm new to DevHouse! Please feel free to roast my code 🤣",
    likes: 423,
    liked: false,
    code: `console.log(hello world);`,
  },
  {
    id: 2,
    author: "Anna Park",
    avatar:
      "https://morgancarter.com.au/assets/images/blog/encouraging-upload/thumbnail.png",
    text: "Finally wrote my first Javascript function!",
    likes: 1205,
    liked: false,
    code: `function sayHello(name) {\n console.log("Hello" + name);\n}`,
  },
];
