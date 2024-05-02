import { useContext, useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Context from '../../provider/context';
import { Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AuthModal({ children }) {
    const { loginFailed, setLoginFailed, authFailedMessage } = useContext(Context);
    const handleOpen = () => setLoginFailed(true);
    const handleClose = () => {
        setLoginFailed(false);
    };
    const [hover, setHover] = useState(false);


    return (
        <div>
            <Modal
                open={loginFailed}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClick={() => {
                    if (hover) {
                        handleClose();
                    }
                }}
            >

                <div className='h-screen w-screen overflow-hidden flex justify-center items-center'
                >
                    <div className='bg-slate-50 rounded-md max-w-[500px]'
                        style={{
                            minWidth: 300
                        }}
                        onMouseLeave={() => {
                            setHover(false);
                        }}
                        onMouseEnter={() => {
                            setHover(true);
                        }}
                    >
                        <header className="bg-slate-200 rounded-t-md p-2 font-semibold">{authFailedMessage.title}</header>
                        <section className='w-full flex items-center justify-center py-6 px-5'>{authFailedMessage.body}</section>
                        <footer className='w-full flex items-center justify-center py-2'>
                            <Button disableElevation
                                display='flex'
                                alignitems='center'
                                justifycontent='center'
                                type="submit"
                                variant="contained"
                                onClick={handleClose}
                                color="error"
                            >
                                <span className="px-3">Tutup</span>
                            </Button>
                        </footer>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
