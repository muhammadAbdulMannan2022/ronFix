import React, { useState, useEffect, useRef } from "react";
import { Search, Send, MoreVertical } from "lucide-react";
import {
	useGetActiveChatsQuery,
	useGetLoggedUserQuery,
	useGetMessagesQuery,
	useSendMessageMutation,
} from "../../redux/features/baseApi";
import { db } from "../../firebase/firebase.config";
import { ref, onChildAdded, onChildChanged, onChildRemoved, off } from "firebase/database";
import { HiOutlineChatAlt2 } from "react-icons/hi";

// A safer time formatting function
const formatTime = (dateString) => {
	try {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) return "";
		return date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	} catch (e) {
		return "";
	}
};

const ChatListItem = React.memo(({ chat, selectedChatId, handleSelectChat }) => (
	<div
		className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedChatId === chat.firebase_chat_id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""}`}
		onClick={() => handleSelectChat(chat.firebase_chat_id)}
	>
		<div className="flex items-center space-x-3">
			<div className="avatar placeholder">
				<div className="bg-neutral text-neutral-content rounded-full w-10">
					<span className="text-xl">{chat.user_name ? chat.user_name.charAt(0).toUpperCase() : '?'}</span>
				</div>
			</div>
			<div className="flex-1 min-w-0">
				<p className="text-sm font-medium text-gray-900 truncate">{chat.user_name || "Unknown User"}</p>
				<p className="text-xs text-gray-600 truncate">{chat.subject?.subject || "No Subject"}</p>
				<p className="text-xs text-gray-400">{formatTime(chat.last_message_at)}</p>
			</div>
		</div>
	</div>
));

const LiveChat = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [newMessage, setNewMessage] = useState("");
	const [selectedChatId, setSelectedChatId] = useState(null);
	const [messages, setMessages] = useState([]);
	const [activeChats, setActiveChats] = useState([]);
	const displayedMessageIds = useRef(new Set());
	const messagesEndRef = useRef(null);

	// --- RTK QUERY HOOKS ---
	// Added pollingInterval to refetch every 3 seconds
	const { data: initialChatsData, isLoading: isLoadingInitialChats } = useGetActiveChatsQuery(undefined, {
		pollingInterval: 3000, // Refetch every 3 seconds
	});
	const { data: loggedUserData } = useGetLoggedUserQuery();
	const { data: fetchedMessages, isLoading: isLoadingMessages } = useGetMessagesQuery(selectedChatId, { skip: !selectedChatId });
	const [sendMessage] = useSendMessageMutation();
	const adminUserId = loggedUserData?.id;

	// EFFECT 1: Set initial chats list from API and listen for real-time updates
	useEffect(() => {
		if (initialChatsData?.active_chats) {
			setActiveChats(initialChatsData.active_chats);
		}

		const activeChatsRef = ref(db, 'active_support_chats');
		const handleChildAdded = onChildAdded(activeChatsRef, (snapshot) => {
			const newChat = { firebase_chat_id: snapshot.key, ...snapshot.val() };
			setActiveChats(currentChats => currentChats.some(c => c.firebase_chat_id === newChat.firebase_chat_id) ? currentChats : [...currentChats, newChat]);
		});
		const handleChildChanged = onChildChanged(activeChatsRef, (snapshot) => {
			const updatedData = { firebase_chat_id: snapshot.key, ...snapshot.val() };
			setActiveChats(currentChats => currentChats.map(chat => chat.firebase_chat_id === updatedData.firebase_chat_id ? updatedData : chat));
		});
		const handleChildRemoved = onChildRemoved(activeChatsRef, (snapshot) => {
			const removedChatId = snapshot.key;
			setActiveChats(currentChats => currentChats.filter(chat => chat.firebase_chat_id !== removedChatId));
			if (selectedChatId === removedChatId) setSelectedChatId(null);
		});

		return () => {
			off(activeChatsRef, 'child_added', handleChildAdded);
			off(activeChatsRef, 'child_changed', handleChildChanged);
			off(activeChatsRef, 'child_removed', handleChildRemoved);
		};
	}, [initialChatsData, selectedChatId]);

	// EFFECT 2: Load historical messages for a selected chat
	useEffect(() => {
		if (fetchedMessages?.messages && adminUserId) {
			const formatted = fetchedMessages.messages.map(m => ({
				id: m.firebase_message_id,
				content: m.content,
				timestamp: new Date(m.timestamp),
				isSentByAdmin: m.sender.id === adminUserId,
			}));
			setMessages(formatted);
			displayedMessageIds.current.clear();
			formatted.forEach(m => displayedMessageIds.current.add(m.id));
		}
	}, [fetchedMessages, adminUserId]);

	// EFFECT 3: Real-time listener for NEW messages in the selected chat
	useEffect(() => {
		if (db && selectedChatId) {
			const messagesRef = ref(db, `support_chats/${selectedChatId}/messages`);
			const handleMessageAdded = onChildAdded(messagesRef, (snapshot) => {
				const messageData = snapshot.val();
				const messageId = snapshot.key;

				if (messageData && !displayedMessageIds.current.has(messageId)) {
					displayedMessageIds.current.add(messageId);
					const isMessageSentByAdmin = messageData.senderType === "admin";

					const newMessage = {
						id: messageId,
						content: messageData.content,
						timestamp: new Date(messageData.timestamp),
						isSentByAdmin: isMessageSentByAdmin,
					};

					// Replace the optimistic message with the real one
					setMessages(prev => [...prev.filter(m => !m.optimistic), newMessage]);
				}
			});
			return () => off(messagesRef, 'child_added', handleMessageAdded);
		}
	}, [selectedChatId]);

	// EFFECT 4: Auto-scrolling to the bottom
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSelectChat = (firebaseChatId) => {
		setMessages([]);
		displayedMessageIds.current.clear();
		setSelectedChatId(firebaseChatId);
	};

	// Updated to handle optimistic UI
	const handleSendMessage = async () => {
		if (!newMessage.trim() || !selectedChatId) return;

		const messageToSend = newMessage;
		const tempId = `optimistic-${Date.now()}`; // Unique temporary ID

		// Optimistic UI Update
		const optimisticMessage = {
			id: tempId,
			content: messageToSend,
			timestamp: new Date(),
			isSentByAdmin: true, // Assuming admin is always the sender here
			optimistic: true, // Flag to identify the optimistic message
		};

		setMessages(prev => [...prev, optimisticMessage]);
		setNewMessage("");

		try {
			await sendMessage({ chatId: selectedChatId, message: messageToSend }).unwrap();
			// The Firebase listener will replace the optimistic message
		} catch (error) {
			console.error("Failed to send message:", error);
			// If sending fails, remove the optimistic message and restore the input
			setMessages(prev => prev.filter(m => m.id !== tempId));
			setNewMessage(messageToSend);
		}
	};

	const filteredChats = Array.isArray(activeChats) ? activeChats.filter(chat =>
		chat.user_name && chat.user_name.toLowerCase().includes(searchTerm.toLowerCase())
	) : [];
	const selectedChatDetails = Array.isArray(activeChats) ? activeChats.find(chat => chat.firebase_chat_id === selectedChatId) : null;

	return (
		<div className="w-full h-full bg-gray-50">
			<div className="w-full h-full sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-150px)]">
					{/* Chat List */}
					<div className="lg:col-span-1 bg-white rounded-lg border shadow-sm flex flex-col">
						<div className="p-4 border-b flex-shrink-0">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">Active Chats</h2>
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
								<input type="text" placeholder="Search users..." className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
							</div>
						</div>
						<div className="overflow-y-auto flex-1">
							{isLoadingInitialChats && activeChats.length === 0 ? (<div>Loading Chats...</div>) :
								(filteredChats.map((chat) => (
									<ChatListItem
										key={chat.firebase_chat_id}
										chat={chat}
										selectedChatId={selectedChatId}
										handleSelectChat={handleSelectChat}
									/>
								)))}
						</div>
					</div>

					{/* Chat Area */}
					<div className="lg:col-span-3 bg-white rounded-lg border shadow-sm flex flex-col h-full">
						{selectedChatDetails ? (
							<>
								<div className="p-4 border-b flex items-center justify-between flex-shrink-0">
									<div className="flex items-center space-x-3">
										<div className="avatar placeholder"><div className="bg-neutral text-neutral-content rounded-full w-10"><span className="text-xl">{selectedChatDetails.user_name ? selectedChatDetails.user_name.charAt(0).toUpperCase() : '?'}</span></div></div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900">{selectedChatDetails.user_name || "Unknown User"}</h3>
											<p className="text-sm text-gray-500">{selectedChatDetails.subject?.subject || "No Subject"}</p>
										</div>
									</div>
									<button className="p-2 hover:bg-gray-100 rounded-md transition-colors"><MoreVertical className="h-5 w-5 text-gray-500" /></button>
								</div>

								<div className="flex-1 overflow-y-auto p-4 space-y-4">
									{isLoadingMessages ? (<div className="flex justify-center items-center h-full">Loading...</div>) :
										(<>
											{messages.map((message) => (
												<div key={message.id} className={`flex ${message.isSentByAdmin ? "justify-end" : "justify-start"}`}>
													<div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${message.isSentByAdmin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"} ${message.optimistic ? "opacity-60" : ""}`}>
														<p className="text-sm">{message.content}</p>
														<p className={`text-xs text-right mt-1 ${message.isSentByAdmin ? "text-blue-100" : "text-gray-500"}`}>{formatTime(message.timestamp)}</p>
													</div>
												</div>
											))}
											<div ref={messagesEndRef} />
										</>)}
								</div>

								<div className="p-4 border-t bg-gray-50 flex-shrink-0">
									<div className="flex space-x-2">
										<textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())} placeholder="Type your message..." className="flex-1 resize-none border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={1} />
										<button onClick={handleSendMessage} disabled={!newMessage.trim()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors inline-flex items-center justify-center disabled:opacity-50"><Send className="h-4 w-4" /></button>
									</div>
								</div>
							</>
						) : (
							<div className="flex-1 flex items-center justify-center">
								<div className="text-center">
									<HiOutlineChatAlt2 className="mx-auto text-6xl text-gray-300" />
									<p className="text-gray-500 mt-2">Select a chat to see the conversation</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LiveChat;