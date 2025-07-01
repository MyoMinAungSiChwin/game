export default class typeCheck {
	static validateEmail(email) {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}

	static validatePhoneNumber(phoneNumber) {
		const regex = /^1[34578]\d{9}$/;
		return regex.test(phoneNumber);
	}
}