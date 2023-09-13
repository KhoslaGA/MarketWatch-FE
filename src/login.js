import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

function Login({ isOpen, onClose, handleLogin }) {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleFieldChange = (e) => {
        const { name, value } = 
e.target
;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function PaperComponent(props) {
      return (
          <Draggable
              handle="#draggable-dialog-title"
              cancel={'[class*="MuiDialogContent-root"]'}
          >
              <Paper {...props} />
          </Draggable>
      );
  }

    return (
     <Dialog open={isOpen} onClose={onClose} PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title" sx={{ maxWidth: '400px' }}>
            <DialogTitle sx={{ backgroundColor: '#007BFF', color: 'white' }}>Register</DialogTitle>
            <DialogContent>
                {/* Registration form content */}
                <TextField
                    autoFocus
                    margin="dense"
                    label="Username"
                    type="text"
                    name="username"
                    fullWidth
                    value={formData.username}
                    onChange={handleFieldChange}
                />

                <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    name="password"
                    fullWidth
                    value={formData.password}
                    onChange={handleFieldChange}
                />
            </DialogContent>
            <DialogActions sx={{ borderTop: '1px solid #e0e0e0' }}>
                <Button onClick={() => onClose(false)} color="secondary">
                    Cancel
                </Button>
                <Button onClick={() => handleLogin(formData)} color="primary" variant="contained">
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Login; 