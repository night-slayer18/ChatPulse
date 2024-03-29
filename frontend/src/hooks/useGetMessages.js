import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error);
                }
                setMessages(data);
            } catch (error) {
                setMessages([]);
            }
            finally {
                setLoading(false);
            }
        };
        if(selectedConversation?._id){
            getMessages();
        }
    },[selectedConversation?._id,setMessages]);
    return {loading,messages};
}

export default useGetMessages
