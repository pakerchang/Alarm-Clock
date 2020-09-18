import React, { Component } from "react";
import "./AlarmClock.css";
import { Button } from "react-bootstrap";
import AlarmSound from "./sounds/Alarm-Clock-Sound.mp3";

export class AlarmClock extends Component {
	constructor() {
		super();
		this.state = {
			currentTime: "",
			currentHour: "",
			currentMin: "",
			currentSec: "",
			play: false,
		};
		this.audio = new Audio(AlarmSound);
		this.audio.loop = true;
	}

	componentDidMount() {
		this.clock = setInterval(() => this.setCurrentTime(), 1000);
		this.interval = setInterval(() => this.checkAlarmClock(), 1000);

		this.audio.addEventListener("ended", () =>
			this.setState({ play: false })
		);
	}

	componentWillUnmount() {
		clearInterval(this.clock);
		clearInterval(this.interval);

		this.audio.removeEventListener("ended", () =>
			this.setState({ play: false })
		);
	}
	togglePlay = () => {
		this.setState({ play: !this.state.play }, () => {
			this.audio.pause();
		});
	};

	setCurrentTime() {
		this.setState({
			currentTime: new Date().toLocaleTimeString("local", {
				hour12: false,
			}),
			currentHour: new Date().getHours(),
			currentMin: new Date().getMinutes(),
			currentSec: new Date().getSeconds(),
		});

		if (this.state.currentSec < 10) {
			this.state.currentSec = "0" + this.state.currentSec;
		}
		if (this.state.currentMin < 10) {
			this.state.currentMin = "0" + this.state.currentMin;
		}
		if (this.state.currentHour < 10) {
			this.state.currentHour = "0" + this.state.currentHour;
		}
	}
	checkAlarmClock() {
		const data = [
			"00",
			"01",
			"02",
			"03",
			"04",
			"05",
			"06",
			"08",
			21,
			22,
			23,
		];
		console.log(
			this.state.currentHour +
				":" +
				this.state.currentMin +
				":" +
				this.state.currentSec
		);
		if (data.includes(this.state.currentHour)) {
			console.log("it's time");
			this.audio.play();
		}
	}

	render() {
		return (
			<div className="container">
				<h1>Alarm Clock</h1>
				<h2>{this.state.currentTime}</h2>
				<Button
					className="pauseAlarm"
					variant="primary"
					size="lg"
					onClick={this.togglePlay}
				>
					Stop
				</Button>
			</div>
		);
	}
}

export default AlarmClock;
