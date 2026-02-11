import React, { useEffect } from "react";
import { Modal, Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../../../pages/LoginPage";
import CheckVarityAuth from "../../../function/boot/auth/CheckVarityAuth";

function Wrapper({ children }: { children: React.ReactNode }) {
    const loaderStatus = useSelector((state: any) => state.loader.status);
    const isLogin = useSelector((state: any) => state.UserLoginCheck.Authentication);
    const dispatch = useDispatch()
    useEffect(() => {
        CheckVarityAuth(dispatch)
    })
    return (
        <>
            <Modal
                open={loaderStatus}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2000,
                }}
                disableAutoFocus
                disableEnforceFocus
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        color: "white",
                        borderRadius: 2,
                        p: 4,
                        outline: "none",
                    }}
                >
                    <CircularProgress color="inherit" size={60} sx={{ mb: 2 }} />
                    <Typography variant="h6">Loading...</Typography>
                </Box>
            </Modal>
            {
                isLogin ? children : <LoginPage />
            }
        </>
    );
}

export default Wrapper;
