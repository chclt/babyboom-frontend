import * as axios from "axios";

const request = axios.default.create({
	baseURL: "https://babyboom.preview.huawei-zeabur.cn",
	withCredentials: false,
	headers: {
		authorization:
			"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOTQ4NjQ1Nzc3NDI4NzE3NTY5IiwiZXhwIjo3MjAxNzUzNDI4MzMyfQ.G3wPAHNikcSrxrhcPSwppIe-tmeI6YdUSWOP2_4IB3A",
	},
});

export default request;
