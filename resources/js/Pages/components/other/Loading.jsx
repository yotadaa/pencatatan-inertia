import { useContext, useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Context from '../../provider/context';
import { Box, Button, CircularProgress } from '@mui/material';

export default function Loading({ children }) {
    const { processing, setProcessing } = useContext(Context);


    return (
        <div>
            <Modal
                open={processing}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <div className='h-screen w-screen overflow-hidden flex justify-center items-center'
                >
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress
                            size={60}
                            color="primary"
                        />
                    </Box>
                </div>
            </Modal>
        </div>
    );
}
