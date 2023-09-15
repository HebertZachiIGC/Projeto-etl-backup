import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// import Home from '../pages/Home';
import AuthContext from '../contexts/auth';

const Private: React.FC = () => {
  const { signed } = useContext(AuthContext);
  console.log('private', signed);
  return signed ? <Outlet /> : <Navigate to="/" />;
};

//   return (
//     <BrowserRouter>
//       <Route path="/home" element={<Home/>} />
//     </BrowserRouter>
//   );
// };

export default Private;
