import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';
import PropTypes from 'prop-types';

const Message = ({message}) => {
	const {authUser} = useAuthContext();
	const {selectedConversation} = useConversation()
	const isSent = message.senderId === authUser._id;
	const chatClassName = isSent ? 'chat-end' : 'chat-start';
	const profilePic = isSent ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBg = isSent ? 'bg-blue-500' : 'bg-gray-600';
	const formattedTime = extractTime(message.createdAt);
	const shakeClass = message.shouldShake ? 'shake' : '';
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white pb-2 ${bubbleBg} ${shakeClass}`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};

Message.propTypes = {
	message: PropTypes.shape({
		message: PropTypes.string.isRequired,
		senderId: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		shouldShake: PropTypes.bool,
	}).isRequired,
};

export default Message;