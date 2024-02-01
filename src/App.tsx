import { useState, useEffect } from 'react'
import './App.css'

const TYPES: any = {
	POMODORO: 'POMODORO',
	SHORT_BREAK: 'SHORT_BREAK',
	LONG_BREAK: 'LONG_BREAK'
}
const TYPEVALUES: any = {
	POMODORO: 60 * 25, // 25minutes
	SHORT_BREAK: 60 * 5, // 5minutes
	LONG_BREAK: 60 * 15, // 15minutes
}
const INSTRUCTION = `The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.`;

interface IMainProps {
	selected: string,
	onClick: (type: string) => void
}
const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

function App() {
	const [selected, setSelected] = useState(TYPES.POMODORO);

	const handleOnClick = (type: string) => {
		setSelected(type)
	}

	return (
		<div className={`App  theme-${selected}`} >
			<div className='container'>
				<Header />
				<Main
					selected={selected}
					onClick={handleOnClick}
				/>
				<p>{INSTRUCTION}</p>

			</div>
		</div>
	)
}


const Header = () => {
	return (
		<div className="header">
			<h2 style={{ fontSize: 20 }}>Pomodoro</h2>
		</div>
	)
}

const Main = (props: IMainProps) => {
	const [timeLeft, setTimeLeft] = useState(TYPEVALUES[props.selected]);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (isRunning) {
				setTimeLeft((t: any) => t - 1);
			}
		}, 1000);
		return () => clearInterval(intervalId);
	}, [isRunning]);

	useEffect(() => {
		setTimeLeft(TYPEVALUES[props.selected])
	}, [props.selected])

	const toggleOnOff = () => {
		setIsRunning(!isRunning)
	}

	const handleReset = () => {
		setTimeLeft(TYPEVALUES[props.selected])
	}

	return (
		<div className="main">
			<div className="main-top">
				<button className={props.selected != TYPES.POMODORO ? '' : 'selected'} onClick={() => { props.onClick(TYPES.POMODORO) }}>Pomodoro</button>
				<button className={props.selected != TYPES.SHORT_BREAK ? '' : 'selected'} onClick={() => { props.onClick(TYPES.SHORT_BREAK) }}>Short Break</button>
				<button className={props.selected != TYPES.LONG_BREAK ? '' : 'selected'} onClick={() => { props.onClick(TYPES.LONG_BREAK) }}>Long Break</button>
			</div>

			<h1>{formatTime(timeLeft)}</h1>

			<div className="main-bottom">
				<button onClick={toggleOnOff}>{isRunning ? 'STOP': 'START'}</button>
				<button onClick={handleReset}>RESET</button>
			</div>
		</div>
	)
}
export default App
