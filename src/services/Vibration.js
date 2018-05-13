export default class Vibration {
	/**
	 * vibration static method, vibration time is hardcoded to 200
	 */
	static vibrate () {
		window.navigator.vibrate(200);
	}
}