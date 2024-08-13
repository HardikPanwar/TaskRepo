import React, {useState} from 'react';
import {Paper, Grid, TextField, Button} from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize} from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import axios from 'axios';
import { Switch, switchClasses } from '@mui/base/Switch';
import { useDropzone } from 'react-dropzone';

import './style.css';

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};
const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 80%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

const Root = styled('span')(
    ({ theme }) => `
    box-sizing: border-box;
    font-size: 0;
    position: relative;
    display: inline-block;
    width: 38px;
    height: 24px;
    margin: 10px;
    cursor: pointer;
  
    &.${switchClasses.disabled} {
      opacity: 0.4;
      cursor: not-allowed;
    }
  
    & .${switchClasses.track} {
      box-sizing: border-box;
      background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      border-radius: 24px;
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 120ms;
      box-shadow: inset 0px 1px 1px ${
        theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.05)'
      };
    }
  
    &:hover .${switchClasses.track} {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &.${switchClasses.focusVisible} .${switchClasses.track} {
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
    }
  
    & .${switchClasses.thumb} {
      box-sizing: border-box;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      display: block;
      width: 18px;
      height: 18px;
      top: 4px;
      left: 4px;
      border-radius: 16px;
      background-color: #FFF;
      position: relative;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 120ms;
      box-shadow: 0px 1px 2px ${
        theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.1)'
      };
    }
  
    &.${switchClasses.checked} {
      .${switchClasses.thumb} {
        left: 18px;
        background-color: #fff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
      }
  
      .${switchClasses.track} {
        border: none;
        background: ${blue[500]};
      }
    }
  
    &:hover .${switchClasses.checked} .${switchClasses.track} {
      background: ${blue[700]};
    }
  
    & .${switchClasses.input} {
      cursor: inherit;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 1;
      margin: 0;
    }
    `,
);


const Dashboard = () => {
    const label = { slotProps: { input: { 'aria-label': 'visibility switch' } } };
    const [isVisible, setVisibility] = useState(0)
    const [inputVal, setInputVal] = useState({
        description: '',
        timer: '',
        bannerLink: '',
    })
    const [bannerFileUrl, setBannerFileUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => handleFileUpload(acceptedFiles[0]),
    });

    const handleFileUpload = async (file) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'my_preset');
    
        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/danhzs57i/image/upload`,
            formData
          );
          const url = response.data.secure_url;
          setFileUrl(url);
          await setBannerFileUrl(url);
    
        } catch (error) {
          console.error('Error uploading file:', error);
        } finally {
          setUploading(false);
        }
      };

    const setData = (e) => {
        setInputVal( (preVal) => {
            return {
                ...preVal,
                [e.target.name] : e.target.value
            }
        })
    }

    

    const updateBanner = () => {
        try{
            const {description, timer, bannerLink} = inputVal;
            let banner = bannerFileUrl;
            if(isVisible){
                setVisibility('1');
            }else{
                setVisibility('0');
            }
            axios.post('https://taskserverrepo.onrender.com/api/updateBannerData', {
                description,
                timer,
                bannerLink,
                banner,
                isVisible
            }).then((res) => {
                alert(res.data);
                window.location.href = "/";
            });
        }catch(err){
            console.log(err);
        }
    }

    return (
        <Paper className='banner-update-form' elevation={12}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={12} md={6} lg={6} {...getRootProps()}>
                 <div className='file-input'>
                 <span>Choose file</span>
                 <TextField  {...getInputProps()} fullWidth id="outlined-basic" type='file' variant="outlined" onChange={setData} className='file-feild'/>
                 </div>
                    
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField id="outlined-basic" fullWidth type="datetime-local" label="" name='timer' variant="outlined" onChange={setData} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className='switch-box'>  
                      <span className='banner-visibility-text'>Banner Visibility:</span> 
                      <div className='inner-switch-box'>
                      <Switch slots={{root: Root}} {...label } onChange={()=> setVisibility(!isVisible)}  defaultChecked={isVisible} val/> 
                      <span className="on-off-txt">{isVisible ? "ON" : "OFF"}</span>
                      </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField id="outlined-basic" fullWidth label="Banner Link" name='bannerLink' variant="outlined" onChange={setData} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Textarea aria-label="Banner Description" fullWidth placeholder="Banner Description" minRows={5} onChange={setData} name='description' />
                </Grid>
            </Grid>
            <Button variant="contained" onClick={updateBanner} color='secondary'>Update</Button>
        </Paper>
    );
}

export default Dashboard;
