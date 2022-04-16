import '../styles/globals.css';
import { SessionProvider } from "next-auth/react";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



// const express = require("express");
// const app = express();
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// });

const passport = require("passport");
require("../config/passportConfig")(passport);

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

function MyApp({ 
  Component, pageProps: { session, ...pageProps } 
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
