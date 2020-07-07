// import React from 'react'
import { BrowserRouter } from "react-router-dom";
import CombineContexts from "./CombineContext";
import { AuthProvider } from "../Auth/Auth";
import NetworkProvider from "./NetworkProvider";
import ErrorBoundary from "./ErrorBoundary";
// export * from "react-router-dom";
export * from "./CombineContext";
export * from "../Auth/Auth";
export * from "./NetworkProvider";
export * from "./ErrorBoundary";

// Rækkefølgen som disse bliver kaldt på, 
// bestemmer hvordan de bliver nested
export default CombineContexts(
  ErrorBoundary,
  AuthProvider,
  NetworkProvider,
  BrowserRouter
);

// Dette bliver rendered til:
//
// <ErrorBoundary>
//   <AuthProvider>
//     <NetworkProvider>
//       <BrowserRouter>
//         {/* Children kommer her */}
//       </BrowserRouter>
//      </NetworkProvider>
//   </AuthProvider>
// </ErrorBoundary>
