import React, {useState, useEffect} from 'react';
import Banner from './banner';
import bannerUrl from '../assets/img/banner.jpg';
import axios from 'axios';

const Main = () => {
    const futureTime = Date.now() + 5 * 24 * 60 * 60 * 1000;
    const [data, setData] = useState({
        description: 'Limited Time Offer!',
        timer : futureTime,
        bannerUrl: bannerUrl,
        isVisible: 1,
        bannerLink: 'https://google.com'
    });
    

    useEffect(() => {
        axios.get('http://localhost:8081/api/getBannerData').then((res) => {
            if(res.data){ 
                const updatedData = {
                    description: res.data.description,
                    timer: new Date(res.data.timer), 
                    bannerUrl: res.data.banner,       
                    isVisible: res.data.isVisible,
                    bannerLink: res.data.bannerLink
                };
                setData(updatedData);
            }
        })
    }, [])
    return (
        <>
            <Banner {...data} />
        </>
    );
}

export default Main;
