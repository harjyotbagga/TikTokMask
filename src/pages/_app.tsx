import ThemeButton from "@/components/ThemeButton";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>TikTok</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/reels_mark_colored.svg" />
      </Head>
      <div>
        <Toaster />
      </div>
      {/* <div className="fixed top-4 left-4">
        <ThemeButton />
      </div> */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}
