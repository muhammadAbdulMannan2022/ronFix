import { createSlice } from "@reduxjs/toolkit";

// Function to get the initial chat ID from localStorage
const getInitialChatId = () => {
	try {
		const savedChatId = localStorage.getItem("currentChatId");
		return savedChatId ? JSON.parse(savedChatId) : null;
	} catch (error) {
		console.error("Could not parse chat ID from localStorage", error);
		return null;
	}
};

const chatSlice = createSlice({
	name: "chatSlice",
	initialState: {
		// Initialize currentChatId from localStorage
		currentChatId: getInitialChatId(),
		messages: [],
		activeChats: [],
		showNewChatForm: false,
		chatSubject: "",
	},
	reducers: {
		setCurrentChatId(state, action) {
			const chatId = action.payload;
			state.currentChatId = chatId;
			// Persist the chatId to localStorage
			if (chatId) {
				localStorage.setItem("currentChatId", JSON.stringify(chatId));
			} else {
				// Remove it if the chatId is null (chat ended)
				localStorage.removeItem("currentChatId");
			}
		},
		setMessages(state, action) {
			state.messages = action.payload;
		},
		addMessage(state, action) {
			state.messages.push(action.payload);
		},
		setActiveChats(state, action) {
			state.activeChats = action.payload;
		},
		setShowNewChatForm(state, action) {
			state.showNewChatForm = action.payload;
		},
		setChatSubject(state, action) {
			state.chatSubject = action.payload;
		},
		clearChatState(state) {
			// Clear the state and also remove the ID from localStorage
			localStorage.removeItem("currentChatId");
			state.currentChatId = null;
			state.messages = [];
			state.showNewChatForm = false;
			state.chatSubject = "";
		},
	},
});

export const {
	setCurrentChatId,
	setMessages,
	addMessage,
	setActiveChats,
	setShowNewChatForm,
	setChatSubject,
	clearChatState,
} = chatSlice.actions;

export default chatSlice.reducer;