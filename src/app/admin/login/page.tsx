import { Suspense } from "react";
import AdminLoginForm from "./login-form";

export default function Page() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}
