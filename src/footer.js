// Footer.js
import React from "react";
import { Container, Typography } from "@mui/material";

function Footer() {
    return (
        <footer
            style={{
                marginTop: "auto",
                backgroundColor: "#1ADB02",
                padding: "16px",
                transition: "background-color 0.3s", // Add a smooth transition effect
                "&:hover": {
                    backgroundColor: "#dcdcdc", // Change the background color on hover
                },
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body2" color="white" align="center">
                    © {new Date().getFullYear()}  Lighthouselabs. All rights reserved.
                </Typography>
            </Container>
        </footer>
    );
}

export default Footer;
