import * as actionTypes from "./actions";
import axios from "../../axios-instance";

export const fetchAnnouncementsStart = () => {
	return {
		type: actionTypes.FETCH_ANNOUNCEMENTS_START,
	};
};

export const fetchAnnouncementsSuccess = (announcements) => {
	return {
		type: actionTypes.FETCH_ANNOUNCEMENTS_SUCCESS,
		announcements: announcements,
	};
};

export const fetchAnnouncementsFail = (error) => {
	return {
		type: actionTypes.FETCH_ANNOUNCEMENTS_FAIL,
		error: error,
	};
};

export const fetchAnnouncements = (token) => {
	return (dispatch) => {
		dispatch(fetchAnnouncementsStart());
		axios
			.get("/announcement.json?auth=" + token)
			.then((response) => {
				let announcements = [];
				for (let i in response.data) {
					announcements.push(response.data[i]);
				}
				dispatch(fetchAnnouncementsSuccess(announcements));
			})
			.catch((err) => {
				console.log(err);
				dispatch(fetchAnnouncementsFail(err));
			});
	};
};
