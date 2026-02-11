import { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    CircularProgress,
    useTheme,
    IconButton,
    InputAdornment,
    Divider,
    Fade,
    Grid,
    Stepper,
    Step,
    StepLabel,
} from '@mui/material';
import {
    ArrowBack,
    Send,
    Diamond,
    Security,
    ArrowForward,
    CheckCircle,
    Verified,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from '@mui/material/styles';
import ApiOtp from '../services/api/admin/Auth/ApiOtp';
import { useDispatch, useSelector } from 'react-redux';
import ApiOtpVarify from '../services/api/admin/Auth/ApiOtpVarify';
// Validation schemas
const phoneSchema = yup.object({
    phoneNumber: yup
        .string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number')
        .transform((value: any) => value?.replace(/\D/g, '')),
});

const otpSchema = yup.object({
    otp: yup
        .string()
        .required('OTP is required')
        .matches(/^[0-9]{6}$/, 'Enter 6-digit OTP'),
});

type PhoneFormData = {
    phoneNumber: string;
};

type OtpFormData = {
    otp: string;
};

// Optimized styled components without backdrop filter
const GradientPaper = styled(Paper)(({ theme }) => ({
    background: `linear-gradient(145deg, 
        ${theme.palette.background.paper} 0%, 
        ${theme.palette.background.default} 100%
    )`,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[8],
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(45deg, transparent 65%, rgba(102, 126, 234, 0.05) 65%, rgba(102, 126, 234, 0.1) 100%)`,
        pointerEvents: 'none',
    },
}));

const GradientButton = styled(Button)(({ theme }) => ({
    background: `linear-gradient(135deg, 
        ${theme.palette.primary.main} 0%, 
        ${theme.palette.primary.dark} 100%
    )`,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
    },
    '&:active': {
        transform: 'translateY(0)',
    },
}));

const LoginPage = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [resendTimer, setResendTimer] = useState(0);
    const [showResend, setShowResend] = useState(false);

    const {
        control: phoneControl,
        handleSubmit: handlePhoneSubmit,
        formState: { errors: phoneErrors },
        setValue: setPhoneValue,
    } = useForm<PhoneFormData>({
        resolver: yupResolver(phoneSchema),
        defaultValues: {
        },
    });

    const {
        control: otpControl,
        handleSubmit: handleOtpSubmit,
        formState: { errors: otpErrors },
        reset: resetOtp,
    } = useForm<OtpFormData>({
        resolver: yupResolver(otpSchema),
        defaultValues: {
            otp: '',
        },
    });

    const formatPhoneNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length <= 3) return cleaned;
        if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    };

    const handleSendOtp = async (data: PhoneFormData) => {
        await ApiOtp({ phone: data.phoneNumber, dispatch: dispatch })
        try {
            setStep('otp');
            setResendTimer(30);
            setShowResend(false);
            const timer = setInterval(() => {
                setResendTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setShowResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (err) {
            setError('Failed to send verification code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    const phoneFromStore = useSelector((state: any) => state.loginOtp.PhoneNumber);
    const otpFromStore = useSelector((state: any) => state.loginOtp.OneTimePasssword);

    const handleResendOtp = async () => {
        if (!showResend) return;
        setIsLoading(true);
        setError('');
        setSuccess('');
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            await ApiOtp({ phone: phoneFromStore, dispatch: dispatch })
            setResendTimer(30);
            setShowResend(false);
            const timer = setInterval(() => {
                setResendTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setShowResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

        } catch (err) {
            setError('Failed to resend code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (data: OtpFormData) => {
        setIsLoading(true);
        setError('');
        try {
            ApiOtpVarify({
                dispatch: dispatch,
                storeOpt: otpFromStore,
                userOtp: data.otp
            })
        } catch (err) {
            setError('Invalid verification code. Please try again.');
            resetOtp({ otp: '' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToPhone = () => {
        setStep('phone');
        setError('');
        setSuccess('');
        resetOtp({ otp: '' });
    };
    const BrandShowcase = () => (
        <Box sx={{
            flex: { lg: 0.4 },
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: theme.palette.primary.dark,
            background: `linear-gradient(135deg, 
                ${theme.palette.primary.dark} 0%, 
                ${theme.palette.primary.main} 100%
            )`,
            p: { lg: 6, xl: 8 },
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative elements without animation */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    backgroundImage: `radial-gradient(circle at 20% 80%, white 0%, transparent 50%)`,
                }}
            />

            <Box sx={{
                position: 'relative',
                zIndex: 1,
                color: 'white',
                maxWidth: 500,
                width: '100%',
            }}>
                {/* Brand Header */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                    }}>
                        <Diamond sx={{ fontSize: 40, mr: 2 }} />
                        <Typography variant="h3" fontWeight="bold">
                            ArtisanDecor
                        </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ opacity: 0.9 }}>
                        Premium Home Decor & Lifestyle
                    </Typography>
                </Box>

                <Divider sx={{
                    my: 4,
                    backgroundColor: 'rgba(255,255,255,0.2)'
                }} />

                {/* Features Grid - Fixed with stable rendering */}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: 2,
                            border: '1px solid rgba(255,255,255,0.1)',
                        }}>
                            <CheckCircle sx={{ mr: 2, fontSize: 30 }} />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="medium">
                                    Handcrafted Premium Quality
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    Artisan-made products
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: 2,
                            border: '1px solid rgba(255,255,255,0.1)',
                        }}>
                            <Security sx={{ mr: 2, fontSize: 30 }} />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="medium">
                                    Secure Transactions
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    256-bit encryption
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: 2,
                            border: '1px solid rgba(255,255,255,0.1)',
                        }}>
                            <Verified sx={{ mr: 2, fontSize: 30 }} />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="medium">
                                    Verified Sellers
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    Quality assurance
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* Quote Section */}
                <Box sx={{
                    mt: 6,
                    pt: 4,
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                }}>
                    <Typography variant="body2" sx={{
                        fontStyle: 'italic',
                        opacity: 0.9,
                        textAlign: 'center',
                    }}>
                        "Transforming spaces with premium decor since 2015"
                    </Typography>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.background.default,
            py: { xs: 2, md: 4 },
            px: { xs: 1, sm: 2 },
        }}>
            <Container maxWidth="xl">
                <Fade in={true} timeout={500}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        minHeight: { xs: 'auto', lg: '600px' },
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: theme.shadows[4],
                        width: '100%',
                        maxWidth: 1200,
                        margin: '0 auto',
                    }}>
                        {/* Left Side - Brand Showcase */}
                        <BrandShowcase />

                        {/* Right Side - Login Form */}
                        <GradientPaper sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            p: { xs: 3, sm: 4, md: 5, lg: 6 },
                        }}>
                            {/* Progress Stepper */}
                            <Stepper
                                activeStep={step === 'phone' ? 0 : 1}
                                sx={{ mb: 4 }}
                            >
                                <Step>
                                    <StepLabel>
                                        <Typography variant="caption">
                                            Phone Number
                                        </Typography>
                                    </StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel>
                                        <Typography variant="caption">
                                            Verification
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            </Stepper>

                            {/* Form Content */}
                            <Box sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                maxWidth: 450,
                                mx: 'auto',
                                width: '100%',
                            }}>
                                {/* Header */}
                                <Box sx={{ textAlign: 'center', mb: 4 }}>
                                    <Typography
                                        variant="h4"
                                        fontWeight="bold"
                                        gutterBottom
                                        color="primary"
                                    >
                                        {step === 'phone' ? 'Welcome Back' : 'Secure Login'}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {step === 'phone'
                                            ? 'Enter your phone number to continue'
                                            : `Enter verification code sent to ${phoneNumber}`
                                        }
                                    </Typography>
                                </Box>

                                {/* Messages */}
                                {error && (
                                    <Alert severity="error" sx={{ mb: 3 }}>
                                        {error}
                                    </Alert>
                                )}
                                {success && (
                                    <Alert severity="success" sx={{ mb: 3 }}>
                                        {success}
                                    </Alert>
                                )}

                                {/* Phone Form */}
                                {step === 'phone' && (
                                    <form onSubmit={handlePhoneSubmit(handleSendOtp)}>
                                        <Controller
                                            name="phoneNumber"
                                            control={phoneControl}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Phone Number"
                                                    placeholder="(123) 456-7890"
                                                    variant="outlined"
                                                    margin="normal"
                                                    error={!!phoneErrors.phoneNumber}
                                                    helperText={phoneErrors.phoneNumber?.message}
                                                    disabled={isLoading}
                                                    onChange={(e) => {
                                                        const formatted = formatPhoneNumber(e.target.value);
                                                        setPhoneValue('phoneNumber', formatted, { shouldValidate: true });
                                                    }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                +91
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    sx={{ mb: 3 }}
                                                />
                                            )}
                                        />

                                        <GradientButton
                                            type="submit"
                                            fullWidth
                                            size="large"
                                            disabled={isLoading}
                                            sx={{ mt: 2 }}
                                            endIcon={!isLoading && <ArrowForward />}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <CircularProgress size={20} sx={{ mr: 1 }} />
                                                    <p className='text-white'>
                                                        Sending Code...
                                                    </p>
                                                </>
                                            ) : (
                                                <p className='text-white'>
                                                    Continue with OTP
                                                </p>
                                            )}
                                        </GradientButton>
                                    </form>
                                )}

                                {/* OTP Form */}
                                {step === 'otp' && (
                                    <>
                                        <Box sx={{ mb: 3 }}>
                                            <IconButton
                                                onClick={handleBackToPhone}
                                                disabled={isLoading}
                                                sx={{ color: 'primary.main' }}
                                            >
                                                <ArrowBack />
                                                <Typography variant="body2" sx={{ ml: 1 }}>
                                                    Back
                                                </Typography>
                                            </IconButton>
                                        </Box>

                                        <form onSubmit={handleOtpSubmit(handleVerifyOtp)}>
                                            <Controller
                                                name="otp"
                                                control={otpControl}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        fullWidth
                                                        label="6-Digit Verification Code"
                                                        placeholder="Enter code"
                                                        variant="outlined"
                                                        margin="normal"
                                                        error={!!otpErrors.otp}
                                                        helperText={otpErrors.otp?.message}
                                                        disabled={isLoading}
                                                        inputProps={{
                                                            maxLength: 6,
                                                            inputMode: 'numeric',
                                                            pattern: '[0-9]*',
                                                        }}
                                                        InputProps={{
                                                            sx: {
                                                                fontSize: '1.5rem',
                                                                letterSpacing: '8px',
                                                                textAlign: 'center',
                                                            },
                                                        }}
                                                    />
                                                )}
                                            />

                                            <Box sx={{ textAlign: 'center', my: 3 }}>
                                                {!showResend ? (
                                                    <Typography variant="body2" color="text.secondary">
                                                        Resend code in {resendTimer}s
                                                    </Typography>
                                                ) : (
                                                    <Button
                                                        onClick={handleResendOtp}
                                                        disabled={isLoading}
                                                        startIcon={<Send />}
                                                    >
                                                        Resend Code
                                                    </Button>
                                                )}
                                            </Box>

                                            <GradientButton
                                                type="submit"
                                                fullWidth
                                                size="large"
                                                disabled={isLoading}
                                                startIcon={isLoading && <CircularProgress size={20} />}
                                            >
                                                {isLoading ? <p className='text-white'>Verifying... </p> : <p className='text-white'>Verify & Login</p>}
                                            </GradientButton>
                                        </form>
                                    </>
                                )}

                                {/* Footer */}
                                <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                                    <Typography variant="caption" color="text.secondary" align="center" display="block">
                                        <Security sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                                        Secured with enterprise-grade encryption
                                    </Typography>
                                </Box>
                            </Box>
                        </GradientPaper>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default LoginPage;