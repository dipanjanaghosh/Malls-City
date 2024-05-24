import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    connect(process.env.MONGO_URI!).then(
        () => console.log("MongoDB connected successfully"),
        (error) => console.log(error)
    )
}