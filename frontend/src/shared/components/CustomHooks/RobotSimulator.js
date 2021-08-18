import axios from 'axios';
import {useState, useEffect, useRef} from 'react';
axios.defaults.withCredentials = true;
const INITIAL_SIM_DATA = {battery:[], height:[], position:[]};

const useRobotSimulator = (queue, setQueue) => {
    const [simRunning, setSimRunning] = useState(false)
    const [battery, setBattery] = useState(100)
    const [height, setHeight] = useState(45)
    const [position, setPosition] = useState({x:100, y:100, z:100})
    const [currentMission, setCurrentMission] = useState('None')
    const [lastMissionHistory, setLastMissionHistory] = useState({'quick scan':0, 'patrol':0, 'guard':0});
    const [simData, setSimData] = useState({battery:[], height:[], position:[]})
    const queueRef = useRef(queue)
    queueRef.current = queue;
    const batteryRef = useRef(100);
    const heightRef = useRef(20);
    const positionRef = useRef({x:100, y:100, z:100});

    useEffect(()=> {
        if(!queue.length) return
        if(queue[0].status === 'running' && !simRunning){
            const {type} = queue[0];
            setCurrentMission(type)
            setLastMissionHistory(
                lastMissionHistory => ({...lastMissionHistory, [type]: new Date().getTime()})
            )
            // start robot simulation
            runSimulation(type)
        }
    }, [queue, simRunning]);
    
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } 

    const moveRobot = () => {
        const batteryDecrement = getRandomInt(1,10)/10;
        const newBattery = +(batteryRef.current - batteryDecrement).toFixed(2);
        const heightAdjustment = getRandomInt(-100, 100)/10
        const newHeight = +Math.max(heightRef.current + heightAdjustment, 0).toFixed(2)
        heightRef.current = newHeight;
        batteryRef.current = newBattery;
        const xAdjustment = getRandomInt(-10,10)/10;
        const yAdjustment = getRandomInt(-10,10)/10;
        const zAdjustment = getRandomInt(-10,10)/10;
        const {x, y, z} = positionRef.current;
        positionRef.current = {
            x: +Math.max(x + xAdjustment, 0).toFixed(2),
            y: +Math.max(y + yAdjustment, 0).toFixed(2),
            z: +Math.max(z + zAdjustment, 0).toFixed(2)
        }
        setBattery(batteryRef.current);
        setPosition(positionRef.current);
        setHeight(heightRef.current);

        setSimData(simData=>({
            battery:[...simData.battery, batteryRef.current],
            height: [...simData.height, heightRef.current],
            position: [...simData.position, positionRef.current]
        })
        )
    }

    const uploadSim = (type) => {
        //upload to server
        setSimData(simData =>{
            axios.post('http://localhost:5000/api/missions/store-mission', {type, data: simData})
                    .then(res => {
                        console.log('Success storing mission', res)
                    })
                    .catch(err => alert('Error storing mission'))
            return INITIAL_SIM_DATA
        }
        )
    };

    const runSimulation = (missionType) => {
        setSimRunning(true);
        const simLengthSeconds = getRandomInt(
            parseInt(process.env.REACT_APP_ROBOT_MISSION_DURATION_MIN_SECONDS), 
            parseInt(process.env.REACT_APP_ROBOT_MISSION_DURATION_MAX_SECONDS)
        );
        const SIM_INTERVAL_DURATION_SECONDS = parseInt(process.env.REACT_APP_SIM_INTERVAL_DURATION_SECONDS)
        let simElapsedSeconds = 0;
        
        const simInterval = setInterval(()=>{
            simElapsedSeconds += SIM_INTERVAL_DURATION_SECONDS
            moveRobot()
            if(simElapsedSeconds >= simLengthSeconds){
                uploadSim(missionType)
                const newQueue = [...queueRef.current]
                newQueue.splice(0,1)
                setQueue(newQueue);
                setSimRunning(false);
                setCurrentMission('None');
                clearInterval(simInterval);
            }
        }, SIM_INTERVAL_DURATION_SECONDS*1000);
    }

    return {battery, height, position, currentMission, lastMissionHistory, simRunning}
}

export default useRobotSimulator;