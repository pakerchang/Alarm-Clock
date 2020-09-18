import React, { useState, useEffect } from "react";
import "./Time.css";

function checkTime() {
	let alarmTime = [21,22,23,0,1,2,3,4,5,6,8]
	let currentTime = new Date()
	const hours = currentTime.getHours
	const sec = currentTime.getSeconds

	if (alarmTime.includes(sec)) {
		console.log("im Time.app now it's time");
	};
}

function Time() {
	// 用 useState存取時間
	const [clock, setClock] = useState(new Date());
	const [alarmTime, setAlarmTime] = useState();
	useEffect(() => {
		// 自動刷新時間
		const refresh = setInterval(() => setClock(new Date()), 1000);
		checkTime();
		return () => {
			clearInterval(refresh);
		};
	}, []);

	

	return (
		<div className="time__view">
			<h1>{clock.toLocaleTimeString("local", { hour12: false })}</h1>
			<input type="time" name="" id="onTime" onChange={setAlarmTime} />
		</div>
	);
}

export default Time;
