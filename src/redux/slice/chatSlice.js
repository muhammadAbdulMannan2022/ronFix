import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
	name: "chatSlice",
	initialState: {
		currentChatId: null,
		messages: [],
		activeChats: [],
		showNewChatForm: false,
		chatSubject: "",
	},
	reducers: {
		setCurrentChatId(state, action) {
			state.currentChatId = action.payload;
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
