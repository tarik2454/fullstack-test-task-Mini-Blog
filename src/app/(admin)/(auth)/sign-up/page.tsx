"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { signUpSchema, SignUp } from "@/validation/schemas";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUp) => {
    console.log("Sign Up Data:", data);
    // Call your API to register here
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Registration
      </Typography>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        Sign Up
      </Button>
    </Box>
  );
}
