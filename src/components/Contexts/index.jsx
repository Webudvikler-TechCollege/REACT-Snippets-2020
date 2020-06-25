// import React from 'react'
import { BrowserRouter } from "react-router-dom";
import CombineContexts from "./CombineContext";
import { AuthProvider } from "../Auth/Auth";
import NetworkProvider from "./NetworkProvider";
import ErrorBoundary from './ErrorBoundary';

// Rækkefølgen som disse bliver kaldt på, bestemmer hvordan de bliver nested
export default CombineContexts(ErrorBoundary, NetworkProvider, AuthProvider, BrowserRouter);

// Dette bliver rendered til:
//
// <ErrorBoundary>
//   <NetworkProvider>
//     <AuthProvider>
//       <BrowserRouter>
//         {/* Children kommer her */}
//       </BrowserRouter>
//     </AuthProvider>
//   </NetworkProvider>
// </ErrorBoundary>
