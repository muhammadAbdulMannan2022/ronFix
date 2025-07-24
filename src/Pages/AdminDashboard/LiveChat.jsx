import {  Search, Send, MoreVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetActiveChatsQuery } from "../../redux/features/baseApi";

const LiveChat = () => {
	const navigate = useNavigate();
	const { data: { active_chats } = [] } =
		useGetActiveChatsQuery();
	console.log(fetchedActiveUsers);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedUserId, setSelectedUserId] = useState("1");
	const [newMessage, setNewMessage] = useState("");

	// Mock data for users
	const users = [
		{
			firebase_chat_id: "chat_a1b2c3d4e5f6g7h8",
			user_id: 123,
			user_name: "john_doe",
			subject: "Login Issues",
			status: "in_progress",
			last_message_at: "2025-07-01T10:45:00Z"
		},
		{
			firebase_chat_id: "chat_b2c3d4e5f6g7h8i9",
			user_id: 124,
			user_name: "jane_smith",
			subject: "Payment Problem",
			status: "open",
			last_message_at: "2025-07-01T10:20:00Z"
		},
		{
			firebase_chat_id: "chat_c3d4e5f6g7h8i9j0",
			user_id: 125,
			user_name: "mike_wilson",
			subject: "Feature Request",
			status: "open",
			last_message_at: "2025-07-01T09:55:00Z",
		}
	];

	// Mock data for messages
	const message = [
		{
			id: "1",
			senderId: "1",
			text: "Hi there! I need help with my account verification.",
			timestamp: "10:30 AM",
			isAdmin: false,
		},
		{
			id: "2",
			senderId: "admin",
			text: "Hello! I'd be happy to help you with account verification. Can you please tell me what specific issue you're experiencing?",
			timestamp: "10:32 AM",
			isAdmin: true,
		},
		{
			id: "3",
			senderId: "1",
			text: "I uploaded my documents yesterday but the status still shows pending.",
			timestamp: "10:33 AM",
			isAdmin: false,
		},
	];

	const filteredUsers = users.filter(
		(user) =>
			user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const selectedUser = users.find((user) => user.id === selectedUserId);

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			// Here you would normally send the message to your backend
			console.log("Sending message:", newMessage);
			setNewMessage("");
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div className="w-full h-full bg-gray-50">
			{/* Header */}
			{/* <header className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between py-4">
						<div className="flex items-center space-x-4">
							<button
								onClick={() => navigate("/")}
								className="p-2 hover:bg-gray-100 rounded-md transition-colors"
							>
								<ArrowLeft className="h-5 w-5" />
							</button>
							<div className="flex items-center space-x-3">
								<div className="bg-blue-600 p-2 rounded-lg">
									<div className="text-white font-bold text-lg">
										V
									</div>
								</div>
								<h1 className="text-2xl font-bold text-gray-900">
									Live Chat Management
								</h1>
							</div>
						</div>
					</div>
				</div>
			</header> */}

			<div className="w-full h-full sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-150px)]">
					{/* Users List */}
					<div className="lg:col-span-1 bg-white rounded-lg border shadow-sm">
						<div className="p-4 border-b">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">
								Active Users
							</h2>
							<div className="sticky">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
								<input
									type="text"
									placeholder="Search users..."
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
								/>
							</div>
						</div>
						<div className="overflow-y-auto max-h-[calc(100vh-320px)]">
							{filteredUsers.map((user) => (
								<div
									key={user.id}
									className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
										selectedUserId === user.id
											? "bg-blue-50 border-blue-200"
											: ""
									}`}
									onClick={() => setSelectedUserId(user.id)}
								>
									<div className="flex items-center space-x-3">
										<div className="relative">
											<img
												src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
												alt={user.user_name}
												className="w-10 h-10 rounded-full object-cover"
											/>
											<div
												className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
													user.isOnline
														? "bg-green-500"
														: "bg-gray-400"
												}`}
											/>
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center justify-between">
												<p className="text-sm font-medium text-gray-900 truncate">
													{user.user_name}
												</p>
												{/* {user.unreadCount > 0 && (
													<span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
														{user.unreadCount}
													</span>
												)} */}
											</div>
											<p className="text-xs text-gray-500 truncate">
												{/* {user.} */}
											</p>
											<p className="text-xs text-gray-400 truncate">
											</p>
											<p className="text-xs text-gray-400">
												{user.last_message_at}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Chat Area */}
					<div className="lg:col-span-3 bg-white rounded-lg border shadow-sm flex flex-col">
						{selectedUser ? (
							<>
								{/* Chat Header */}
								<div className="p-4 border-b flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<div className="relative">
											<img
												src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
												alt={selectedUser.name}
												className="w-10 h-10 rounded-full object-cover"
											/>
											<div
												className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
													selectedUser.isOnline
														? "bg-green-500"
														: "bg-gray-400"
												}`}
											/>
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900">
												{selectedUser.name}
											</h3>
											<p className="text-sm text-gray-500">
												{selectedUser.isOnline
													? "Online"
													: "Offline"}
											</p>
										</div>
									</div>
									<button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
										<MoreVertical className="h-5 w-5 text-gray-500" />
									</button>
								</div>

								{/* Messages */}
								<div className="flex-1 overflow-y-auto p-4 space-y-4">
									{messages.map((message) => (
										<div
											key={message.id}
											className={`flex ${message.isAdmin ? "justify-end" : "justify-start"}`}
										>
											<div
												className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
													message.isAdmin
														? "bg-blue-600 text-white"
														: "bg-gray-100 text-gray-900"
												}`}
											>
												<p className="text-sm">
													{message.text}
												</p>
												<p
													className={`text-xs mt-1 ${
														message.isAdmin
															? "text-blue-100"
															: "text-gray-500"
													}`}
												>
													{message.timestamp}
												</p>
											</div>
										</div>
									))}
								</div>

								{/* Message Input */}
								<div className="p-4 border-t">
									<div className="flex space-x-2">
										<textarea
											value={newMessage}
											onChange={(e) =>
												setNewMessage(e.target.value)
											}
											onKeyPress={handleKeyPress}
											placeholder="Type your message..."
											className="flex-1 resize-none border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											rows={1}
										/>
										<button
											onClick={handleSendMessage}
											className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors inline-flex items-center justify-center"
										>
											<Send className="h-4 w-4" />
										</button>
									</div>
								</div>
							</>
						) : (
							<div className="flex-1 flex items-center justify-center">
								<p className="text-gray-500">
									Select a user to start chatting
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LiveChat;
