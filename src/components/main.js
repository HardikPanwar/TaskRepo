import React, {useState, useEffect} from 'react';
import Banner from './banner';
import bannerUrl from '../assets/img/banner.jpg';
import axios from 'axios';
import { TextField, Grid } from '@mui/material';
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
        axios.get('https://taskserverrepo.onrender.com/api/getBannerData').then((res) => {
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
            <div className='courses-section'>
                <div className="courses-top">
                    <h2>Search Courses</h2>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={8} sm={10} md={10} lg={10}>
                            <TextField placeholder="Search for over 20+ courses" fullWidth type="text" label="Search Course" variant="outlined" />
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} justifySelf="center" >
                            <button>Search</button>
                        </Grid>
                    </Grid>
                </div>
                <div className='courses-content'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={6}>
                            <img src='https://www.scnsoft.com/education-industry/elearning-portal/elearning-portals-cover-picture.svg' />
                        </Grid>
                        <Grid item xs={12} md={12} lg={6} alignItems="center">
                            <h1>Why choose us ?</h1>
                            <h3>Unlock Your Potential with Our Comprehensive Learning Approach</h3>
                            <ul>
                                <li className='courses-benifits'>Expert-Crafted Learning 
                                    <span>
                                        Our team of accomplished engineers, with impressive coding profiles across various programming platforms, hails from top tech companies like Google, Amazon, Meta, and Microsoft.
                                    </span>
                                </li>
                                <li className='courses-benifits'>Structured Learning Path 
                                    <span>
                                        Master Data Structures & Algorithms (DSA), System Design, core subjects, and practical projects – all through premium blog posts and in-depth video solutions.
                                    </span>
                                </li>
                                <li className='courses-benifits'>Unmatched Content Depth 
                                    <span>
                                        We prioritize quality content, offering in-depth explanations and a wider range of solved problems in both free and paid courses. Our focus is on developing problem-solving skills through intuitive video explanations.
                                    </span>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default Main;
