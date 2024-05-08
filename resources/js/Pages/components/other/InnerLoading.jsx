import { useContext, useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Context from '../../provider/context';
import { Box, Button, CircularProgress } from '@mui/material';

export default function InnerLoading({ processing }) {


    return (
        <div>


            <div className={`absolute top-0 left-0 h-full w-full overflow-hidden justify-center items-center bg-gray-800 bg-opacity-10 ${processing ? "flex" : "hidden"}`}
            >
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress
                        size={60}
                        color="primary"
                    />
                </Box>
            </div>
        </div>
    );
}
