import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {  
    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();
    useEffect(() => {
        if(authUser) {
            const socket = io('https://chatpulse-wk5p.onrender.com',{
                query: {
                    userId: authUser._id
                }
            })
            setSocket(socket);
            socket.on('allOnlineUsers',(users) => {
                setOnlineUsers(users);
            });
            return () => {
                socket.close();
            };
        }
        else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authUser]);
    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    );
};

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
};