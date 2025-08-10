"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { SignIn, signInSchema } from "@/validation/schemas";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignIn) => {
    console.log("Sign In Data:", data);
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
        Sign In
      </Typography>
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
        Sign In
      </Button>
    </Box>
  );
}
