import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function RegistrationDialog({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Function to handle form field changes
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = async () => {
        try {
            // Make an API request to register the user
            const response = await fetch('your-registration-api-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Send the user's registration data
            });

            if (response.ok) {
                // Registration was successful
                // You can handle the success response here
                console.log('Registration successful');
                onClose(); // Close the dialog
            } else {
                // Registration failed
                // You can handle the error response here
                console.error('Registration failed');
                // Optionally, display an error message to the user
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error during registration:', error);
            // Optionally, display an error message to the user
        }
    };


    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Register</DialogTitle>
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
                    label="Email"
                    type="email"
                    name="email"
                    fullWidth
                    value={formData.email}
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
            <DialogActions>
                <Button onClick={() => onClose(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleRegister} color="primary">
                    Register
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RegistrationDialog;
