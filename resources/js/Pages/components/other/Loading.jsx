import React, { useContext } from 'react';
import Modal from '@mui/material/Modal';
import Context from '../../provider/context';
// import { Box, Button, CircularProgress } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loading({ children }) {
    const { processing } = useContext(Context);


    // return (
    //     {/* <Modal
    //             open={processing}
    //             aria-labelledby="modal-modal-title"
    //             aria-describedby="modal-modal-description"
    //             BackdropProps={{
    //                 sx: { backgroundColor: 'rgba(0, 0, 0, 0.0)' }, // Set transparency
    //             }}
    //         >

    //             <div className=''><LinearProgress /></div>

    //             {/* <div className='h-screen w-screen overflow-hidden flex justify-center items-center'
    //             >
    //                 <Box sx={{ display: 'flex' }}>
    //                     <CircularProgress
    //                         size={60}
    //                         color="primary"
    //                     />
    //                 </Box>
    //             </div> */}
    //         {/* </Modal> */ }
    return (
        <div className='w-screen h-screen absolute top-0 left-0'
            style={{
                display: processing ? "block" : "none",
                zIndex: 9999999999,
                pointerEvents: "none",
            }}
        >
            <div className=''><LinearProgress /></div>
        </div>
    );
}
