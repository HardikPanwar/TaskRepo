import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import './style.css';

const getRemainingTime = (timer) => {
    const diff = timer - Date.now();
    if(diff <= 0){
        return {
            total: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            // miliseconds: 0
        }
    }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = (Math.floor(diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000)%60);
    // miliseconds = Math.floor(diff % 1000);

    return {
        total: diff,
        days,
        hours,
        minutes,
        seconds
    }
}

const Banner = ({description, timer, bannerUrl, isVisible, bannerLink}) => {
    
    const [remainingTime, setRemainingTime] = useState(getRemainingTime(timer));

    useEffect(() => {
       
        if(isVisible && remainingTime.total > 0){
            const countDown = setInterval(() => {
                const updatedTimeLeft = getRemainingTime(timer);
                setRemainingTime(updatedTimeLeft);
            }, 1000);
            return () => clearInterval(countDown);
        }
    }, [timer, remainingTime.total, isVisible]);

    if(!isVisible || remainingTime <= 0){
        return null;
    }
    const handleNavigate = () => {
        window.open(bannerLink, '_blank', 'noopener,noreferrer');
    }

    return (
        <>
            <Container className='banner'>
                {bannerUrl ? <img src={bannerUrl} alt="banner" onClick={()=> handleNavigate()} /> : <>
                    <div>
                        <h1>No Events Scheduled</h1>
                    </div>
                </>}
                <div>
                {remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0 && remainingTime.miliseconds === 0
                    ? 
                    <h1>Busted!</h1>
                    :            
                   <div> 
                   <div className="time-box-wrapper">
                        <div className="single-box">
                            <h1>{remainingTime.days}</h1>
                            <p>Days</p>
                        </div>
                        
                        <div className="single-box">
                            <h1>{remainingTime.hours}</h1>
                            <p>Hours</p>
                        </div>
                        
                        <div className="single-box">
                            <h1>{remainingTime.minutes}</h1>
                            <p>Minutes</p>
                        </div>
                        
                        <div className="single-box">
                            <h1>{remainingTime.seconds}</h1>
                            <p>Seconds</p>
                        </div>
                        
                    </div>
                    <div className='desc-box'>
                    <span className='description-txt'>{description}</span>
                     </div>
                   </div>
                }
                </div>
            </Container>
        </>
    );
}

export default Banner;
