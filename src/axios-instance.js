import axios from "axios";

const instance = axios.create({
	baseURL: "https://sahdev-345af.firebaseio.com/",
});

export default instance;
