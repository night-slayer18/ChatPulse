import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState('');
	const {setSelectedConversation} = useConversation();
	const {conversations} = useGetConversations();
	const handleSubmit = (e) => {
		e.preventDefault();
		if(search.trim() === ''){
			setSelectedConversation(null);
			return;
		}
		if(search.length < 3){
			toast.error('Search term must be at least 3 characters');
		}

		const conversation = conversations.find((conv) => conv.fullName.toLowerCase().includes(search.toLowerCase()));
		if(conversation){
			setSelectedConversation(conversation);
			setSearch('');
		}
		else{
			toast.error('No conversation found');
		}
	}
	const OnChange = (e) => {
		setSearch(e.target.value);
	}
	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input name="search" value={search} onChange={OnChange} type='text' placeholder='Search…' className='input input-bordered rounded-full' />
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;